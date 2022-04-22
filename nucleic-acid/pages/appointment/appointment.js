// nucleic-acid/pages/appointment/appointment.js
import * as IMG from '../../../enum/imageUrl'
Page({
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
    switchChecked: false,
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
        },
        url: 'http://ndyy.nju.edu.cn'
      },
      {
        name: '第三次常态化检测',
        time: '4月10日',
        status: {
          ongoing: false,
          over: true,
          miss: false
        },
        url: 'http://ndyy.nju.edu.cn'
      },
      {
        name: '第八轮全员检测',
        time: '4月8日',
        status: {
          ongoing: false,
          over: false,
          miss: true
        },
        url: 'http://ndyy.nju.edu.cn'
      }
    ]
    this.setData({
      list: test
    })
    console.log('装载测试数据：' + JSON.stringify(this.data.list))
  },
  goToBook(e){
    // 复制网址到剪切板
    var that = this
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,//需要复制的内容
      success: function (res) {//成功回调函数
        wx.showModal({
          title: '快去预约叭~',
          content: '预约网址已复制到剪切板',
          success: function (res) {
            if (res.confirm) {
              console.log('预约：用户点击确定')
            } else {
              console.log('预约：用户点击取消')
            }
            that.finishAppointment(e.currentTarget.dataset.index);
          }
        })
      }
    })
    // todo: 后续改变状态操作
  },
  // 完成预约
  finishAppointment(index){
    console.log(typeof(index))
    let obj = [];
    for(let item in this.data.list){
      obj.push(this.data.list[item])
      if(item == index){
        obj[item].status.ongoing = false;
        obj[item].status.miss = false;
        obj[item].status.over = true;
      }
    }
    this.setData({
      switchChecked: false,
      list: obj
    })
    console.log('完成预约，改变预约状态')
  },
  // 点击已预约
  tapAppointment(e){
    this.finishAppointment(e.currentTarget.dataset.index)
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