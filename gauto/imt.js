//async接口管理工具，by鸡毛，2018年09月26日

const readLineCtr = require("readline");
const readLineSys = readLineCtr.createInterface(process.stdin, process.stdout);

async function readLine () {
    return new Promise((resolve, reject) => {
        readLineSys.question(">> ", answer => {
            resolve(answer);
        });
    });
}

readLineSys.on("close", () => {
    console.log("谢谢使用");
});

(async () => {
    console.log("请输入：");
    while (true) {
        let text = await readLine();
        console.log(text);
    }
    readLineSys.close();
})();