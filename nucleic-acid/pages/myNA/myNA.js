// nucleic-acid/pages/report/report.js
import * as IMG from '../../../enum/imageUrl'
import * as api from '../../../utils/api'
Page({
  data: {
    navigationTitle: '我的核酸',
    calendarConfig: {
      firstDayOfWeek: 'Mon', // 每周第一天为周一还是周日，默认按周日开始
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
      highlightToday: false, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
    },
    img_url: {
      notice: IMG.NOTICE,
      ongoing: IMG.STATE_ONGOING,
      over: IMG.STATE_OVER,
      miss: IMG.STATE_MISS,
      remind: IMG.REMIND,
      upload: IMG.UPLOAD
    },

    list :[],//用于展示的核酸列表
    now_state:null,
    // 上报弹窗内容
    reportContent: '',
    tempImgUrl: '',
    finished: false,

  },
  afterCalendarRender(e) {
    const successDate = [
      {
        year: 2022,
        month: 4,
        date: 12,
        class: 'success' // 页面定义的 class，多个 class 由空格隔开
      },
      {
        year: 2022,
        month: 4,
        date: 2,
        class: 'success' // 页面定义的 class，多个 class 由空格隔开
      },
    ]
    const calendar = this.selectComponent('#calendar').calendar
    calendar.setDateStyle(successDate)
    const failDate = [
      {
        year: 2022,
        month: 4,
        date: 14,
        class: 'fail' // 页面定义的 class，多个 class 由空格隔开
      },
      {
        year: 2022,
        month: 4,
        date: 23,
        class: 'fail' // 页面定义的 class，多个 class 由空格隔开
      },
    ]
    calendar.setDateStyle(failDate)
  },
  whenChangeMonth(e) {
  this.afterCalendarRender(e);
  },
  // 点击按钮事件
  reportMedia1(e){
    this.setData({
      finished : false,
    })
  },
  reportMedia2(e){
    this.setData({
      finished : true,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 测试数据
    const test = [
      {
        name: '第四次常态化检测',
        time: '4月23日22:00',
        status: {
          ongoing: true,
          over: false,
          miss: false
        }
      },
      {
        name: '第三次常态化检测',
        time: '4月10日22:00',
        status: {
          ongoing: false,
          over: true,
          miss: false
        }
      },
      {
        name: '第八轮全员检测',
        time: '4月8日19:00',
        status: {
          ongoing: false,
          over: false,
          miss: true
        }
      },
      {
        name: '第八轮全员检测',
        time: '4月8日19:00',
        status: {
          ongoing: false,
          over: false,
          miss: true
        }
      },
      {
        name: '第八轮全员检测',
        time: '4月8日19:00',
        status: {
          ongoing: false,
          over: false,
          miss: true
        }
      },
      {
        name: '第八轮全员检测',
        time: '4月8日19:00',
        status: {
          ongoing: false,
          over: false,
          miss: true
        }
      },
      {
        name: '第八轮全员检测',
        time: '4月8日19:00',
        status: {
          ongoing: false,
          over: false,
          miss: true
        }
      },
      {
        name: '第八轮全员检测',
        time: '4月8日19:00',
        status: {
          ongoing: false,
          over: false,
          miss: true
        }
      },
      {
        name: '第八轮全员检测',
        time: '4月8日19:00',
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