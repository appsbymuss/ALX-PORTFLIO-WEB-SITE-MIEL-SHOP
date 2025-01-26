const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '../..').replaceAll("\\","/");

const filePath = path.resolve(
    projectRoot,
    'dist',
    'utils',
    'shipping',
    'services',
    'mondial-relay-class',
    'mondialRelay.js'
);

let fileContent = fs.readFileSync(filePath, 'utf8');
fileContent = fileContent.replace(
  "'./mondial-relay-api/index')",
  `"${projectRoot}/utils/shipping/services/mondial-relay-class/mondial-relay-api/index")`
);
fs.writeFileSync(filePath, fileContent, 'utf8');
console.log('File updated successfully');
