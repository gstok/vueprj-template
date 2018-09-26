
//返回值对象
export default {
    ERROR: 0,
    SUCCESS: 1,
    WARNING: -1,
    //产生错误返回值
    error (msg, data) {
        return {
            status: this.ERROR,
            msg: msg,
            data: data,
        };
    },
    //产生成功返回值
    success (data, msg) {
        return {
            status: this.SUCCESS,
            msg: msg,
            data: data,
        };
    },
    //产生警告返回值
    warning (msg, data) {
        return {
            status: this.WARNING,
            msg: msg,
            data: data,
        };
    },
};
