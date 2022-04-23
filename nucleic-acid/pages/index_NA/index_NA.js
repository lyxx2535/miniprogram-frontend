// nucleic-acid/pages/index_NA/index_NA.js
import * as IMG from '../../../enum/imageUrl'
Page({
    data :{
        num_appointment:0,
        num_detection:0,
        num_report:0,
        ICON_CALENDER: IMG.ICON_CALENDER,
        VECTOR_PIC: IMG.VECTOR_PIC
    },

    onLoad: function(options) {
        let that = this;
        that.setData({
            num_appointment:1,
            num_detection:2,
            num_report:8,//还不会调接口的写法
        })
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
              url: '../report/report',//之后要改！！！
     })  
     },
})
