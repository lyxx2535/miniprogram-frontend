// components/placeholder/index.js
const App = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    attached: function () {
      this.setData({
        navHeight: App.globalData.navHeight
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
