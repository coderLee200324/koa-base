const fs = require("fs");

const addMapping = (router, mapping) => {
  const urlKeys = Object.keys(mapping);
  urlKeys.forEach(url => {
    if (url.startsWith("GET ")) {
      const path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith("POST ")) {
      const path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith("PUT ")) {
      const path = url.substring(4);
      router.put(path, mapping[url]);
      console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith("DELETE ")) {
      const path = url.substring(7);
      router.del(path, mapping[url]);
      console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  });
};

const addControllers = (router, dir) => {
  // 这里可以用sync是因为启动时只运行一次，不存在性能问题:
  const files = fs.readdirSync(dir);
  // 过滤出.js文件:
  const jsFiles = files.filter(file => file.endsWith(".js"));
  jsFiles.forEach(jsFile => {
    const mapping = require(`${dir}/${jsFile}`);
    addMapping(router, mapping);
  });
};

module.exports = dir => {
  // 如果不传参数，扫描目录默认为'controllers'
  const defDir = require("path").resolve(__dirname, "../controllers");
  const controllersDir = dir || defDir;
  const router = require("koa-router")();
  addControllers(router, controllersDir);
  return router.routes();
};
