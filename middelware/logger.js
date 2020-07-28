// logger 中间件
const fs = require("fs");
const path = require("path");
const moment = require("moment");

module.exports = () => async (ctx, next) => {
  const startTime = Date.now();
  const requestTime = new Date();
  await next();
  const ms = Date.now() - startTime;
  const logout = `${ctx.request.ip} -- ${requestTime} -- ${ctx.method} -- ${ctx.url} -- ${ms}ms`;
  // 输出日志文件
  const fileName = `log_${moment().format("YYYYMMDD")}.txt`;
  const outPath = path.join(__dirname, `../syslogs/${fileName}`); // 文本保存的地址
  fs.appendFileSync(outPath, `${logout}\n`);
};
