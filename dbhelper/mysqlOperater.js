const insertSql = (tableName, values) => {
  // 这里要处理values的键值对
  console.log(values);
  let strSql = "";
  strSql = `INSERT INTO ${tableName} (A,B,C) VALUES ("","","")`;
  return strSql;
};

// https://blog.csdn.net/frank_come/article/details/80805032
// update语句参考着写法

const updateSql = (tableName, values, strWhere) => {
  // 这里要处理values的键值对
  console.log(values);
  let strSql = "";
  strSql = `UPDATE ${tableName} SET A="",B="" WHERE 1=1 AND ${strWhere}`;
  return strSql;
};

module.exports = {
  insertSql,
  updateSql,
};
