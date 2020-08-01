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

// 返回一个Promise链接
const connectHandle = () =>
  new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        console.error(
          `链接错误：${error.stack}\n链接ID：${connection.threadId}`
        );
        reject(error);
      } else {
        resolve(connection);
      }
    });
  });

// var connection =  mysql.createConnection( { multipleStatements: true } );
// 连接 有一个query方法  用来执行sql语句  如果传参就要启用第二个参数 第二个参数如果是单个可以直接传字符串 多个就用数组 我们这里直接用数组
// SELECT - 从数据库中提取数据
// UPDATE - 更新数据库中的数据
// DELETE - 从数据库中删除数据
// INSERT INTO - 向数据库中插入新数据
// CREATE DATABAS - 创建新数据库
// CREATE TABLE - 创建新表
// DROP TABLE - 删除表
// https://blog.csdn.net/think_A_lot/article/details/93498737
// https://blog.csdn.net/think_A_lot/article/details/93500799
// 这里整理的封装类
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

/*
  let conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
      await conn.query('sql语句')
      await conn.query('sql语句')
      await conn.query('sql语句')
      await conn.commit()
  } catch (err) {
      await conn.rollback()
  } finally {
      conn.release()
   }
*/
const ExecuteTrans = async () => {};

module.exports = { ExecuteSql, ExecuteTrans };
