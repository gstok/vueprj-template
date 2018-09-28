

//自动生成的接口导入代码 生成时间 2018-09-28 15:40:01
import Http from "@/utils/http";
import respChanger from "@/common/respChanger";



//计划分页接口
async function api_getPlanPageP0001 (params) {
    let reqUrl = "/api/xsea/plan/list";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "P", true);
}


//报告分页
async function api_getReportPageP0002 (params) {
    let reqUrl = "/api/xsea/report/list";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "P", true);
}


//脚本分页
async function api_getScriptPageP0003 (params) {
    let reqUrl = "/api/xsea/script/list";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "P", true);
}


//根据计划Id获取计划的Meta信息
async function api_getPlanMetaByIdO0004 (params) {
    let reqUrl = "/api/xsea/plan/getPlanMetaById";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O", true);
}


//传入type和id，返回对应对象的label列表
async function api_getObjectLabelsL0005 (params) {
    let reqUrl = "/api/xsea/label/queryByIdAndType";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L", true);
}


//获取一个计划的迭代列表
async function api_getItersByPlanIdL0006 (params) {
    let reqUrl = "/api/xsea/plan/getItersByPlanId";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L", true);
}


//获取计划下的场景列表
async function api_getPlanSceneListL0007 (params) {
    let reqUrl = "/api/xsea/plan/queryPlanSceneList";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L", true);
}


//获取计划的应用列表对象
async function api_getPlanAppListO0008 (params) {
    let reqUrl = "/api/xsea/plan/queryPlanAppList";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O", true);
}


//获取计划下场景的统计信息
async function api_getPlanSceneStatisticsO0009 (params) {
    let reqUrl = "/api/xsea/plan/querySceneStatistics";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O", true);
}


//获取计划下App的统计信息
async function api_getPlanAppStatisticsO0010 (params) {
    let reqUrl = "/api/xsea/plan/queryAppStatistics";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O", true);
}


//根据类型获取系统label库列表
async function api_getSysLabelListL0011 (params) {
    let reqUrl = "/api/xsea/label/fuzzyQuery";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L", true);
}


//保存一个系统Label，返回LabelId
async function api_actSaveSysLabelAO0012 (params) {
    let reqUrl = "/api/xsea/label/save";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO", true);
}


//删除一个系统Label，返回状态
async function api_actDelSysLabelA0013 (params) {
    let reqUrl = "/api/xsea/label/delete";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "A", true);
}


//添加一个Label到对象
async function api_actAddLabelToObjectA0014 (params) {
    let reqUrl = "/api/xsea/label/addRelsLabels";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "A", true);
}


//在对象上删除一个Label
async function api_actDelLabelInObjectA0015 (params) {
    let reqUrl = "/api/xsea/label/delRelLabes";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "A", true);
}


//在计划中添加一个新场景，新场景为默认，返回场景Id
async function api_actAddSceneInPlanAO0016 (params) {
    let reqUrl = "/api/xsea/scene/saveSceneMeta";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO", true);
}


//查询场景的详细信息
async function api_getSceneDetailO0017 (params) {
    let reqUrl = "/api/xsea/scene/querySceneDetail";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O", true);
}


//查询场景的告警配置模板
async function api_getSceneAlarmTempListL0018 (params) {
    let reqUrl = "/api/xsea/alert/queryBySceneId";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L", true);
}


//保存场景的Meta信息
async function api_actSaveSceneMetaAO0019 (params) {
    let reqUrl = "/api/xsea/scene/saveSceneMeta";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO", true);
}


//获取场景关联的App列表
async function api_getSceneRelateAppL0020 (params) {
    let reqUrl = "/api/xsea/scene/getRelateApp";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L", true);
}


//传入userNum评估压力机数量
async function api_getCalculateMachineL0021 (params) {
    let reqUrl = "/api/xsea/scene/calculateMachine";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L", true);
}


//保存策略曲线
async function api_actSaveStrategyAO0022 (params) {
    let reqUrl = "/api/xsea/scene/saveStrategy";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO", true);
}


//传入一个告警参数对象，保存此对象，根据Id
async function api_actSaveAlarmInfoAO0023 (params) {
    let reqUrl = "/api/xsea/alert/save";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO", true);
}


//添加场景脚本关联
async function api_actAddSceneScriptRelA0024 (params) {
    let reqUrl = "/xsea/scene/addSceneScriptRel";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "A", true);
}


//修改场景脚本关联信息
async function api_actModifySceneScriptRelA0025 (params) {
    let reqUrl = "/api/xsea/scene/modifySceneScriptRel";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "A", true);
}


//删除场景脚本关联信息
async function api_actDeleteSceneScriptRelA0026 (params) {
    let reqUrl = "/api/xsea/scene/deleteSceneScriptRel";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "A", true);
}


//开始压测一个场景
async function api_actStartSceneAO0027 (params) {
    let reqUrl = "/api/xsea/sceneExec/start";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO", true);
}


//获取场景执行的实时基本信息
async function api_getSceneExecInfoO0028 (params) {
    let reqUrl = "/api/xsea/sceneExec/querySceneExecInfo";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O", true);
}


//停止场景的执行
async function api_actStopSceneExecAO0029 (params) {
    let reqUrl = "/api/xsea/sceneExec/stop";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO", true);
}


//获取脚本详情信息
async function api_getScriptDetailO0030 (params) {
    let reqUrl = "/api/xsea/script/queryDetail";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O", true);
}


//获取脚本资产列表
async function api_getScriptAssetListL0031 (params) {
    let reqUrl = "/api/xsea/assetFile/queryByScriptId";
    let respRtv = await Http.fetch(reqUrl, params);
    return respChanger(respRtv, "L", true);
}


//获取用户列表，支持模糊查询
async function api_getUserListL0032 (params) {
    let reqUrl = "/api/xsea/user/fuzzyQuery";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L", true);
}


//获取系统内的应用列表
async function api_getAppListL0033 (params) {
    let reqUrl = "/api/xsea/app/list";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L", true);
}


//创建一个计划接口，返回计划Id
async function api_actCreatePlanAO0034 (params) {
    let reqUrl = "/api/xsea/plan/createPlan";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "AO", true);
}


//获取场景执行步骤日志
async function api_getSceneExecLogListL0035 (params) {
    let reqUrl = "/api/xsea/sceneExec/queryExecLogDetail";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L", true);
}


//首页获取计划统计信息
async function api_getPlanStatisticsO0036 (params) {
    let reqUrl = "/api/xsea/index/getPlanStatistics";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O", true);
}


//首页获取报告统计信息接口
async function api_getReportStatisticsO0037 (params) {
    let reqUrl = "/api/xsea/index/getReportStatistics";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O", true);
}


//获取正在运行的计划列表
async function api_getRunningPlanListL0038 (params) {
    let reqUrl = "/api/xsea/index/runningPlanList";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "L", true);
}



export const getPlanPageP0001 = api_getPlanPageP0001;
export const getReportPageP0002 = api_getReportPageP0002;
export const getScriptPageP0003 = api_getScriptPageP0003;
export const getPlanMetaByIdO0004 = api_getPlanMetaByIdO0004;
export const getObjectLabelsL0005 = api_getObjectLabelsL0005;
export const getItersByPlanIdL0006 = api_getItersByPlanIdL0006;
export const getPlanSceneListL0007 = api_getPlanSceneListL0007;
export const getPlanAppListO0008 = api_getPlanAppListO0008;
export const getPlanSceneStatisticsO0009 = api_getPlanSceneStatisticsO0009;
export const getPlanAppStatisticsO0010 = api_getPlanAppStatisticsO0010;
export const getSysLabelListL0011 = api_getSysLabelListL0011;
export const actSaveSysLabelAO0012 = api_actSaveSysLabelAO0012;
export const actDelSysLabelA0013 = api_actDelSysLabelA0013;
export const actAddLabelToObjectA0014 = api_actAddLabelToObjectA0014;
export const actDelLabelInObjectA0015 = api_actDelLabelInObjectA0015;
export const actAddSceneInPlanAO0016 = api_actAddSceneInPlanAO0016;
export const getSceneDetailO0017 = api_getSceneDetailO0017;
export const getSceneAlarmTempListL0018 = api_getSceneAlarmTempListL0018;
export const actSaveSceneMetaAO0019 = api_actSaveSceneMetaAO0019;
export const getSceneRelateAppL0020 = api_getSceneRelateAppL0020;
export const getCalculateMachineL0021 = api_getCalculateMachineL0021;
export const actSaveStrategyAO0022 = api_actSaveStrategyAO0022;
export const actSaveAlarmInfoAO0023 = api_actSaveAlarmInfoAO0023;
export const actAddSceneScriptRelA0024 = api_actAddSceneScriptRelA0024;
export const actModifySceneScriptRelA0025 = api_actModifySceneScriptRelA0025;
export const actDeleteSceneScriptRelA0026 = api_actDeleteSceneScriptRelA0026;
export const actStartSceneAO0027 = api_actStartSceneAO0027;
export const getSceneExecInfoO0028 = api_getSceneExecInfoO0028;
export const actStopSceneExecAO0029 = api_actStopSceneExecAO0029;
export const getScriptDetailO0030 = api_getScriptDetailO0030;
export const getScriptAssetListL0031 = api_getScriptAssetListL0031;
export const getUserListL0032 = api_getUserListL0032;
export const getAppListL0033 = api_getAppListL0033;
export const actCreatePlanAO0034 = api_actCreatePlanAO0034;
export const getSceneExecLogListL0035 = api_getSceneExecLogListL0035;
export const getPlanStatisticsO0036 = api_getPlanStatisticsO0036;
export const getReportStatisticsO0037 = api_getReportStatisticsO0037;
export const getRunningPlanListL0038 = api_getRunningPlanListL0038;

export default {
    getPlanPageP0001: api_getPlanPageP0001,
    getReportPageP0002: api_getReportPageP0002,
    getScriptPageP0003: api_getScriptPageP0003,
    getPlanMetaByIdO0004: api_getPlanMetaByIdO0004,
    getObjectLabelsL0005: api_getObjectLabelsL0005,
    getItersByPlanIdL0006: api_getItersByPlanIdL0006,
    getPlanSceneListL0007: api_getPlanSceneListL0007,
    getPlanAppListO0008: api_getPlanAppListO0008,
    getPlanSceneStatisticsO0009: api_getPlanSceneStatisticsO0009,
    getPlanAppStatisticsO0010: api_getPlanAppStatisticsO0010,
    getSysLabelListL0011: api_getSysLabelListL0011,
    actSaveSysLabelAO0012: api_actSaveSysLabelAO0012,
    actDelSysLabelA0013: api_actDelSysLabelA0013,
    actAddLabelToObjectA0014: api_actAddLabelToObjectA0014,
    actDelLabelInObjectA0015: api_actDelLabelInObjectA0015,
    actAddSceneInPlanAO0016: api_actAddSceneInPlanAO0016,
    getSceneDetailO0017: api_getSceneDetailO0017,
    getSceneAlarmTempListL0018: api_getSceneAlarmTempListL0018,
    actSaveSceneMetaAO0019: api_actSaveSceneMetaAO0019,
    getSceneRelateAppL0020: api_getSceneRelateAppL0020,
    getCalculateMachineL0021: api_getCalculateMachineL0021,
    actSaveStrategyAO0022: api_actSaveStrategyAO0022,
    actSaveAlarmInfoAO0023: api_actSaveAlarmInfoAO0023,
    actAddSceneScriptRelA0024: api_actAddSceneScriptRelA0024,
    actModifySceneScriptRelA0025: api_actModifySceneScriptRelA0025,
    actDeleteSceneScriptRelA0026: api_actDeleteSceneScriptRelA0026,
    actStartSceneAO0027: api_actStartSceneAO0027,
    getSceneExecInfoO0028: api_getSceneExecInfoO0028,
    actStopSceneExecAO0029: api_actStopSceneExecAO0029,
    getScriptDetailO0030: api_getScriptDetailO0030,
    getScriptAssetListL0031: api_getScriptAssetListL0031,
    getUserListL0032: api_getUserListL0032,
    getAppListL0033: api_getAppListL0033,
    actCreatePlanAO0034: api_actCreatePlanAO0034,
    getSceneExecLogListL0035: api_getSceneExecLogListL0035,
    getPlanStatisticsO0036: api_getPlanStatisticsO0036,
    getReportStatisticsO0037: api_getReportStatisticsO0037,
    getRunningPlanListL0038: api_getRunningPlanListL0038,
};

