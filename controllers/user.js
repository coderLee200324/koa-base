module.exports = {
  "POST /login": async ctx => {
    ctx.response.type = "application/json";
    ctx.response.body = {
      code: 0,
      msg: "成功",
    };
  },
  "POST /user": async ctx => {
    ctx.response.type = "application/json";
    ctx.response.body = {
      code: 0,
      msg: "成功",
    };
  },
};
