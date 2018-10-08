//单位自动换算，px或%单位
export function ut (obj) {
    try {
        let str = obj.toString().trim();
        let num = parseFloat(str);
        let ext = "px";
        if (isNaN(num)) {
            num = 0;
        }
        if (str.endsWith("%")) {
            ext = "%";
        }
        return num.toString() + ext;
    }
    catch (e) {
        return obj;
    }
}

//获得百分比数，可传入百分比数字符串
export function percent (obj, accu) {
    try {
        let str = obj.toString().trim();
        let num = parseFloat(str);
        if (!str.endsWith("%")) {
            num *= 100;
        }
        if (accu !== undefined) {
            num = this.decimalTrct(num, accu);
        }
        return num;
    }
    catch (e) {
        return obj;
    }
}

//获得百分比数字符串
export function percentStr (obj, accu) {
    return this.percent(obj, accu) + "%";
}

//截断小数位保留精度
export function decimalTrct (num, accu) {
    try {
        let numStr = Decimal(num).toFixed(accu, Decimal.ROUND_DOWN);
        return Decimal(numStr).toNumber();
    }
    catch (e) {
        return num;
    }
}

//获得小数，可传入百分比字符串
export function decimal (obj, accu) {
    try {
        let str = obj.toString().trim();
        let num = parseFloat(str);
        if (str.endsWith("%")) {
            num /= 100;
        }
        if (accu !== undefined) {
            num = this.decimalTrct(num, accu);
        }
        return num;
    }
    catch (e) {
        return obj;
    }
}

