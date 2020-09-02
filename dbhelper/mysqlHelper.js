const mysql = require("mysql");
const Client = require("./mysql-pro");
const { server = {} } = require("../common/sysConfig");

const client = new Client({
  mysql: {
    user: server.db_user || "",
    password: server.db_pwd || "",
    database: server.db_name || "",
    host: server.db_host || "",
    port: server.db_port || 3306,
    multipleStatements: true, // 是否允许执行多条sql语句
    // dataStrings: true, // 日期时间转换为字符串
    // connectionLimit: 50 // 最大连接数
  },
});

const exceteQuery = async (exceteType = "", sql, params) => {
  const results = await client.query(sql, params);
  if (exceteType.toUpperCase() === "SELECT") {
    const dataString = JSON.stringify(results);
    const data = JSON.parse(dataString);
    return data;
  }
  return results.affectedRows || 0;
};

const exceteTrans = async transArray => {
  await client.startTransaction();
  transArray.forEach(async trans => {
    const { sql, para } = trans;
    const querySql = mysql.format(sql, para);
    console.log(querySql);
    await client.executeTransaction(querySql);
  });
  await client.stopTransaction();
};

const startTransaction = () => client.startTransaction();

const executeTransaction = () => client.executeTransaction();

const stopTransaction = () => client.stopTransaction();

module.exports = {
  exceteQuery,
  exceteTrans,
  startTransaction,
  executeTransaction,
  stopTransaction,
};
