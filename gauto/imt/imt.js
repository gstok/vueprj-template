//async接口管理工具，by鸡毛，2018年09月26日

const fs = require("fs");
const readLineCtr = require("readline");
const readLineSys = readLineCtr.createInterface(process.stdin, process.stdout);
const S = require("string");
const Moment = require("moment");
const colors = require("colors");


//json数据库文件地址
let jsonPath = "./api.json";
//输出Api导出文件地址
let apiPath = "../../src/api/index.js";




//生成函数名
function funcName (func) {
    let type = func.type.toUpperCase();
    let name = func.name.substring(0, 1).toUpperCase() + func.name.substring(1);
    //计算出前缀
    let prefix = "";
    if (type == "O" ||
        type == "L" ||
        type == "P") {
        prefix = "get";
    }
    else if (type == "A" ||
             type == "AO") {
        prefix = "act";
    }
    else if (type == "R") {
        prefix = "res";
    }
    let id = S(func.id.toString()).padLeft(4, '0').toString();
    return `${ prefix }${ name }${ type }${ id }`;
}
//根据接口函数对象生成函数代码
function funcBuilder (func) {
    func.type = func.type.toUpperCase();
    func.method = func.method.toLowerCase();
    if (func.method == "get") {
        func.method = "fetch";
    }
    let warningPass = !(func.warningPass === false);
    if (!(func.remark)) {
        func.remark = "暂未填写接口注释";
    }
    let code = `
//${ func.remark }
async function api_${ funcName(func) } (params) {
    let reqUrl = "${ func.url }";
    let respRtv = await Http.${ func.method }(reqUrl, params);
    return respChanger(respRtv, "${ func.type }", ${ warningPass });
}
`;
    return code;
}




//#region 代码生成方法
//生成顶部引用代码
function topCode () {
    let code = `
//自动生成的接口导入代码 生成时间 ${ Moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }
import Http from "@/utils/http";
import respChanger from "@/common/respChanger";
`;
    return code;
}
//生成中部接口定义代码
function middleCode (funcList) {
    let code = `
${ funcList.map(func => {
    return funcBuilder(func);
}).join("\r\n") }
`;
    return code;
}
//生成底部接口导出代码
function bottomCode (funcList) {
    let code = `
${ funcList.map(func => {
    let name = funcName(func);
    return `export const ${ name } = api_${ name };`;
}).join("\r\n") }

export default {
${ funcList.map(func => {
    let name = funcName(func);
    return `    ${ name }: api_${ name },`;
}).join("\r\n") }
};
`;
    return code;
}
//生成整个导出文件的代码
function exportCode (funcList) {
    let code = `
${ topCode(funcList) }
${ middleCode(funcList) }
${ bottomCode(funcList) }
`;
    return code;
}
//#endregion

//#region 文件IO方法
    //从JSON文件之中读取函数对象列表
    function readFuncList (filePath) {
        let jsonStr;
        let funcList;
        try {
            jsonStr = fs.readFileSync(filePath);
            funcList = JSON.parse(jsonStr);
        }
        catch (e) {
            funcList = [];
            writeFuncList(funcList, filePath);
            console.log("读取JSON文件错误，已经创建空文件！".red);
        }
        return funcList;
    }
    //向JSON文件之中写入函数对象列表
    function writeFuncList (funcList, filePath) {
        let jsonStr = JSON.stringify(funcList, null, 4);
        fs.writeFileSync(filePath, jsonStr);
    }
    //根据函数对象列表写API导出文件
    function writeApiExportFile (funcList, filePath) {
        let code = exportCode(funcList);
        fs.writeFileSync(filePath, code);
    }
//#endregion

//#region 功能方法
    //显示所有接口列表
    function showAllApi (funcList) {
        let list = funcList.map(func => {
            return {
                id: S(func.id.toString()).padLeft(4, "0").toString(),
                name: funcName(func),
                type: func.type,
                method: func.method,
            };
        });
        list.forEach(item => {
            console.log(`${ item.id.red }    ${ item.name.green }    ${ item.type.blue }    ${ item.method.yellow }`);
        });
    }
    //根据Id查询接口详情
    function showApiDetailById (funcList, id) {
        let func = funcList.find(func => func.id == id);
        if (func) {
            let id = S(func.id.toString()).padLeft(4, "0").toString();
            let name = funcName(func);
            let type = func.type.toUpperCase();
            let method = func.method.toLowerCase();
            console.log(`${ "url:".blue }    ${ func.url.green }`);
            console.log(`${ id.red }    ${ name.green }    ${ type.blue }    ${ method.yellow }    ${ "warningPass:".blue + func.warningPass.toString().green }`);
            console.log(funcBuilder(func).trim());
        }
        else {
            console.log("没有找到此接口");
        }
    }
    //根据关键字查询接口列表
    function showSearchApiList (funcList, keyword) {
        keyword = keyword.toLowerCase().trim();
        let searchList = funcList.filter(func => {
            let name = funcName(func).toLowerCase().trim();
            return name.indexOf(keyword) > -1;
        });
        showAllApi(searchList);
    }
    //新增一个接口到数据库，并更新接口导出文件
    async function addNewApi (funcList) {
        let idList = funcList.map(func => func.id);
        let max = Math.max(...idList);
        if (max.toString() == "-Infinity") {
            max = 0;
        }
        let id = max + 1;
        console.log("请在下方输入接口的基本信息".green);
        let type = "";
        while (type != "O" &&
            type != "L" &&
            type != "P" &&
            type != "A" &&
            type != "AO" &&
            type != "R") {
            type = await readLine("type(O,L,P,A,AO,R)：".blue);
            type = type.toUpperCase().trim();
        }
        let name = "";
        while (!name) {
            name = await readLine("请输入接口名称：".blue);
        }
        let url = "";
        while (!url) {
            url = await readLine("请输入接口地址：".blue);
        }
        let method = "";
        while (!method) {
            method = await readLine("请输入请求方法：".blue);
            method = method.toLowerCase().trim();
        }
        let warningPass = true;
        let warningPassText = "warningPass";
        while (warningPassText != "y" &&
            warningPassText != "n" &&
            warningPassText != "") {
            warningPassText = await readLine("警告通过(Y/n)：".blue);
            warningPassText = warningPassText.toLowerCase().trim();
        }
        if (warningPassText == "n") {
            warningPass = false;
        }
        else {
            warningPass = true;
        }
        let remark = await readLine("注释：".blue);
        let funcObj = {
            id: id,
            type: type,
            name: name,
            url: url,
            method: method,
            warningPass: warningPass,
            remark: remark,
        };
        funcList.push(funcObj);
        writeFuncList(funcList, jsonPath);
        writeApiExportFile(funcList, apiPath);
        console.log("新增接口成功，接口导出文件已更新！".green + `    ${ "接口Id为：".blue }${ funcObj.id.toString().green }`);
        showApiDetailById(funcList, funcObj.id);
    }
    //从项目之中删除一个接口
    async function deleteFunc (funcList, id) {
        let index = funcList.findIndex(func => func.id == id);
        if (index > -1) {
            showApiDetailById(funcList, id);
            let text = "text";
            while (text != "y" &&
                   text != "n" &&
                   text != "") {
                text = await readLine(`确认删除Id为 ${ id } 的函数(N/y)：`);
                text = text.toLowerCase().trim();
            }
            if (text == "y") {
                funcList.splice(index, 1);
                writeFuncList(funcList, jsonPath);
                writeApiExportFile(funcList, apiPath);
                console.log("新增删除成功，接口导出文件已更新！".green); 
            }
        }
        else {
            console.log("无此Id！".red);
        }
    }
//#endregion

async function readLine (ques) {
    return new Promise((resolve, reject) => {
        readLineSys.question(ques, answer => {
            resolve(answer);
        });
    });
}

readLineSys.on("close", () => {
    console.log("谢谢使用".green);
});

function showLineTop () {
    console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━".cyan);
}
function showLineBottom () {
    console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━".cyan);
}

//主函数
async function main () {
    let funcList = readFuncList(jsonPath);
    console.log("欢迎使用鸡毛接口管理工具！".green);
    let text = "";
    while (text != "q") {
        text = await readLine(">> ");
        text = text.toLowerCase().trim();
        let id = Number(text);
        if (!isNaN(id)) {
            showLineTop();
            showApiDetailById(funcList, id);
            showLineBottom();
        }
        else {
            if (text == "l" || text == "ll") {
                showLineTop();
                showAllApi(funcList);
                showLineBottom();
            }
            else if (text.startsWith("s ")) {
                let strList = text.split(/[\s]+/);
                if (strList.length == 2) {
                    let keyword = strList[1].trim();
                    showLineTop();
                    showSearchApiList(funcList, keyword);
                    showLineBottom();
                }
                else {
                    console.log("搜索关键词输入错误！".red);
                }
            }
            else if (text == "a" || text == "add") {
                showLineTop();
                await addNewApi(funcList);
                showLineBottom();
            }
            else if (text.startsWith("d") || text.startsWith("del")) {
                let strList = text.split(/[\s]+/);
                if (strList.length == 2) {
                    let id = Number(strList[1].trim());
                    if (!isNaN(id)) {
                        showLineTop();
                        await deleteFunc (funcList, id);
                        showLineBottom();
                    }
                    else {
                        console.log("Id输入错误！".red);
                    }
                }
                else {
                    console.log("命令输入错误！".red);
                }       
            }
            else if (text == "u" || text == "update") {
                showLineTop();
                funcList = readFuncList(jsonPath);
                console.log("函数列表更新成功！".green);
                showLineBottom();
            }
            else if (text == "w" || text == "write") {
                showLineTop();
                writeApiExportFile(funcList, apiPath);
                console.log("API导出文件更新成功！".green);
                showLineBottom();
            }
            else {
                console.log("未知命令！");
            }
        }
    }
    readLineSys.close();
};

main();