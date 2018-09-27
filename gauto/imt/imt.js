//async接口管理工具，by鸡毛，2018年09月26日

const fs = require("fs");
const readLineCtr = require("readline");
const readLineSys = readLineCtr.createInterface(process.stdin, process.stdout);
const S = require("string");
const Moment = require("moment");
const colors = require("colors");


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
    let id = S(func.id.toString()).padLeft(4, '0');
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


//生成顶部引用代码
function topCode () {
    let code = `
//自动生成的接口导入代码 生成时间 ${ Moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }
import Http from "@/utils/http";
import respChanger from "@/common/respChanger";
`;
    return code;
}
//生成中部接口代码
function middleCode (funcList) {
    let code = `
${ funcList.map(func => {
    return funcBuilder(func);
}).join("\r\n") }
`;
    return code;
}
//生成底部导出代码
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





//从json文件中获取函数对象列表
function getFuncListFromFile (filePath) {
    let jsonStr = fs.readFileSync(filePath);
    return JSON.parse(jsonStr);
}

//根据函数对象列表生成API导出代码写入到文件中
function writeApiListToJsFile (funcList, filePath) {
    let code = `
${ topCode(funcList) }
${ middleCode(funcList) }
${ bottomCode(funcList) }
`;
    fs.writeFileSync(filePath, code);
    return code;
}

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

async function addNewApi (funcList, jsonPath, jsPath) {
    let idList = funcList.map(func => func.id);
    let max = Math.max(...idList);
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
    buildJsonFile(funcList, jsonPath);
    buildApiFile(jsonPath, jsPath);
}


//生成Json文件
function buildJsonFile (funcList, jsonPath) {
    let jsonStr = JSON.stringify(funcList, null, 4);
    fs.writeFileSync(jsonPath, jsonStr);
}

//生成接口文件
function buildApiFile (jsonPath, jsPath) {
    let funcList = getFuncListFromFile(jsonPath);
    writeApiListToJsFile(funcList, jsPath);
}




// buildApiFile("./api.json", "../../src/api/index.js");
// console.log("接口导出代码生成成功！");
// process.exit();

async function readLine (ques) {
    return new Promise((resolve, reject) => {
        readLineSys.question(ques, answer => {
            resolve(answer);
        });
    });
}

async function readLineCmd () {
    return new Promise((resolve, reject) => {
        readLineSys.question(">> ", answer => {
            resolve(answer);
        });
    });
}

readLineSys.on("close", () => {
    console.log("谢谢使用".green);
});

(async () => {
    let funcList = [];
    funcList = getFuncListFromFile("./api.json");
    console.log("欢迎使用鸡毛接口管理工具！".green);
    while (true) {
        let text = await readLineCmd();
        text = text.toLowerCase().trim();
        let id = Number(text);
        if (text == "l") {
            showAllApi(funcList);
        }
        else if (!isNaN(id)) {
            showApiDetailById(funcList, id);
        }
        else if (text == "add") {
            addNewApi(funcList, "./api.json", "../../src/api/index.js");
        }
        else if (text == "q") {
            break;
        }
        else {
            showSearchApiList(funcList, text);
        }
    }
    readLineSys.close();
})();