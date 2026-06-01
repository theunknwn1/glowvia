const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = './deploy/images';
const deployDir = './deploy';

async function optimizeImages() {
  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(srcDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      
      let image = sharp(srcPath);
      const metadata = await image.metadata();
      
      if (metadata.width > 1600) {
        image = image.resize(1600, null, { withoutEnlargement: true });
      }
      
      await image.webp({ quality: 80 }).toFile(destPath);
      console.log(`Converted ${file} to WebP`);
      
      fs.unlinkSync(srcPath);
    }
  }
  
  const logoPath = path.join(deployDir, 'logo.png');
  const logoDestPath = path.join(deployDir, 'logo.webp');
  if (fs.existsSync(logoPath)) {
    await sharp(logoPath).webp({ quality: 90 }).toFile(logoDestPath);
    console.log('Converted logo.png to WebP');
    fs.unlinkSync(logoPath);
  }
}

optimizeImages().catch(console.error);
