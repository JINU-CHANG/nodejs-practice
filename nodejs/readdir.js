var testFolder='./data';
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
  filelist.forEach(file=> {
    console.log(file);
  })
})