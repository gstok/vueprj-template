
const fs = require("fs");

//获取某个目录下所有vue文件的路径
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

let oldListJson = "json";

function watchVueFile (path) {
    setTimeout(() => {
        let newList = getAllVueFile(path);
        let newListJson = JSON.stringify(newList);
        if (newListJson != oldListJson) {
            buildExportFile(newList);
            oldListJson = newListJson;
        }
        watchVueFile();
    }, 1000);
}

function pathConvert (path) {
    return path.replace("../src", "@");
}

function getFileName (path) {
    let pathSegList = path.split("/");
    let fileName = pathSegList[pathSegList.length - 1];
    let fileNameSegList = fileName.split(".");
    return fileNameSegList[0];
}

function importCode (fileList) {
    let importCodeList = [];
    importCodeList = fileList.map(file => `import ${ file.name } from "${ file.path }";`);
    let importCodeText = importCodeList.join("\r\n") + "\r\n\r\n";
    let componentsCodeText = `const components = [\r\n${ fileList.map(file => `    ${ file.name },`).join("\r\n") }\r\n];\r\n`;
    return importCodeText + componentsCodeText;
}

function buildExportFile (pathList) {
    let importList = [];
    let fileList = [];
    fileList = pathList.map(path => {
        return {
            name: getFileName(path),
            path: pathConvert(path),
        };
    });
    console.log(importCode(fileList));
}


watchVueFile("../src/components");
