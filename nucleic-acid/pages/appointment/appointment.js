// nucleic-acid/pages/appointment/appointment.js
import * as IMG from '../../../enum/imageUrl'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationTitle: '预约列表',
    img_url: {
      notice: IMG.NOTICE,
      ongoing: IMG.STATE_ONGOING,
      over: IMG.STATE_OVER,
      miss: IMG.STATE_MISS,
      remind: IMG.REMIND
    },
    // 预约信息列表
    list :[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 测试数据
    const test = [
      {
        name: '第四次常态化检测',
        time: '4月19日',
        status: {
          ongoing: true,
          over: false,
          miss: false
        }
      },
      {
        name: '第三次常态化检测',
        time: '4月10日',
        status: {
          ongoing: false,
          over: true,
          miss: false
        }
      },
      {
        name: '第八轮全员检测',
        time: '4月8日',
        status: {
          ongoing: false,
          over: false,
          miss: true
        }
      }
    ]
    this.setData({
      list: test
    })
    console.log('装载测试数据：' + JSON.stringify(this.data.list))
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})