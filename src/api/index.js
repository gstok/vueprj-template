
//接口分为六类
//1.获取对象接口，获取一个对象 O 前缀 get object
//2.获取列表接口，获取一个列表 L 前缀 get list
//3.获取分页接口，获取一个分页对象（包含列表） P 前缀 get page
//4.操作行为接口，获取操作行为的结果状态 A 前缀 act 
//5.高级操作行为接口，获取操作行为的结果状态和附加数据 AO 前缀 act data
//6.其他特殊接口，往往是资源访问接口，比如上传下载文件接口 R 前缀 res

//命名规范：getStudentListL001 前缀 + 自定义命名 + 类型标识 + 接口编号

//状态，提示信息，数据


import RTV from "../common/rtv";


async function api_getObject001 (params) {
    let reqUrl = "";
    let response = await this.$post(reqUrl, params);
    if (response.status == RTV.SUCCESS ||
        response.status == RTV.WARNING) {
        return response.object;
    }
    else {
        return null;
    }
}

//获取列表接口
async function api_getSomeList001 (params) {
    let reqUrl = "";
    let rtv = await this.$post(reqUrl, params);
    if (rtv.status == RTV.SUCCESS ||
        rtv.status == RTV.WARNING) {
        return rtv.data.list;
    }
    else {
        return [];
    }
}

async function api_action (params) {
    let reqUrl = "";
    let response = await this.$post(reqUrl, params);
    if (response.success) {
        return response.list;
    }
    else {
        return [];
    }
}

async function api_actionData (params) {
    let reqUrl = "";
    let response = await this.$post(reqUrl, params);
    if (response.success) {
        return response.list;
    }
    else {
        return [];
    }
}

async function api_page (params) {
    let reqUrl = "";
    let response = await this.$post(reqUrl, params);
    if (response.success) {
        return response.list;
    }
    else {
        return [];
    }
}

async function api_getObject (params) {
    let reqUrl = "";
    let response = await this.$post(reqUrl, params);
    if (response.success) {
        return response.list;
    }
    else {
        return [];
    }
}



export const getSomeList = api_getSomeList;

export default {
    getSomeList: api_getSomeList,
};