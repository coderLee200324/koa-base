// const _ = require('lodash') lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。
const errorHandle = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    // let errorMsg = err.message;
    // if (err.errors && typeof err.errors === "object") {
    //   _.mapValues(err.errors, item => {
    //     if (item.message) {
    //       errorMsg = item.message;
    //     }
    //   });
    // }
    ctx.body = { errorMsg: err.message };
    ctx.app.emit("error", err, ctx);
  }
};

module.exports = errorHandle;
