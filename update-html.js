const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const htmlPath = './deploy/index.html';
const deployDir = './deploy';

async function updateHtml() {
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Replace extensions
  html = html.replace(/\.(png|jpg|jpeg)/gi, '.webp');
  
  // Find all img tags using a regex loop
  const imgRegex = /<img([^>]+)src="([^"]+)"([^>]*)>/g;
  let match;
  let imgCount = 0;
  let newHtml = html;
  
  // We need to do this sequentially or gather all replacements
  const replacements = [];
  
  while ((match = imgRegex.exec(html)) !== null) {
    imgCount++;
    const fullTag = match[0];
    const beforeSrc = match[1];
    const src = match[2];
    const afterSrc = match[3];
    
    let newTag = `<img${beforeSrc}src="${src}"${afterSrc}>`;
    
    // Add loading="lazy" (skip first 2 images: logo and hero)
    if (imgCount > 2 && !newTag.includes('loading=')) {
      newTag = newTag.replace('<img', '<img loading="lazy"');
    }
    
    // Attempt to get dimensions and add width/height
    const imgFilePath = path.join(deployDir, src);
    if (fs.existsSync(imgFilePath)) {
      const metadata = await sharp(imgFilePath).metadata();
      if (metadata && metadata.width && metadata.height) {
        if (!newTag.includes('width=') && !newTag.includes('height=')) {
          newTag = newTag.replace('<img', `<img width="${metadata.width}" height="${metadata.height}"`);
        }
      }
    }
    
    replacements.push({ original: fullTag, newTag: newTag });
  }
  
  for (const rep of replacements) {
    newHtml = newHtml.replace(rep.original, rep.newTag);
  }
  
  fs.writeFileSync(htmlPath, newHtml);
  console.log('HTML updated successfully');
}

updateHtml().catch(console.error);
