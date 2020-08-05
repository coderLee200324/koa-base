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

/**
 * 执行sql语句并获取返回结果
 * @param sql 接收的sql语句
 * @param values 接受的参数： 为数组
 */
const query = (sql, values) =>
  new Promise((resolve, reject) => {
    pool.getConnection((errConn, connection) => {
      if (errConn) reject(errConn);
      else {
        connection.query(sql, values, (errQuery, fileds) => {
          if (errQuery) reject(errQuery);
          else resolve(fileds);
          connection.release();
        });
      }
    });
  });
/**
 * 结构分析
 * @param {*}} sqlObj
 */
const structureAnalysis = sqlObj => {
  const dataKey = [];
  const dataValue = [];
  // 读取键值
  sqlObj.data.forEach(key => {
    if (sqlObj.query === "update") {
      dataKey.push([key, "?"].join("="));
    } else {
      dataKey.push(key);
    }
    dataValue.push(sqlObj.data[key]);
  });

  // 判断是否有where条件
  hasWhere = sqlObj.where.condition.length != 0;
  whereSql =
    `where ${
      sqlObj.where.condition.join(` ${sqlObj.where.type} `)}`;
  const result = "";
  return result;
};

// 传入单条SQL语句
const controlAPIObjAsync = data => {
  const sqlObj = _structureAnalysis(data);
  return new Promise((resolved, rejected) => {
    dataBaseControl(sqlObj.sql, sqlObj.value, result => {
      if (result === null) {
        rejected(null);
      } else {
        resolved(result);
      }
    });
  });
};

// 传入多条SQL语句
const ControlAPI_objs_async = function (...vars) {
  const len = vars.length;
  const promiseList = [];
  for (let i = 0; i < len; i++) {
    const sqlObj = _structureAnalysis(vars[i]);
    promiseList.push(
      new Promise((resolved, rejected) => {
        dataBaseControl(sqlObj.sql, sqlObj.value, result => {
          if (result === null) {
            rejected(null);
          } else {
            resolved(result);
          }
        });
      })
    );
  }
  return Promise.all(promiseList);
};
module.exports = {
  query,
};
