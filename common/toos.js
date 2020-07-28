/**
 * 生成随机字符串
 * @param {int} len 字符串长度 默认12位
 */
const randomString = (len = 12) => {
  /* 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1 */
  const $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const maxPos = $chars.length;
  let pwd = "";
  for (let i = 0; i < len; i += 1) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

module.exports = { randomString };
