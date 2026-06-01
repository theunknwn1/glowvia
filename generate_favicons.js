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

  // favicon-32x32.png
  await sharp(inputNoBg)
    .resize(32, 32)
    .png()
    .toFile(`${deploy}/favicon-32x32.png`);

  // favicon-192x192.png
  await sharp(inputNoBg)
    .resize(192, 192)
    .png()
    .toFile(`${deploy}/favicon-192x192.png`);

  // apple-touch-icon.png
  await sharp(inputBg)
    .resize(180, 180)
    .png()
    .toFile(`${deploy}/apple-touch-icon.png`);

  // favicon.ico (use 32x32 png as a fallback, modern browsers accept it, or just copy)
  // Sharp doesn't native output .ico, but we can copy 32x32.png to .ico as a hack, or leave original.
  fs.copyFileSync(`${deploy}/favicon-32x32.png`, `${deploy}/favicon.ico`);
  
  console.log('Favicons generated.');
}

generate().catch(console.error);
