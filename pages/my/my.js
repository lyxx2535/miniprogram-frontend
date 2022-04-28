// pages/my/my.js
import * as api from '../../utils/api'

Page({
  // avatarUrl:
  // gender: "不清楚"
  // grade: "未选定"
  // id: 1
  // institute: "未选定"
  // major: "未选定"
  // name: "郑义"
  // nickName: "寄给海的信"
  // openId: "oe-0Q4xfMngiXvS76YCK0IeHqdHM"
  // school: "未选定"

  data: {
     navigationTitle: '我的',
     userInfo: {}, // 用户信息列表
  },

  // 获取用户信息
  async getUserInfo(){
    const res = await api._get_user_info()
    console.log(res.data)
    this.setData({
      userInfo: res.data.data
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.setNavigationBarTitle({
      title: this.data.navigationTitle,
      fail: err => {
        console.log(err)
      }
    })
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
    this.getUserInfo()
  },

})