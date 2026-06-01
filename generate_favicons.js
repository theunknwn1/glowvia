const sharp = require('sharp');
const fs = require('fs');

async function generate() {
  const inputBg = 'newlogo1.png';
  const inputNoBg = 'newlogo1_nobg.png';
  const deploy = './deploy';

  if (!fs.existsSync(inputBg) || !fs.existsSync(inputNoBg)) {
    console.log('Logo files missing.');
    return;
  }

  // Use trim() to remove transparent padding so the logo appears much larger
  const trimmed = await sharp(inputNoBg).trim().toBuffer();

  // favicon-32x32.png
  await sharp(trimmed)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(`${deploy}/favicon-32x32.png`);

  // favicon-192x192.png
  await sharp(trimmed)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(`${deploy}/favicon-192x192.png`);

  // apple-touch-icon.png (requires a background, usually white or brand color)
  // We'll compose it on a white background or use the inputBg but trimmed.
  const trimmedBg = await sharp(inputBg).trim().toBuffer();
  await sharp(trimmedBg)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(`${deploy}/apple-touch-icon.png`);

  fs.copyFileSync(`${deploy}/favicon-32x32.png`, `${deploy}/favicon.ico`);
  
  console.log('Favicons generated with crop for larger size.');
}

generate().catch(console.error);
