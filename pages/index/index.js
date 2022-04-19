// index.js
import * as api from '../../utils/api.js'
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    getUserProfile(e) {
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          // console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.setStorageSync('userInfo_wx', res.userInfo)
          this.getOpenid();
          this.getToken();
        }
      })
    },
    async getOpenid(){
      const response = await api._login(wx.getStorageSync('code'));
      console.log(response);
      wx.setStorageSync('session_key', response.data.session_key);
      wx.setStorageSync('openid', response.data.openid);
    },
    async getToken(){
      const res = await api._get_token(wx.getStorageSync('userInfo_wx').avatarUrl,
                                       wx.getStorageSync('userInfo_wx').nickName,
                                       wx.getStorageSync('openid'),
                                       '南京大学')
      wx.setStorageSync('token', res.data.data.token)
      console.log('token: ' + wx.getStorageSync('token'));
    },
    async getUserInfo(){
      const res = await api._get_user_info();
      wx.setStorageSync('userInfo', res.data.data);
      console.log('userInfo: ' + wx.getStorageSync('userInfo'))
      console.log(res.data)
    },
    async uploadImg(){
      const res = await api._upload_nucleic();
      console.log(res.data)
    },
    
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    console.log('load index page!')
  },

})
