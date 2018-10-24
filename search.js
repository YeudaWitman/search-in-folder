const fs = require('fs');
const path = require('path');

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
  //TODO: check if case sensitve
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
  var found = files.filter(element => {
    let fileResult = fs.readFileSync(element);
    return fileResult.indexOf(text) >= 0;
  });
  if (found.length < 1) {
    console.log('No file was found');
  } else {
    found.forEach(e => console.log(e));
  }
}