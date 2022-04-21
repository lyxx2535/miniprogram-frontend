// nucleic-acid/pages/index_NA/index_NA.js
Page({
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
