const fs = require('fs')
const path = require('path');

const fileList = fs.readdirSync(path.resolve("docs/Browser"));

const docNameList = fileList.splice(0, fileList.length - 1).map(e => e.slice(0, -3))
    .sort((a,b)=>Number(a.split('.')[0])-Number(b.split('.')[0]))

module.exports = {
  '/docs/Browser/':
  [
    '', 
    ...docNameList
  ]
}