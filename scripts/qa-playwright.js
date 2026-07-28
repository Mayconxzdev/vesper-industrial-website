import fs from 'fs';
import path from 'path';
import process from 'process';
import { chromium } from 'playwright';

const base = 'http://localhost:5175';
const routes = ['/', '/#/produtos', '/#/ventiladores', '/#/exaustores', '/#/downloads', '/#/contato'];
const outDir = path.resolve(process.cwd(), 'qa-screenshots');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const report = [];

  for (const route of routes) {
    const url = base + route;
    const consoleErrors = [];
    const requestFailures = [];
    const pageErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        consoleErrors.push({ type: msg.type(), text: msg.text() });
      }
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('requestfailed', (request) => requestFailures.push({ url: request.url(), error: request.failure()?.errorText }));

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const data = await page.evaluate(() => {
      const brokenImages = Array.from(document.images)
        .filter((img) => img.naturalWidth === 0 || img.naturalHeight === 0)
        .map((img) => ({ src: img.currentSrc || img.src, alt: img.alt }));
      const text = document.body.innerText || '';
      return {
        title: document.title,
        h1: document.querySelector('h1')?.textContent?.trim() || null,
        brokenImages,
        hasSiteAntigo: text.includes('Site antigo'),
      };
    });

    const fileName = route === '/' ? 'home.png' : route.replace(/[?#/]/g, '_').replace(/^_+|_+$/g, '') + '.png';
    const location = path.join(outDir, fileName);
    await page.screenshot({ path: location, fullPage: true });

    report.push({ route, url, screenshot: location, page: data, consoleErrors, pageErrors, requestFailures });

    page.removeAllListeners('console');
    page.removeAllListeners('pageerror');
    page.removeAllListeners('requestfailed');
  }

  // Ventiladores detail page
  await page.goto(base + '/#/ventiladores', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const firstCard = await page.$('.catalog-card');
  if (firstCard) {
    await firstCard.click();
    await page.waitForTimeout(1000);
    const detailData = await page.evaluate(() => {
      const brokenImages = Array.from(document.images)
        .filter((img) => img.naturalWidth === 0 || img.naturalHeight === 0)
        .map((img) => ({ src: img.currentSrc || img.src, alt: img.alt }));
      return {
        title: document.title,
        url: window.location.href,
        h1: document.querySelector('h1')?.textContent?.trim() || null,
        brokenImages,
        hasSiteAntigo: document.body.innerText.includes('Site antigo'),
      };
    });
    const detailFile = path.join(outDir, 'ventiladores-detail.png');
    await page.screenshot({ path: detailFile, fullPage: true });
    report.push({ route: '/#/ventiladores/detail', url: page.url(), screenshot: detailFile, page: detailData, consoleErrors: [], pageErrors: [], requestFailures: [] });
  }

  await browser.close();
  fs.writeFileSync(path.join(outDir, 'qa-report.json'), JSON.stringify(report, null, 2));
  console.log('QA complete. Report saved to', path.join(outDir, 'qa-report.json'));
})();
