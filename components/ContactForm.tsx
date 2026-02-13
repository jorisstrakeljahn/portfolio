"use client";

import { useState, useRef, type FormEvent } from "react";
import styles from "./ContactForm.module.css";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState({ status: "loading", message: "" });

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    // Honeypot check
    if (formData.get("website")) {
      setState({ status: "success", message: "Thank you! Your message has been sent." });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState({ status: "error", message: data.error || "Something went wrong." });
        return;
      }

      setState({ status: "success", message: "Thank you! Your message has been sent. Check your inbox for a confirmation." });
      form.reset();
    } catch {
      setState({ status: "error", message: "Network error. Please try again later." });
    }
  };

  if (state.status === "success") {
    return (
      <div className={styles.success} role="status">
        <div className={styles.successIcon} aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className={styles.successTitle}>Message sent!</h3>
        <p className={styles.successText}>{state.message}</p>
        <button
          className={styles.resetBtn}
          onClick={() => setState({ status: "idle", message: "" })}
          type="button"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Honeypot — hidden from real users */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={styles.input}
          placeholder="Your name"
          autoComplete="name"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={styles.input}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={styles.textarea}
          placeholder="What's on your mind?"
        />
      </div>

      {state.status === "error" && (
        <p className={styles.error} role="alert">{state.message}</p>
      )}

      <button
        type="submit"
        className={styles.submit}
        disabled={state.status === "loading"}
      >
        {state.status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
