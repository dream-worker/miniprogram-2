// const { ENGINE_METHOD_DIGESTS } = require("constants");

//index.js
const app = getApp()

Page({
  data: {
    stepInfoList: [],
    bookInfo: null
  },

  onLoad: function() {
  },
  sum(){
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 20,
        b: 40
      },
      success: (res)=>{
        console.log(res);
      }
    })
  },
  werun(){
    wx.getWeRunData({
      success: (result) => {
        wx.cloud.callFunction({
          name: 'werun',
          data: {
            werundata: wx.cloud.CloudID(result.cloudID)
          },
          success:(res)=>{
            this.setData({
              stepInfoList: res.result.data.stepInfoList
            })
          }
        })
      },
    })
  },
  scan(){
    console.log('thsi', this)
    let _this = this;
    wx.scanCode({
      success (res) {
        console.log(res)
        // console.log('res.result:',res.result,this)
        _this.isbn(res.result);

      }
    })
  },
  isbn(data){
    // 用 axios 查询豆瓣 isnb 
    // wx.axios({})
    wx.cloud.callFunction({
      name: 'book',
      data: {
        isbn: data
      },
      success:(res)=>{
        console.log('res---', this) // this: page 中 data
        this.setData({ // 给 data 中数据赋值，响应式
          bookInfo: res.result
        })
        // this.bookInfo = res;
      }
    })
  }

})
