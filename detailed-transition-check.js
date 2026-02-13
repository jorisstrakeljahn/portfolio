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
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 1. Find Philosophy section and capture it
  console.log('Step 1: Capturing Philosophy section...');
  const philosophyPos = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, h1'));
    const philosophyHeading = headings.find(h => h.textContent.includes('Philosophy'));
    if (philosophyHeading) {
      const section = philosophyHeading.closest('section');
      if (section) {
        const rect = section.getBoundingClientRect();
        return rect.top + window.scrollY + 200; // Scroll into the section a bit
      }
    }
    return 1000; // fallback
  });
  
  await page.evaluate((pos) => window.scrollTo(0, pos), philosophyPos);
  await new Promise(resolve => setTimeout(resolve, 800));
  await page.screenshot({ path: '1-philosophy-section.png', fullPage: false });
  console.log('✓ Philosophy section captured');
  
  // 2. Find the transition image area
  console.log('Step 2: Finding transition area...');
  const transitionInfo = await page.evaluate(() => {
    // Look for the transition image
    const images = Array.from(document.querySelectorAll('img'));
    const transitionImg = images.find(img => 
      img.src.includes('transition') || 
      img.alt?.toLowerCase().includes('transition')
    );
    
    if (transitionImg) {
      const rect = transitionImg.getBoundingClientRect();
      return {
        found: true,
        top: rect.top + window.scrollY,
        height: rect.height,
        bottom: rect.bottom + window.scrollY
      };
    }
    
    // Fallback: find Projects section and go back
    const headings = Array.from(document.querySelectorAll('h2, h1'));
    const projectsHeading = headings.find(h => h.textContent.includes('Projects'));
    if (projectsHeading) {
      const section = projectsHeading.closest('section');
      if (section) {
        const rect = section.getBoundingClientRect();
        return {
          found: false,
          top: rect.top + window.scrollY - 600, // estimate transition area
          height: 600,
          bottom: rect.top + window.scrollY
        };
      }
    }
    return { found: false, top: 3000, height: 600, bottom: 3600 };
  });
  
  console.log('Transition info:', transitionInfo);
  
  // 2a. Capture top of transition (where it meets dark background)
  console.log('Step 2a: Capturing top of transition area...');
  const topTransitionPos = transitionInfo.top - 200; // Show some dark area above
  await page.evaluate((pos) => window.scrollTo(0, pos), topTransitionPos);
  await new Promise(resolve => setTimeout(resolve, 800));
  await page.screenshot({ path: '2a-transition-top.png', fullPage: false });
  console.log('✓ Top of transition captured');
  
  // 2b. Capture middle of transition
  console.log('Step 2b: Capturing middle of transition...');
  const midTransitionPos = transitionInfo.top + (transitionInfo.height / 2) - 540;
  await page.evaluate((pos) => window.scrollTo(0, pos), midTransitionPos);
  await new Promise(resolve => setTimeout(resolve, 800));
  await page.screenshot({ path: '2b-transition-middle.png', fullPage: false });
  console.log('✓ Middle of transition captured');
  
  // 2c. Capture bottom of transition (where it meets white)
  console.log('Step 2c: Capturing bottom of transition...');
  const bottomTransitionPos = transitionInfo.bottom - 800; // Show transition ending
  await page.evaluate((pos) => window.scrollTo(0, pos), bottomTransitionPos);
  await new Promise(resolve => setTimeout(resolve, 800));
  await page.screenshot({ path: '2c-transition-bottom.png', fullPage: false });
  console.log('✓ Bottom of transition captured');
  
  // 3. Capture Projects section heading and cards
  console.log('Step 3: Capturing Projects section...');
  const projectsPos = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, h1'));
    const projectsHeading = headings.find(h => h.textContent.includes('Projects'));
    if (projectsHeading) {
      const rect = projectsHeading.getBoundingClientRect();
      return rect.top + window.scrollY - 100; // Show a bit above heading
    }
    return 4000; // fallback
  });
  
  await page.evaluate((pos) => window.scrollTo(0, pos), projectsPos);
  await new Promise(resolve => setTimeout(resolve, 800));
  await page.screenshot({ path: '3-projects-section.png', fullPage: false });
  console.log('✓ Projects section captured');
  
  // 3b. Capture project cards in detail
  console.log('Step 3b: Capturing project cards...');
  await page.evaluate((pos) => window.scrollTo(0, pos + 200), projectsPos);
  await new Promise(resolve => setTimeout(resolve, 800));
  await page.screenshot({ path: '3b-project-cards.png', fullPage: false });
  console.log('✓ Project cards captured');
  
  console.log('\n✅ All screenshots captured successfully!');
  await browser.close();
})();
