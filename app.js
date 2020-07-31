#!/usr/bin/env node
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("./middelware/logger");
const staticFiles = require("./middelware/static-files");
const controller = require("./middelware/controller");
const errorHandle = require("./middelware/errorHandle");
const { server = {} } = require("./common/sysConfig");

const { port = 3000 } = server;
const app = new Koa();
// 异常处理中间件
app.use(errorHandle());
// 日志中间件
app.use(logger());
// 处理静态文件的中间件
app.use(staticFiles("/static/", `${__dirname}/static`));
// POST提交数据中间件用来获取表单数据
app.use(bodyParser());
// 路由中间件
app.use(controller());
// 错误监听
app.on("error", err => {
  console.error("error", err);
});
app.listen(port, () => {
  console.log(`app started at http://localhost:${port}`);
});
