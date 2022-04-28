// pages/login/login.js
import * as api from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationTitle: '登录',
    motto: 'welcome! 请在首次打开项目时点击第一个按钮',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
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
      }
    })
  },
  async getOpenid(){
    const response = await api._login(wx.getStorageSync('code'));
    console.log(response);
    wx.setStorageSync('session_key', response.data.session_key);
    wx.setStorageSync('openid', response.data.openid);
    this.getToken();
  },
  async getToken(){
    const res = await api._get_token(wx.getStorageSync('userInfo_wx').avatarUrl,
                                     wx.getStorageSync('userInfo_wx').nickName,
                                     wx.getStorageSync('openid'),
                                     '南京大学')
    wx.setStorageSync('token', res.data.data.token)
    console.log('exe')
    console.log('token: ' + wx.getStorageSync('token'));
    wx.switchTab({
      url: '/pages/index_NA/index_NA',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.setNavigationBarTitle({
      title: this.data.navigationTitle,
      fail: err => {
        console.log(err)
      }
    })
  },
})