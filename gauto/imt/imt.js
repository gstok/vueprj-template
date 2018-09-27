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

//显示所有接口信息
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
        console.log("\n");
        console.log(`${ "url:".blue }    ${ func.url.green }`);
        console.log(`${ id.red }    ${ name.green }    ${ type.blue }    ${ method.yellow }    ${ ("warningPass:" + func.warningPass.toString()).blue }`);
        console.log(funcBuilder(func));
    }
    else {
        console.log("没有找到此接口");
    }
}



//生成接口文件
function buildApiFile (jsonPath, jsPath) {
    let funcList = getFuncListFromFile(jsonPath);
    // showAllApi(funcList);
    showApiDetailById(funcList, 2);
    writeApiListToJsFile(funcList, jsPath);
}




// buildApiFile("./api.json", "../../src/api/index.js");
// console.log("接口导出代码生成成功！");
// process.exit();

async function readLine () {
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
        let text = await readLine();
        text = text.toLowerCase().trim();
        let id = Number(text);
        if (text == "l") {
            showAllApi(funcList);
        }
        else if (!isNaN(id)) {
            showApiDetailById(funcList, id);
        }
        else if (text == "q") {
            break;
        }
    }
    readLineSys.close();
})();