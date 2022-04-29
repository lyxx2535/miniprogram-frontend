// pages/my/my.js
import * as api from '../../utils/api'
import * as IMG from '../../enum/imageUrl'

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
     imgUrl: {
      contact: IMG.ICON_CONTACT,
      delete: IMG.ICON_DELETE,
      forward: IMG.ICON_FORWARD,
      over: IMG.ICON_OVER,
      question: IMG.ICON_QUESTION,
      redo: IMG.ICON_REDO,
      setting: IMG. ICON_SETTING,
      solved: IMG.STATE_SOLVED,
      unsolved: IMG.STATE_UNSOLVED
     }, // 静态资源url
     isShowSkeleton: true, // 是否展示骨架框
  },

  // 获取用户信息
  async getUserInfo(){
    const res = await api._get_user_info()
    console.log(res.data)
    if(res.data.code == 200){
      this.setData({
        userInfo: res.data.data
      })
      setTimeout( () => this.setData({
        isShowSkeleton: false,
      }), 500)
    }
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