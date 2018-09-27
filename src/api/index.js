

//自动生成的接口导入代码 生成时间 2018-09-27 21:21:13
import Http from "@/utils/http";
import respChanger from "@/common/respChanger";



//获得一个学生的基本信息
async function api_getGetStudentO0001 (params) {
    let reqUrl = "/api/student/get";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "O", true);
}


//删除
async function api_actDeleteA0002 (params) {
    let reqUrl = "/api/delete";
    let respRtv = await Http.post(reqUrl, params);
    return respChanger(respRtv, "A", true);
}



export const getGetStudentO0001 = api_getGetStudentO0001;
export const actDeleteA0002 = api_actDeleteA0002;

export default {
    getGetStudentO0001: api_getGetStudentO0001,
    actDeleteA0002: api_actDeleteA0002,
};

