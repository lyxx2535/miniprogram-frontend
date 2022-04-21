// nucleic-acid/pages/index_NA/index_NA.js
import * as IMG from '../../../enum/imageUrl'
Page({
  data :{
    img_url: {
      ICON_CALENDER: IMG.ICON_CALENDER,
      VECTOR_PIC: IMG.VECTOR_PIC
    }
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
