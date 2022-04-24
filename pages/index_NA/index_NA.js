// nucleic-acid/pages/index_NA/index_NA.js
import * as IMG from '../../enum/imageUrl'
import * as api from '../../utils/api'

Page({
    data :{
        navigationTitle: '核酸助手', // 核酸首页的标题，pjz随便想的，可改
        num_appointment:0,
        num_detection:0,
        num_report:0,
        ICON_CALENDER: IMG.ICON_CALENDER,
        VECTOR_PIC: IMG.VECTOR_PIC
    },
    async getTestNum(){
      const res = await api._test_count();
      const count = res.data.data
      this.setData({
        num_detection: count
      })
    },
    async getReportNum(){
      const res = await api._report_count();
      const count = res.data.data
      this.setData({
        num_report: count
      })
    },
    async getBookNum(){
      const res = await api._book_count();
      const count = res.data.data
      this.setData({
        num_appointment: count
      })
    },
    onLoad: function(options) {
      // 加载数据
        this.getBookNum();
        this.getReportNum();
        this.getTestNum();
    },
    gotoAppointment: function (options) {
        wx.navigateTo({
              url: '/nucleic-acid/pages/appointment/appointment',
     })  
     },
     gotoDetection: function (options) {
        wx.navigateTo({
              url: '/nucleic-acid/pages/detection/detection',
     })  
     },
     gotoReport: function (options) {
        wx.navigateTo({
              url: '/nucleic-acid/pages/report/report',
     })  
     },
     gotoMyNA: function (options) {
        wx.navigateTo({
              url: '/nucleic-acid/pages/myNA/myNA',
     })  
     },
     onShow(){
      wx.setNavigationBarTitle({
        title: this.data.navigationTitle,
        fail: err => {
          console.log(err)
        }
      })
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
})
