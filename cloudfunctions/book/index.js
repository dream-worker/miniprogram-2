// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios');
const doubanbook = require('doubanbook');
 // 云函数本地调试
 async function getBookByISBN (isbn){
let url = 'https://search.douban.com/book/subject_search?search_text='+isbn;
const data = await axios.get(url);
console.log(data)
let douban = null;
let reg = /window\.__DATA__ = "(.*)"/;
if (reg.test(data.data)){
    douban = doubanbook(RegExp.$1)[0];
    console.log('douban',douban)
    return douban;
}
};
getBookByISBN('9787117279277');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {isbn} = event;
  console.log('isbn--', isbn)
  let res =  await getBookByISBN (isbn);
  // 数据库 book 存储
  const db = cloud.database();
  db.collection('books').add({
    data: res
  })
  console.log('res',res)
  return {
    result: res
  }
}