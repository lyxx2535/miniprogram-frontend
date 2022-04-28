// app.js
import * as api from './utils/api'
const util = require('./utils/chat')

App({
  // 向服务端获取access_token
  async getAccessToken(){
    const res = await api._get_access_token();
    if(res.data.data.length == 0){
      console.log('错误：后端返回数据为空！返回结果为：' + JSON.stringify(res.data))
    }
    else{
      wx.setStorageSync('access_token', JSON.parse(res.data.data).access_token)
      console.log('access_token: ' + wx.getStorageSync('access_token'))
    }
  },
  onLaunch() {
    // 拿到access_token
    this.getAccessToken()
    // 拿到当天日期
    var d = new Date();
    wx.setStorageSync('date', util.tsFormatTime(d,'Y/M/D h:m:s'))
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.setStorageSync('code', res.code)
        console.log("code：" + wx.getStorageSync('code'))
      }
    })
    // end of wx.login
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight;
        //胶囊按钮与顶部的距离
        let navTop = menuButtonObject.top;
        //导航高度
        let navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
    // 默认跳转到login
    // wx.navigateTo({
    //   url: '/pages/login/login',
    // })
  },
  globalData: {
    navHeight: 0,
    navTop: 0,
    windowHeight: 0
  }
})
