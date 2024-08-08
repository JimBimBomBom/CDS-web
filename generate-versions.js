const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
const files = fs.readdirSync(docsDir);

const versions = files
    .filter(file => file.endsWith('.json') && file !== 'versions.json')
    .map(file => path.basename(file, '.json'));

const versionsJson = { versions };

fs.writeFileSync(path.join(docsDir, 'versions.json'), JSON.stringify(versionsJson, null, 2));
console.log('Generated versions.json with versions:', versions);
