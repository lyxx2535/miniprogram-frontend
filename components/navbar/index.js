// components/navbar.js
const App = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: String,
    showBack: {
      type: Boolean,
      value: true
    },
    showHome: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bgColor:'#ffffff',
  },
  lifetimes: {
    attached: function () {
      this.setData({
        navHeight: App.globalData.navHeight,
        navTop: App.globalData.navTop,
        windowHeight: App.globalData.windowHeight
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //回退
    _navBack: function () {
      wx.navigateBack({
        delta: 1
      })
    },
    //回主页
    _toIndex: function () {
      wx.switchTab({
        url: '/pages/homepage/homepage',
      })
    },
    
  }
})