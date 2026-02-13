const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('Navigating to http://localhost:3001...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
  
  // Wait for page to load
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Screenshot 1: Transition area with "My Projects" heading
  console.log('1. Capturing transition area with "My Projects" heading...');
  const projectsHeading = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, h1'));
    const projectsH = headings.find(h => h.textContent.includes('Projects'));
    if (projectsH) {
      const rect = projectsH.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        found: true
      };
    }
    return { found: false };
  });
  
  if (projectsHeading.found) {
    // Scroll so the heading is visible with the transition image
    const scrollPos = projectsHeading.top - 300; // Show transition image above
    await page.evaluate((pos) => window.scrollTo(0, pos), scrollPos);
    await new Promise(resolve => setTimeout(resolve, 800));
    await page.screenshot({ path: '1-transition-with-heading.png', fullPage: false });
    console.log('   ✓ Saved: 1-transition-with-heading.png');
  }
  
  // Screenshot 2: Projects section cards
  console.log('2. Capturing Projects section cards...');
  const projectsSection = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, h1'));
    const projectsH = headings.find(h => h.textContent.includes('Projects'));
    if (projectsH) {
      const section = projectsH.closest('section');
      if (section) {
        const rect = section.getBoundingClientRect();
        return {
          top: rect.top + window.scrollY,
          found: true
        };
      }
    }
    return { found: false };
  });
  
  if (projectsSection.found) {
    await page.evaluate((pos) => window.scrollTo(0, pos + 200), projectsSection.top);
    await new Promise(resolve => setTimeout(resolve, 800));
    await page.screenshot({ path: '2-projects-cards.png', fullPage: false });
    console.log('   ✓ Saved: 2-projects-cards.png');
  }
  
  // Screenshot 3: Contact section
  console.log('3. Capturing Contact section...');
  const contactSection = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, h1'));
    const contactH = headings.find(h => h.textContent.includes('Contact') || h.textContent.includes('Get in Touch'));
    if (contactH) {
      const section = contactH.closest('section');
      if (section) {
        const rect = section.getBoundingClientRect();
        return {
          top: rect.top + window.scrollY,
          found: true
        };
      }
    }
    return { found: false };
  });
  
  if (contactSection.found) {
    await page.evaluate((pos) => window.scrollTo(0, pos - 100), contactSection.top);
    await new Promise(resolve => setTimeout(resolve, 800));
    await page.screenshot({ path: '3-contact-section.png', fullPage: false });
    console.log('   ✓ Saved: 3-contact-section.png');
  }
  
  // Screenshot 4: Footer
  console.log('4. Capturing Footer...');
  const footerInfo = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      const rect = footer.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        height: rect.height,
        found: true
      };
    }
    return { found: false };
  });
  
  if (footerInfo.found) {
    // Scroll to show the footer
    await page.evaluate((pos) => window.scrollTo(0, pos - 200), footerInfo.top);
    await new Promise(resolve => setTimeout(resolve, 800));
    await page.screenshot({ path: '4-footer.png', fullPage: false });
    console.log('   ✓ Saved: 4-footer.png');
  }
  
  console.log('\n✓ All screenshots captured successfully!');
  await browser.close();
})();
