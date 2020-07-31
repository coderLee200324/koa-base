// const _ = require('lodash') lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。
const errorHandle = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "服务器错误";
    ctx.status = status;
    // let errorMsg = err.message;
    // if (err.errors && typeof err.errors === "object") {
    //   _.mapValues(err.errors, item => {
    //     if (item.message) {
    //       errorMsg = item.message;
    //     }
    //   });
    // }
    ctx.body = { status, errorMsg: message };
    ctx.app.emit("error", err, ctx);
  }
};

module.exports = errorHandle;
