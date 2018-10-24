const fs = require('fs');
const path = require('path');

let dirPath = './';
let errorMessege = 'No file was found';
let filesArr = []

if (process.argv.length < 3) { //if no params
  console.log('USAGE: node search [EXT] [TEXT]');
  return;
} else {
  genList(__dirname);
  if (!validateExt(filesArr)) {
    console.log(errorMessege, '[EXT]');
    return;
  }
  if (!process.argv[3]) { //if no query text
    filterText(process.argv[3], filterExt(filesArr));
    return;
  }
  filterText(process.argv[3], filterExt(filesArr));
}

function validateExt(files) {
  let resArr = files.filter(elem => {
    return (`.${process.argv[2]}` == path.extname(elem));
  });
  if (resArr.length < 1) {
    return false;
  }
  return true;
}

function genList(folder) {
  let files = fs.readdirSync(folder)
  files.forEach(file => {
    let result = path.join(folder, file);
    if (fs.lstatSync(result).isDirectory()) {
      genList(result);
    } else {
      filesArr.push(result);
    }
  });
}

function filterExt(files) {
  let results = [];
  files.find(elem => {
    if (`.${process.argv[2]}` == path.extname(elem)) {
      results.push(elem);
    } else {
      return false;
    }
  });
  return results;
}

function filterText(text, files) {
  files.forEach(file => {
    fs.readFile(file, (err, content) => {
      if (err) {
        return console.error(err.message);
      } else {
        if (content.indexOf(text) >= 0) {
          console.log(file);
        } else {
          return false;
        }
      }
    });
  });
}