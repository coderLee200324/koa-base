/* eslint-disable implicit-arrow-linebreak */
const mysql = require("mysql");
const { server = {} } = require("../common/sysConfig");

const mysqlConfig = {
  user: server.db_user || "",
  password: server.db_pwd || "",
  database: server.db_name || "",
  host: server.db_host || "",
  port: server.db_port || 3306,
};

const pool = mysql.createPool(mysqlConfig);
const ExecuteSql = (sql, val) =>
  new Promise((resolve, reject) => {
    pool.getConnection((errConn, connection) => {
      if (errConn) {
        reject(errConn);
      } else {
        connection.query(sql, val, (errQuery, fileds) => {
          if (errQuery) reject(errQuery);
          else resolve(fileds);
          connection.release();
        });
      }
    });
  });
module.exports = { ExecuteSql };
