
const fs = require("fs");

let oldListJson = "json";

function pathConvert (path) {
    return path.replace("../src", "@");
}

function getFileName (path) {
    let pathSegList = path.split("/");
    let fileName = pathSegList[pathSegList.length - 1];
    let fileNameSegList = fileName.split(".");
    return fileNameSegList[0];
}

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

//监听vue文件变动
function watchVueFile (path) {
    setTimeout(() => {
        let newList = getAllVueFile(path).sort();
        let newListJson = JSON.stringify(newList);
        if (newListJson != oldListJson) {
            buildExportFile(newList);
            oldListJson = newListJson;
        }
        watchVueFile(path);
    }, 500);
}

//自动生成插件导出代码
function buildCode (fileList) {
    let codeText = `
${ fileList.map(file => `import vue_${ file.name } from "${ file.path }";`).join("\r\n") }

${ fileList.map(file => `export const ${ file.name } = { install: Vue => Vue.component("${ file.name }", vue_${ file.name }) };`).join("\r\n") }

const components = {
    install: Vue => {
${ fileList.map(file => `        Vue.component("${ file.name }", vue_${ file.name });`).join("\r\n") }
    }
};

export default components;
`;
    return codeText;
}

//生成插件导出代码文件
function buildExportFile (pathList) {
    let importList = [];
    let fileList = [];
    fileList = pathList.map(path => {
        return {
            name: getFileName(path),
            path: pathConvert(path),
        };
    });
    let codeText = buildCode(fileList);
    fs.writeFileSync("../src/components/index.js", codeText);
}

//开始监听组件目录
watchVueFile("../src/components");
