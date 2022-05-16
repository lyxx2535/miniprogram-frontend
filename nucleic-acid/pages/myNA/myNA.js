// nucleic-acid/pages/myNA/myNA.js
import * as IMG from '../../../enum/imageUrl'
Page({
  data: {
    navigationTitle: '我的核酸',
    QUESTION:IMG.ICON_QUESTION,
        tips:[
            {'tip':'红色：该日期有未完成的核酸。'},
            {'tip':'黄色：该日期有进行中的核酸。'},
            {'tip':'绿色：该日期有已完成的核酸。'},
        
          ],
    calendarConfig: {
      firstDayOfWeek: 'Mon', // 每周第一天为周一还是周日，默认按周日开始
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
      highlightToday: false, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
    },
    img_url: {
      notice: IMG.NOTICE,
    },
    coloredDate :[],//“已完成”的核酸日期
    successList:[],//“已完成”的核酸列表
    failList:[],//“未完成”的核酸列表
    finished: false,//表示当前按钮选择的是“未完成”还是“已完成”
    isShowSkeleton: true, // 是否显示骨架屏
  },
  afterCalendarRender(e) {
    const calendar = this.selectComponent('#calendar').calendar
    calendar.setDateStyle(this.data.coloredDate)
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
    wx.request({
      url: 'https://xjk-advisor.com/api/nucleic-acid/schedule', 
      data: {
      },
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync('token')
      },
      method: "GET",
      success: (res) => {
        const resSet = res.data.data
        console.log(res.data)
        let list1 = [] //已完成的核酸
        let list2 = [] //未完成的核酸
        let list3 = [] //给未完成、已完成、进行中的核酸上色
        for(let item in resSet){
          let temp1 = {}
          let temp2 = {}
          temp1.name = resSet[item].title;
          temp2.year = parseInt(resSet[item].testingTime.split('/')[0])
          temp2.month = parseInt(resSet[item].testingTime.split('/')[1])
          temp2.date = parseInt(resSet[item].testingTime.split('/')[2])
          switch (resSet[item].testingFinishStatus) {
            case '已完成':
              temp2.class = 'success'
              list3.push(temp2)
              if(resSet[item].bookingFinishStatus=='已完成'&&resSet[item].reportingFinishStatus=='已完成'){
                temp1.status =  {appointment: true, detection: true, report: true}
              }else if(resSet[item].bookingFinishStatus!='已完成'&&resSet[item].reportingFinishStatus=='已完成'){
                temp1.status =  {appointment: false, detection: true, report: true}
              }else if(resSet[item].bookingFinishStatus=='已完成'&&resSet[item].reportingFinishStatus!='已完成'){
                temp1.status =  {appointment: true, detection: true, report: false}
              }else{
                temp1.status =  {appointment: false, detection: true, report: false}
              }
              list1.push(temp1)
              break
            case '未完成':
              temp2.class = 'fail'
              list3.push(temp2)
              if(resSet[item].bookingFinishStatus=='已完成'&&resSet[item].reportingFinishStatus=='已完成'){
                temp1.status =  {appointment: true, detection: false, report: true}
              }else if(resSet[item].bookingFinishStatus!='已完成'&&resSet[item].reportingFinishStatus=='已完成'){
                temp1.status =  {appointment: false, detection: false, report: true}
              }else if(resSet[item].bookingFinishStatus=='已完成'&&resSet[item].reportingFinishStatus!='已完成'){
                temp1.status =  {appointment: true, detection: false, report: false}
              }else{
                temp1.status =  {appointment: false, detection: false, report: false}
              }
              list2.push(temp1)
              break
            case '进行中':
              temp2.class = 'now'
              list3.push(temp2)
              if(resSet[item].bookingFinishStatus=='已完成'&&resSet[item].reportingFinishStatus=='已完成'){
                temp1.status =  {appointment: true, detection: false, report: true}
              }else if(resSet[item].bookingFinishStatus!='已完成'&&resSet[item].reportingFinishStatus=='已完成'){
                temp1.status =  {appointment: false, detection: false, report: true}
              }else if(resSet[item].bookingFinishStatus=='已完成'&&resSet[item].reportingFinishStatus!='已完成'){
                temp1.status =  {appointment: true, detection: false, report: false}
              }else{
                temp1.status =  {appointment: false, detection: false, report: false}
              }
              list2.push(temp1)
        }
      }
      this.setData({
        coloredDate: list3,
        successList: list1,
        failList: list2,
        isShowSkeleton: false
      })
      console.log(this.data.coloredDate)
    }
  })
  },
  showTips: function () {
      this.setData({
          isTipsTrue: true
      })
  },

  hideTips: function () {
      this.setData({
          isTipsTrue: false
      })
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

})
