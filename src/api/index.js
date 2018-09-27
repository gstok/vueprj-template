

//自动生成的接口导入代码 生成时间 2018-09-27 20:57:28
import Http from "@/utils/http";
import respChanger from "@/common/respChanger";



//暂未填写接口注释
async function api_getGetPlanMetaByIdO0001 (params) {
    let reqUrl = "/api/xsea/plan/getPlanMetaById";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O", false);
}


//暂未填写接口注释
async function api_getGetPlanSceneListL0002 (params) {
    let reqUrl = "/api/xsea/plan/queryPlanSceneList";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L", true);
}


//暂未填写接口注释
async function api_getGetPlanPageP0003 (params) {
    let reqUrl = "/api/xsea/plan/list";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "P", true);
}


//暂未填写接口注释
async function api_actStopTestA0004 (params) {
    let reqUrl = "/api/xsea/sceneExec/stop";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "A", true);
}


//暂未填写接口注释
async function api_actSaveSceneMetaAO0005 (params) {
    let reqUrl = "/api/xsea/scene/saveSceneMeta";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO", true);
}


//保存
async function api_actSaveAO0006 (params) {
    let reqUrl = "/api/save";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO", true);
}


//删除
async function api_actDeleteA0007 (params) {
    let reqUrl = "/api/delete";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "A", true);
}


//更新数据
async function api_actUpdateA0008 (params) {
    let reqUrl = "/api/update";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "A", true);
}


//哈哈
async function api_getHahaO0009 (params) {
    let reqUrl = "/api/gethaha";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O", true);
}



export const getGetPlanMetaByIdO0001 = api_getGetPlanMetaByIdO0001;
export const getGetPlanSceneListL0002 = api_getGetPlanSceneListL0002;
export const getGetPlanPageP0003 = api_getGetPlanPageP0003;
export const actStopTestA0004 = api_actStopTestA0004;
export const actSaveSceneMetaAO0005 = api_actSaveSceneMetaAO0005;
export const actSaveAO0006 = api_actSaveAO0006;
export const actDeleteA0007 = api_actDeleteA0007;
export const actUpdateA0008 = api_actUpdateA0008;
export const getHahaO0009 = api_getHahaO0009;

export default {
    getGetPlanMetaByIdO0001: api_getGetPlanMetaByIdO0001,
    getGetPlanSceneListL0002: api_getGetPlanSceneListL0002,
    getGetPlanPageP0003: api_getGetPlanPageP0003,
    actStopTestA0004: api_actStopTestA0004,
    actSaveSceneMetaAO0005: api_actSaveSceneMetaAO0005,
    actSaveAO0006: api_actSaveAO0006,
    actDeleteA0007: api_actDeleteA0007,
    actUpdateA0008: api_actUpdateA0008,
    getHahaO0009: api_getHahaO0009,
};

