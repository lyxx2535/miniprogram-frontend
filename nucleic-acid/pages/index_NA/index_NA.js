// nucleic-acid/pages/index_NA/index_NA.js
import * as IMG from '../../../enum/imageUrl'
import * as api from '../../../utils/api'

Page({
    data :{
        num_appointment:0,
        num_detection:0,
        num_report:0,
        ICON_CALENDER: IMG.ICON_CALENDER,
        VECTOR_PIC: IMG.VECTOR_PIC
    },
    async getTestNum(){
      const res = await api._get_test_inform();
      const resSet = res.data.data
      this.setData({
        num_detection: resSet.length
      })
    },
    async getReportNum(){
      const res = await api._get_report_inform();
      const resSet = res.data.data
      this.setData({
        num_report: resSet.length
      })
    },
    async getBookNum(){
      const res = await api._get_book_inform();
      const resSet = res.data.data
      this.setData({
        num_appointment: resSet.length
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
              url: '../appointment/appointment',
     })  
     },
     gotoDetection: function (options) {
        wx.navigateTo({
              url: '../detection/detection',
     })  
     },
     gotoReport: function (options) {
        wx.navigateTo({
              url: '../report/report',
     })  
     },
     gotoMyNA: function (options) {
        wx.navigateTo({
              url: '../myNA/myNA',//之后要改！！！
     })  
     },
})
