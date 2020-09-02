/* eslint-disable no-restricted-globals */
const redis = require("redis");
const { redisConfig = {} } = require("../common/sysConfig");

const client = redis.createClient(redisConfig.port, redis.host);

client.on("error", err => {
  console.log(`redis error：${err}`);
});

client.on("connect", () => {
  console.log("redis连接成功...");
});

/**
 *
 * @param {*} dbNum
 * @param {*} key
 * @param {*} value
 * @param {*} expire
 * @param {*} callback
 */
const set = (dbNum, key, value, expire = 60, callback) => {
  client.select(dbNum, errSelect => {
    if (errSelect) {
      console.log(`redis set 选库失败：${errSelect}`);
    } else {
      client.set(key, value, (errSet, result) => {
        if (errSet) {
          console.log(`redis插入失败：${errSet}`);
          callback(errSet, null);
          return;
        }
        if (!isNaN(expire) && expire > 0) {
          client.expire(key, parseInt(expire, 2));
        }
        callback(null, result);
      });
    }
  });
};

const get = (dbNum, key, callback) => {
  client.select(dbNum, errSelect => {
    if (errSelect) {
      console.log(`redis get 选库失败：${errSelect}`);
    } else {
      client.get(key, (err, result) => {
        // client.del(key)
        if (err) {
          console.log(`redis获取失败：${err}`);
          callback(err, null);
          return;
        }
        callback(null, result);
      });
    }
  });
};

module.exports = { get, set };
