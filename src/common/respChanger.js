
import RTV from "./rtv";

export default function (respRtv, type, warningPass = true) {
    switch (type) {
        //获取对象接口
        case "O": {
            if (respRtv.status == RTV.SUCCESS) {
                if (respRtv.data.data.success) {
                    return RTV.success(
                        respRtv.data.data.object,
                        respRtv.data.data.message,
                    );
                }
                else {
                    return RTV.error(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );       
                }
            }
            else if (warningPass && respRtv.status == RTV.WARNING) {
                if (respRtv.data.data.success) {
                    return RTV.warning(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );
                }
                else {
                    return RTV.error(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );       
                }
            }
            else {
                return RTV.error(
                    respRtv.data.data.message,
                    respRtv.data.data.object,
                );
            }
        } break;

        //获取列表接口
        case "L": {
            if (respRtv.status == RTV.SUCCESS) {
                if (respRtv.data.data.success) {
                    return RTV.success(
                        respRtv.data.data.object,
                        respRtv.data.data.message,
                    );
                }
                else {
                    return RTV.error(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );       
                }
            }
            else if (warningPass && respRtv.status == RTV.WARNING) {
                if (respRtv.data.data.success) {
                    return RTV.warning(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );
                }
                else {
                    return RTV.error(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );       
                }
            }
            else {
                return RTV.error(
                    respRtv.data.data.message,
                    respRtv.data.data.object,
                );
            }
        } break;

        //获取分页接口
        case "P": {
            if (respRtv.status == RTV.SUCCESS) {
                if (respRtv.data.data.success) {
                    return RTV.success(
                        respRtv.data.data.object,
                        respRtv.data.data.message,
                    );
                }
                else {
                    return RTV.error(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );       
                }
            }
            else if (warningPass && respRtv.status == RTV.WARNING) {
                if (respRtv.data.data.success) {
                    return RTV.warning(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );
                }
                else {
                    return RTV.error(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );       
                }
            }
            else {
                return RTV.error(
                    respRtv.data.data.message,
                    respRtv.data.data.object,
                );
            }
        } break;

        //操作行为接口
        case "A": {
            if (respRtv.status == RTV.SUCCESS) {
                if (respRtv.data.data.success) {
                    return RTV.success(
                        respRtv.data.data.object,
                        respRtv.data.data.message,
                    );
                }
                else {
                    return RTV.error(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );       
                }
            }
            else if (warningPass && respRtv.status == RTV.WARNING) {
                if (respRtv.data.data.success) {
                    return RTV.warning(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );
                }
                else {
                    return RTV.error(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );       
                }
            }
            else {
                return RTV.error(
                    respRtv.data.data.message,
                    respRtv.data.data.object,
                );
            }
        } break;

        //返回数据的操作行为接口
        case "AO": {
            if (respRtv.status == RTV.SUCCESS) {
                if (respRtv.data.data.success) {
                    return RTV.success(
                        respRtv.data.data.object,
                        respRtv.data.data.message,
                    );
                }
                else {
                    return RTV.error(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );       
                }
            }
            else if (warningPass && respRtv.status == RTV.WARNING) {
                if (respRtv.data.data.success) {
                    return RTV.warning(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );
                }
                else {
                    return RTV.error(
                        respRtv.data.data.message,
                        respRtv.data.data.object,
                    );       
                }
            }
            else {
                return RTV.error(
                    respRtv.data.data.message,
                    respRtv.data.data.object,
                );
            }
        } break;

        //资源接口
        case "R": {
            return response.data.data;
        } break;

        default: {
            return RTV.error("接口代码错误！");
        }
    }
};
