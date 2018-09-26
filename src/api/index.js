
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


//获取列表接口
async function api_getSomeList001 (params) {
    let reqUrl = "";
    let iRTV = await this.$post(reqUrl, params);
    if (iRTV.status == RTV.SUCCESS ||
        iRTV.status == RTV.WARNING) {
        return iRTV.data.list;
    }
    else {
        return [];
    }
}

//获取分页接口
async function api_getPage002 (params) {
    let reqUrl = "";
    let iRTV = await this.$post(reqUrl, params);
    if (iRTV.status == RTV.SUCCESS ||
        iRTV.status == RTV.WARNING) {
        return iRTV.data.page;
    }
    else {
        return null;
    }
}

//获取对象接口
async function api_getObject003 (params) {
    let reqUrl = "";
    let iRTV = await this.$post(reqUrl, params);
    if (iRTV.status == RTV.SUCCESS ||
        iRTV.status == RTV.WARNING) {
        return iRTV.data.object;
    }
    else {
        return null;
    }
}

//行为操作接口
async function api_actOpenSome004 (params) {
    let reqUrl = "";
    let iRTV = await this.$post(reqUrl, params);
    if (iRTV.status == RTV.SUCCESS ||
        iRTV.status == RTV.WARNING) {
        return iRTV.data.object;
    }
    else {
        return null;
    }
}



export const getSomeList = api_getSomeList;

export default {
    getSomeList: api_getSomeList,
};