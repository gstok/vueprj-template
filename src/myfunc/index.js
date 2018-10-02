//单位自动换算，px或%单位
export function ut (obj) {
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

//获得百分比数，可传入百分比数字符串
export function percent (obj, accu) {
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

//获得百分比数字符串
export function percentStr (obj, accu) {
    return this.percent(obj, accu) + "%";
}

//截断小数位保留精度
export function decimalTrct (num, accu) {
    let numStr = Decimal(num).toFixed(accu, Decimal.ROUND_DOWN);
    return Decimal(numStr).toNumber();
}

//获得小数，可传入百分比字符串
export function decimal (obj, accu) {
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

