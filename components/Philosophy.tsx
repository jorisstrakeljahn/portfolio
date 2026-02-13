"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Philosophy.module.css";

/* ===== Token Types for Syntax Highlighting ===== */

type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "fn"
  | "tp"
  | "number"
  | "punct"
  | "plain";

interface Token {
  text: string;
  type: TokenType;
}

interface CodeSnippet {
  lang: string;
  filename: string;
  code: string;
}

/* ===== Language Definitions ===== */

const KEYWORDS: Record<string, Set<string>> = {
  Python: new Set([
    "def", "return", "while", "for", "in", "if", "not", "True", "False",
    "None", "and", "or", "class", "self", "elif", "else", "pass", "break",
    "continue", "with", "as", "try", "except", "import", "from", "is",
  ]),
  Rust: new Set([
    "fn", "let", "mut", "return", "while", "for", "in", "if", "else",
    "match", "pub", "use", "impl", "struct", "enum", "self", "true",
    "false", "loop", "break", "continue", "mod", "async", "await",
  ]),
  Java: new Set([
    "var", "return", "while", "for", "if", "else", "new", "throws",
    "throw", "true", "false", "null", "public", "private", "protected",
    "class", "void", "static", "final", "try", "catch", "extends",
    "implements", "import",
  ]),
};

const TYPES: Record<string, Set<string>> = {
  Python: new Set([
    "str", "int", "float", "bool", "Product", "list", "dict", "List",
    "Dict", "Optional",
  ]),
  Rust: new Set([
    "Result", "Product", "Error", "String", "str", "Vec", "i32", "u32",
    "u64", "bool", "Option", "Self", "Box",
  ]),
  Java: new Set([
    "Product", "String", "Exception", "List", "Map", "Set", "Integer",
    "Boolean", "Object",
  ]),
};

/* ===== Tokenizer ===== */

function tokenize(code: string, lang: string): Token[] {
  const kwSet = KEYWORDS[lang] || new Set<string>();
  const typeSet = TYPES[lang] || new Set<string>();

  // Match order: comments → strings → numbers → identifiers → punctuation → whitespace
  const regex =
    /(#[^\n]*|\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_]\w*\b)|([^\s\w])|(\s+)/g;

  const tokens: Token[] = [];
  let m: RegExpExecArray | null;

  while ((m = regex.exec(code)) !== null) {
    const [, comment, str, num, word, punctuation, space] = m;

    if (comment) {
      tokens.push({ text: comment, type: "comment" });
    } else if (str) {
      tokens.push({ text: str, type: "string" });
    } else if (num) {
      tokens.push({ text: num, type: "number" });
    } else if (word) {
      if (kwSet.has(word)) {
        tokens.push({ text: word, type: "keyword" });
      } else if (typeSet.has(word)) {
        tokens.push({ text: word, type: "tp" });
      } else {
        // Check if followed by ( → function call
        const rest = code.slice(regex.lastIndex);
        const isCall = /^\s*\(/.test(rest);
        tokens.push({ text: word, type: isCall ? "fn" : "plain" });
      }
    } else if (punctuation) {
      tokens.push({ text: punctuation, type: "punct" });
    } else if (space) {
      tokens.push({ text: space, type: "plain" });
    }
  }

  return tokens;
}

/* ===== Code Snippets — real logic with loops ===== */

const SNIPPETS: CodeSnippet[] = [
  {
    lang: "Python",
    filename: "build.py",
    code: `def build_product(idea: str) -> Product:
    validated = validate(idea)
    features = prioritize(validated.scope)
    product = Product(validated)

    while not product.is_shipped:
        for feature in features.next_batch():
            implement(product, feature)
            if run_tests(product).passed:
                product.deploy(feature)

        features.reprioritize(gather_feedback(product))

    return product`,
  },
  {
    lang: "Rust",
    filename: "build.rs",
    code: `fn build_product(idea: &str) -> Result<Product> {
    let validated = validate(idea)?;
    let mut features = prioritize(&validated.scope);
    let mut product = Product::new(&validated);

    while !product.is_shipped() {
        for feature in &features.next_batch() {
            implement(&mut product, feature);
            if run_tests(&product).passed() {
                product.deploy(feature)?;
            }
        }

        features.reprioritize(&gather_feedback(&product));
    }

    Ok(product)
}`,
  },
  {
    lang: "Java",
    filename: "Build.java",
    code: `Product buildProduct(String idea) {
    var validated = validate(idea);
    var features = prioritize(validated.getScope());
    var product = new Product(validated);

    while (!product.isShipped()) {
        for (var feature : features.nextBatch()) {
            implement(product, feature);
            if (runTests(product).passed()) {
                product.deploy(feature);
            }
        }

        features.reprioritize(gatherFeedback(product));
    }

    return product;
}`,
  },
];

/* ===== Pre-tokenize all snippets ===== */

const TOKENIZED = SNIPPETS.map((s) => tokenize(s.code, s.lang));

const TYPE_SPEED = 60; // ms per char — human-like typing pace
const PAUSE_AFTER_DONE = 10000; // stay visible 10 s
const PAUSE_BEFORE_NEXT = 600;

/* ===== Token → CSS class mapping ===== */

const TOKEN_CLASS: Record<TokenType, string> = {
  keyword: styles.tkKeyword,
  string: styles.tkString,
  comment: styles.tkComment,
  fn: styles.tkFn,
  tp: styles.tkType,
  number: styles.tkNumber,
  punct: styles.tkPunct,
  plain: styles.tkPlain,
};

/* ===== Component ===== */

export default function Philosophy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const charCountRef = useRef(0);
  const langIndexRef = useRef(0);

  /* Trigger typing on scroll */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setCharCount(SNIPPETS[0].code.length);
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  /* Type one character at a time */
  const typeNextChar = useCallback(() => {
    const snippet = SNIPPETS[langIndexRef.current];
    const idx = charCountRef.current;

    if (idx <= snippet.code.length) {
      charCountRef.current = idx + 1;
      setCharCount(idx + 1);
      timerRef.current = setTimeout(typeNextChar, TYPE_SPEED);
    } else {
      setIsTyping(false);
      timerRef.current = setTimeout(() => {
        const nextLang = (langIndexRef.current + 1) % SNIPPETS.length;
        langIndexRef.current = nextLang;
        charCountRef.current = 0;
        setActiveIndex(nextLang);
        setCharCount(0);

        timerRef.current = setTimeout(() => {
          setIsTyping(true);
          typeNextChar();
        }, PAUSE_BEFORE_NEXT);
      }, PAUSE_AFTER_DONE);
    }
  }, []);

  /* Kick off on mount */
  useEffect(() => {
    if (!hasStarted) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    charCountRef.current = 0;
    langIndexRef.current = 0;
    setActiveIndex(0);
    setCharCount(0);
    setIsTyping(true);

    timerRef.current = setTimeout(typeNextChar, PAUSE_BEFORE_NEXT);
    return () => clearTimeout(timerRef.current);
  }, [hasStarted, typeNextChar]);

  /* Manual language switch */
  const switchLang = useCallback(
    (index: number) => {
      clearTimeout(timerRef.current);
      langIndexRef.current = index;
      charCountRef.current = 0;
      setActiveIndex(index);
      setCharCount(0);
      setIsTyping(true);

      timerRef.current = setTimeout(typeNextChar, 100);
    },
    [typeNextChar]
  );

  /* Render highlighted code up to charCount */
  const renderCode = () => {
    const tokens = TOKENIZED[activeIndex];
    let remaining = charCount;
    const elements: React.ReactElement[] = [];

    for (let i = 0; i < tokens.length && remaining > 0; i++) {
      const token = tokens[i];
      const chars = Math.min(remaining, token.text.length);
      const text = token.text.slice(0, chars);
      remaining -= chars;

      elements.push(
        <span key={i} className={TOKEN_CLASS[token.type]}>
          {text}
        </span>
      );
    }

    return elements;
  };

  const currentSnippet = SNIPPETS[activeIndex];

  return (
    <div ref={sectionRef} className={styles.wrapper}>
      {/* LEFT: Philosophy text */}
      <div className={styles.left}>
        <h2 className={styles.title}>
          Code should be <span className={styles.accent}>honest</span>
        </h2>
        <div className={styles.beliefs}>
          <p className={styles.belief}>
            I write clean, maintainable, and testable code — the kind that
            your future self (and your AI tools) can actually understand.
          </p>
          <p className={styles.belief}>
            Ship fast, iterate faster. Every product starts as a rough idea.
            The key is validating early and refining relentlessly.
          </p>
          <p className={styles.belief}>
            Pick the right tool for the job, not the trendy one. Build things
            that work, test them properly, and ship with confidence.
          </p>
        </div>
      </div>

      {/* RIGHT: Interactive Code Card */}
      <div className={styles.right}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.dots} aria-hidden="true">
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <span className={styles.filename}>{currentSnippet.filename}</span>
            <div className={styles.langTabs}>
              {SNIPPETS.map((s, i) => (
                <button
                  key={s.lang}
                  className={`${styles.langTab} ${
                    i === activeIndex ? styles.langTabActive : ""
                  }`}
                  onClick={() => switchLang(i)}
                  type="button"
                  aria-label={`Show ${s.lang} code`}
                >
                  {s.lang}
                </button>
              ))}
            </div>
          </div>
          <pre className={styles.code}>
            <code>
              {renderCode()}
              {isTyping && (
                <span className={styles.cursor} aria-hidden="true">
                  ▎
                </span>
              )}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
