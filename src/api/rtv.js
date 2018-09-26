
//返回值对象
export default {
    ERROR: 0,
    SUCCESS: 1,
    WARNING: -1,
    error (msg, data) {
        return {
            status: this.ERROR,
            msg: msg,
            data: data,
        };
    },
    success (data, msg) {
        return {
            status: this.SUCCESS,
            msg: msg,
            data: data,
        };
    },
    WARNING (msg, data) {
        return {
            status: this.WARNING,
            msg: msg,
            data: data,
        };
    },
};
