

//自动生成的接口导入代码 生成时间 2018-09-27 16:19:07
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
async function api_actActStopTestA0004 (params) {
    let reqUrl = "/api/xsea/sceneExec/stop";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "A", true);
}


//暂未填写接口注释
async function api_actActSaveSceneMetaAO0005 (params) {
    let reqUrl = "/api/xsea/scene/saveSceneMeta";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO", true);
}



export const getGetPlanMetaByIdO0001 = api_getGetPlanMetaByIdO0001;
export const getGetPlanSceneListL0002 = api_getGetPlanSceneListL0002;
export const getGetPlanPageP0003 = api_getGetPlanPageP0003;
export const actActStopTestA0004 = api_actActStopTestA0004;
export const actActSaveSceneMetaAO0005 = api_actActSaveSceneMetaAO0005;

export default {
    getGetPlanMetaByIdO0001: api_getGetPlanMetaByIdO0001,
    getGetPlanSceneListL0002: api_getGetPlanSceneListL0002,
    getGetPlanPageP0003: api_getGetPlanPageP0003,
    actActStopTestA0004: api_actActStopTestA0004,
    actActSaveSceneMetaAO0005: api_actActSaveSceneMetaAO0005,
};

