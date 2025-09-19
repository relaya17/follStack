import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main(){
  const htmlPath = path.join(__dirname, 'index.html');
  const outPath = path.join(__dirname, 'Booklet.pdf');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  // Load as file:// URL
  await page.goto('file://' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.emulateMediaType('screen');
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '16mm', right: '12mm', bottom: '16mm', left: '12mm' }
  });
  await browser.close();
  const stat = await fs.stat(outPath);
  console.log(`PDF generated: ${outPath} (${Math.round(stat.size/1024)} KB)`);
}

main().catch((err)=>{ console.error(err); process.exit(1); });


