const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  const input = './newlogo1_nobg.png';
  const output = './deploy/newlogo1.webp';
  
  if (fs.existsSync(input)) {
    let image = sharp(input);
    const metadata = await image.metadata();
    
    // optimize and convert to webp
    await image.webp({ quality: 90 }).toFile(output);
    console.log(`Dimensions: width="${metadata.width}" height="${metadata.height}"`);
  } else {
    console.log('newlogo1_nobg.png not found');
  }
}

processLogo().catch(console.error);
