
import axios from "axios";
import { Message } from "element-ui";
import RTV from "../common/rtv";
const qs = require("qs");

axios.defaults.timeout = 50000;
axios.defaults.baseURL = '';

//显示错误信息
function showError (msg) {
    Message({
        type: "error",
        message: msg,
    });
}

//显示警报信息
function showWarning (msg) {
    Message({
        type: "warning",
        message: msg,
    });
}

function http (config) {
    return new Promise((resolve, reject) => {
        axios(config).then(response => {
            if (response.status == 200) {
                resolve(RTV.success({
                    url: response.config.url,
                    code: response.status,
                    data: response.data,
                }, response.statusText));
            }
            else {
                resolve(RTV.error(""));
            }
        }).catch(err => {
            showError("网络请求发生错误！");
            reject(err);
        });
    });
}

/**
 * 封装get方法
 * @param url 要请求的url地址
 * @param params 请求的参数
 * @returns {Promise}
 */
export function fetch(url, params = { }) {
    return http({
        method: 'GET',
        url: url,
        params: params,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

/**
 * 封装post请求
 * @param url 要请求的url地址
 * @param data 请求的参数
 * @returns {Promise}
 */
export function post(url, data = { }) {
    return http({
        method: 'POST',
        url: url,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

/**
 * 封装Post提交表单
 * @param url 要请求的url地址
 * @param formData 需要提交的表单
 * @returns {Promise}
 */
export function formSub(url, formData = { }) {
    return http({
        method: 'POST',
        url: url,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

/**
 * 封装patch请求
 * @param url 要请求的url地址
 * @param data 请求的参数
 * @returns {Promise}
 */
export function patch(url, data = { }) {
    return http({
        method: 'PATCH',
        url: url,
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

/**
 * 封装put请求
 * @param url 要请求的url地址
 * @param data 请求的参数
 * @returns {Promise}
 */
export function put(url, data = { }) {
    return http({
        method: 'PUT',
        url: url,
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
