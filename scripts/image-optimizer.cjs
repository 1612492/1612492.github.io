const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(process.cwd(), 'public');

const options = {
  png: {
    quality: 100,
  },
  jpeg: {
    quality: 100,
  },
  jpg: {
    quality: 100,
  },
};

sharp.cache(false);

async function formatFiles(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const name = dir + '/' + file;
    const ext = path.extname(file).toLowerCase().slice(1);

    if (fs.statSync(name).isDirectory()) {
      formatFiles(name);
    } else if (/(jpe?g|png)$/.test(ext)) {
      const tmpName = dir + '/o.' + file;
      const oldSize = fs.statSync(name).size;
      const data = await sharp(name).toFormat(ext, options[ext]).toFile(tmpName);
      const newSize = data.size;

      if (newSize < oldSize) {
        console.log(`${file}: ${oldSize} -> ${newSize}`);
        fs.unlinkSync(name);
        fs.renameSync(tmpName, name);
      } else {
        console.log(`${file}: skipped`);
        fs.unlinkSync(tmpName);
      }
    }
  }
}

function main() {
  formatFiles(dir);
}

main();
