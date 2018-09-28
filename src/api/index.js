

//自动生成的接口导入代码 生成时间 2018-09-28 10:47:24
import Http from "@/utils/http";
import respChanger from "@/common/respChanger";



//获取一个计划的场景列表
async function api_getGetPlanSceneListL0001 (params) {
    let reqUrl = "/api/xsea/plan/queryPlanSceneList";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L", true);
}


//获取计划分页
async function api_getGetPlanPageP0002 (params) {
    let reqUrl = "/api/xsea/plan/list";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "P", true);
}


//获取计划的基本信息
async function api_getGetPlanMetaByIdO0003 (params) {
    let reqUrl = "/api/xsea/plan/getPlanMetaById";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O", true);
}


//停止场景运行的接口
async function api_actActStopTestA0004 (params) {
    let reqUrl = "/api/xsea/sceneExec/stop";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "A", true);
}


//新增一个场景
async function api_actActSaveSceneMetaAO0005 (params) {
    let reqUrl = "/api/xsea/scene/saveSceneMeta";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO", true);
}


//测试接口
async function api_resTestR0006 (params) {
    let reqUrl = "/api/test";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "R", true);
}


//保存信息
async function api_actSaveAO0007 (params) {
    let reqUrl = "/api/save";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO", true);
}



export const getGetPlanSceneListL0001 = api_getGetPlanSceneListL0001;
export const getGetPlanPageP0002 = api_getGetPlanPageP0002;
export const getGetPlanMetaByIdO0003 = api_getGetPlanMetaByIdO0003;
export const actActStopTestA0004 = api_actActStopTestA0004;
export const actActSaveSceneMetaAO0005 = api_actActSaveSceneMetaAO0005;
export const resTestR0006 = api_resTestR0006;
export const actSaveAO0007 = api_actSaveAO0007;

export default {
    getGetPlanSceneListL0001: api_getGetPlanSceneListL0001,
    getGetPlanPageP0002: api_getGetPlanPageP0002,
    getGetPlanMetaByIdO0003: api_getGetPlanMetaByIdO0003,
    actActStopTestA0004: api_actActStopTestA0004,
    actActSaveSceneMetaAO0005: api_actActSaveSceneMetaAO0005,
    resTestR0006: api_resTestR0006,
    actSaveAO0007: api_actSaveAO0007,
};

