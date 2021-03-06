//async接口管理工具，by鸡毛，2018年09月26日
//尝试合并代码

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

//#region 代码生成方法
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
function funcBuilder (funcObj) {
    let func = JSON.parse(JSON.stringify(funcObj));
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
                url: func.url,
            };
        });
        list.forEach(item => {
            console.log(`${ item.id.red }    ${ item.name.green }    ${ item.type.blue }    ${ item.method.yellow }    ${ item.url.blue }`);
        });
    }
    //显示所有接口的Url信息
    function showAllApiUrl (funcList) {
        let list = funcList.map(func => {
            return {
                id: S(func.id.toString()).padLeft(4, "0").toString(),
                url: func.url,
                type: func.type,
                method: func.method,
                name: funcName(func),
            };
        });
        list.forEach(item => {
            console.log(`${ item.id.red }    ${ item.url.blue }    ${ item.type.cyan }    ${ item.method.yellow }    ${ item.name.green }`);
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
    //根据关键字匹配接口Url进行查询并显示列表
    function showSearchUrlApiList (funcList, keyword) {
        keyword = keyword.toLowerCase().trim();
        let searchList = funcList.filter(func => {
            let url = func.url.toLowerCase().trim();
            return url.indexOf(keyword) > -1;
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
                console.log("删除成功，接口导出文件已更新！".green); 
            }
        }
        else {
            console.log("无此Id！".red);
        }
    }
    //修改一个接口信息
    async function updateApi (funcList, id, field) {
        let index = funcList.findIndex(func => func.id == id);
        let func;
        if (index > -1) {
            func = funcList[index];
            switch (field) {
                case "TYPE": {
                    console.log("旧的接口类型为：".blue + func.type.green);
                    let type = await readLine("请输入新的接口类型(O,L,P,A,AO,R)：".blue);
                    type = type.toUpperCase().trim();
                    if (type == "O" ||
                        type == "L" ||
                        type == "P" ||
                        type == "A" ||
                        type == "AO" ||
                        type == "R") {
                        func.type = type;
                    }
                    else {
                        console.log("接口类型输入错误，更新失败！".red);
                        return;
                    }
                } break;
                case "NAME": {
                    console.log("旧的接口名称为：".blue + func.name.green);
                    let name = await readLine("请输入新的接口名称：".blue);
                    name = name.trim();
                    if (name) {
                        func.name = name;
                    }
                    else {
                        console.log("接口名称输入为空，更新失败！".red);
                        return;
                    }
                } break;
                case "URL": {
                    console.log("旧的接口地址为：".blue + func.url.green);
                    let url = await readLine("请输入新的接口地址：".blue);
                    url = url.trim();
                    if (url) {
                        func.url = url;
                    }
                    else {
                        console.log("接口地址输入为空，更新失败！".red);
                        return;
                    }
                } break;
                case "METHOD": {
                    console.log("旧的接口请求方法为：".blue + func.method);
                    let method = await readLine("请输入新的接口请求方法：".blue);
                    method = method.trim();
                    if (method) {
                        func.method = method;
                    }
                    else {
                        console.log("接口请求方法输入为空，更新失败！".red);
                        return;
                    }
                } break;
                case "WARNINGPASS": {
                    console.log("旧的接口警告通过为：".blue + func.warningPass);
                    let warningPass = await readLine("请输入新的接口警告通过（y/n）：".blue);
                    warningPass = warningPass.toLowerCase().trim();
                    if (warningPass == "y") {
                        func.warningPass = true;
                    }
                    else if (warningPass == "n") {
                        func.warningPass = false;
                    }
                    else {
                        console.log("接口警告通过输入错误，更新失败！".red);
                        return;
                    }
                } break;
                case "REMARK": {
                    console.log("旧的接口备注信息为：".blue + func.remark);
                    let remark = await readLine("请输入新的接口备注信息：".blue);
                    remark = remark.trim();
                    if (remark) {
                        func.remark = remark;
                    }
                    else {
                        console.log("接口备注信息输入为空，更新失败！".red);
                        return;
                    }
                } break;
            }
            funcList[index] = func;
            showApiDetailById(funcList, func.id);
            writeFuncList(funcList, jsonPath);
            console.log("函数列表文件更新成功！".green);
            writeApiExportFile(funcList, apiPath);
            console.log("接口导出文件更新成功！".green);
        }
        else {
            console.log("无此接口！".red);
        }
    }
//#endregion

//#region 命令行输入输出方法
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
        console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━".cyan);
    }
    function showLineBottom () {
        console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━".cyan);
    }
//#endregion

//主函数
async function main () {
    let funcList = readFuncList(jsonPath);
    console.log("欢迎使用鸡毛接口管理工具！".green);
    let text = "";
    while (text != "q" && text != "quit") {
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
            else if (text.startsWith("s ") || text.startsWith("search ")) {
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
            else if (text == "url") {
                showLineTop();
                showAllApiUrl(funcList);
                showLineBottom();     
            }
            else if (text.startsWith("surl ")) {
                let strList = text.split(/[\s]+/);
                if (strList.length == 2) {
                    let keyword = strList[1].trim();
                    showLineTop();
                    showSearchUrlApiList(funcList, keyword);
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
            else if (text.startsWith("d ") || text.startsWith("del ")) {
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
            //编辑功能
            else if (text.startsWith("e ") || text.startsWith("edit ")) {
                let strList = text.split(/[\s]+/);
                if (strList.length == 3) {
                    let id = Number(strList[1]);
                    if (isNaN(id)) {
                        console.log("接口Id输入错误！".red);
                    }
                    else {
                        let field = strList[2].toUpperCase().trim();
                        if (field != "TYPE" &&
                            field != "NAME" &&
                            field != "URL" &&
                            field != "METHOD" &&
                            field != "WARNINGPASS" &&
                            field != "REMARK") {
                            console.log("待编辑字段输入错误！".red);
                        }
                        else {
                            await updateApi(funcList, id, field);
                        }
                    }
                }
                else {
                    console.log("命令格式输入错误！".red);
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
            else if (text == "q" || text == "quit") {

            }
            else {
                console.log("未知命令！");
            }
        }
    }
    readLineSys.close();
};

main();