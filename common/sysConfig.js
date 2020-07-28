const fs = require("fs");
const ini = require("ini");
const path = require("path");

const readConfig = () => {
  const iopath = path.join(__dirname, "../config/sysConfig.ini"); // 引用ini文件的相对地址
  const configInfo = ini.parse(fs.readFileSync(iopath, "utf-8"));
  return configInfo;
};

module.exports = readConfig();
