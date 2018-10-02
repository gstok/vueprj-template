
const fs = require("fs");
const color = require("colors");
const readLineCtr = require("readline");
const readLineSys = readLineCtr.createInterface(process.stdin, process.stdout);

//#region 命令行输入输出相关
    async function readLine (ques) {
        return new Promise((resolve, reject) => {
            readLineSys.question(ques, answer => {
                resolve(answer);
            });
        });
    }
    readLineSys.on("close", () => {
        console.log("谢谢使用".green);
    });
    function showLineTop () {
        console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━".cyan);
    }
    function showLineBottom () {
        console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━".cyan);
    }
//#endregion


//#region 主函数
    async function main () {
        console.log("欢迎使用鸡毛组件管理工具".green);
        let text = "";
        while (text != "q" && text != "quit") {
            text = await readLine(">> ".cyan);
            text = text.trim();
        }
        readLineSys.close();
    }

    main();
//#endregion