
//接口分为六类
//1.获取对象接口，获取一个对象 O 前缀 get object
//2.获取列表接口，获取一个列表 L 前缀 get list
//3.获取分页接口，获取一个分页对象（包含列表） P 前缀 get page
//4.操作行为接口，获取操作行为的结果状态 A 前缀 act 
//5.高级操作行为接口，获取操作行为的结果状态和附加数据 AO 前缀 act data
//6.其他特殊接口，往往是资源访问接口，比如上传下载文件接口 R 前缀 res

//命名规范：getStudentListL001 前缀 + 自定义命名 + 类型标识 + 接口编号

//状态，提示信息，数据

import Http from "@/utils/http";
import respChanger from "@/common/respChanger";
import S from "string";

//获取一个对象接口
async function api_getPlanMetaByIdO004 (params) {
    let reqUrl = "/api/xsea/plan/getPlanMetaById";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O");
}
//获取一个列表接口
async function api_getPlanSceneListL005 (params) {
    let reqUrl = "/api/xsea/plan/queryPlanSceneList";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L");
}
//获取一个分页对象接口
async function api_getPlanPageP006 (params) {
    let reqUrl = "/api/xsea/plan/list";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "P");
}
//停止压测接口，单纯行为接口
async function api_actStopTestO007 (params) {
    let reqUrl = "/api/xsea/sceneExec/stop";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "A");
}
//新建场景接口，行为接口返回数据
async function api_actSaveSceneMetaAO008 (params) {
    let reqUrl = "/api/xsea/scene/saveSceneMeta";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO");
}

let funcList = [
    {
        id: 99,
        type: "AO",
        name: "saveSceneMeta",
        url: "/api/xsea/scene/saveSceneMeta",
        method: "post",
        warningPass: true,
        remark: "",
    },
    {
        id: 2,
        type: "O",
        name: "deleteMySceneMeta",
        url: "/api/xsea/scene/saveSceneMeta",
        method: "post",
        warningPass: false,
        remark: "",
    },
];

funcList = funcList.sort((a, b) => a.id - b.id);



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
    let warningPass = !(func.warningPass === false);
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
import Http from "@/utils/http";
import respChanger from "@/common/respChanger";
import S from "string";
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
    return `export const ${ name } = api_${ name }`;
}).join("\r\n") }

export default {
${ funcList.map(func => {
    let name = funcName(func);
    return `    ${ name }: api_${ name }`;
}).join("\r\n") }
};
`;
    return code;
}

console.log(topCode());
console.log(middleCode(funcList));
console.log(bottomCode(funcList));

export const getPlanMetaByIdO004 = api_getPlanMetaByIdO004;
export const getPlanSceneListL005 = api_getPlanSceneListL005;
export const getPlanPageP006 = api_getPlanPageP006;
export const actStopTestO007 = api_actStopTestO007;
export const actSaveSceneMetaAO008 = api_actSaveSceneMetaAO008;

export default {
    getPlanMetaByIdO004: api_getPlanMetaByIdO004,
    getPlanSceneListL005: api_getPlanSceneListL005,
    getPlanPageP006: api_getPlanPageP006,
    actStopTestO007: api_actStopTestO007,
    actSaveSceneMetaAO008: api_actSaveSceneMetaAO008,
};