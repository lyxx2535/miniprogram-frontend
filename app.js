// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const app = getApp();
        app.globalData.code = res.code;
        wx.setStorageSync('code', res.code)
        console.log("code：" + wx.getStorageSync('code'))
        // console.log("code："+app.globalData.code)
        // 发起网络请求
    //     wx.request({
    //     // 后端地址
    //     url: 'http://124.223.105.99:8085/api/user/sessionId',
    //     data: {
    //       code: app.globalData.code
    //     },
    //     method: 'GET',
    //     // 获取后端回传的openid
    //     success: token => {
    //       // console.log(token);
    //       app.globalData.openid = token.data.openid;
    //       app.globalData.sessionId = token.data.sessionId;
    //       console.log('openid: ' + app.globalData.openid)
    //     },
    //     fail: errorMsg => {
    //       console.log(errorMsg);
    //     }
    //     })
      }
    })
  },
  globalData: {
    userInfo: null,
    // code: "",
    // openid: "",
    // sessionId: "",
    // token: "",
  }
})
