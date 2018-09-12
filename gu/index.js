
const fs = require("fs");

function getAllVueFile (path) {
    let vueFileList = [];
    let fileList = fs.readdirSync(path).map(filename => path + "/" + filename);
    fileList.forEach(path => {
        let stat = fs.statSync(path);
        if (!(stat.isDirectory())) {
            if (path.toLowerCase().endsWith(".vue")) {
                vueFileList.push(path);
            }
        }
        else {
            vueFileList = vueFileList.concat(getAllVueFile(path));
        }
    });
    return vueFileList;
}

setInterval(() => {
    console.log(getAllVueFile("../src/components"));
}, 1000);