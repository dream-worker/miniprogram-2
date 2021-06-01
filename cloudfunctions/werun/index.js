// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
// 本地数据上传至云端，云端再回到本地，就完成了解密和验证
  return event.werundata
}