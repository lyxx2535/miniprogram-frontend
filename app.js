// app.js
import * as api from './utils/api'
const util = require('./utils/chat')
App({
  // 获得自己的id
  async getMyInfo(){
    const res = await api._get_user_info();
    console.log('获取我的信息：' + JSON.stringify(res.data.data));
    if (res.data.code == 200) {
      const info = res.data.data;
      wx.setStorageSync('myId', info.id)
    }
  },
  // 向服务端获取access_token
  async getAccessToken(){
    const res = await api._get_access_token();
    console.log(res.data.data)
    if(res.data.data.length == 0){
      console.log('错误：后端返回数据为空！返回结果为：' + JSON.stringify(res.data))
    }
    else{
      wx.setStorageSync('access_token', res.data.data)
      console.log('access_token: ' + wx.getStorageSync('access_token'))
    }
  },
  onLaunch() {
  
    // 拿到access_token
    this.getAccessToken()
    // 保存当前用户id
    this.getMyInfo()
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
        console.log('手机信息res' + res.model)
          let model = res.model;
            if (/iphone\sx/i.test(model) || (/iphone/i.test(model) && /unknown/.test(model))|| /iphone\s11/i.test(model)||/iphone\s12/i.test(model)||/iphone\s13/i.test(model)){
                this.globalData.isIphoneX = true;
                this.globalData.bottomLeft=65;
            }else{
                this.globalData.isIphoneX = false;
                this.globalData.bottomLeft=0;
            }
          console.log(this.globalData.isIphoneX,this.globalData.bottomLeft);
        //机型
        let statusBarHeight = res.statusBarHeight;
        //胶囊按钮与顶部的距离
        let navTop = menuButtonObject.top;
        //导航高度
        let navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.model = model;
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
    windowHeight: 0,
    bottomLeft: 0,
    isIphoneX: false,//判断机型 
  }
})
