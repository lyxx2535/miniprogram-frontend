// nucleic-acid/pages/appointment/appointment.js
import * as IMG from '../../../enum/imageUrl'
import * as api from '../../../utils/api'
import { TEMPLATE_ID } from '../../../enum/enums.js'
const dateTimePicker = require('../../../utils/dateTimer');

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
    userName: wx.getStorageSync('userInfo_wx').nickName, //用户微信名
    date: wx.getStorageSync('date'), // 当天日期
    reminduUrl: '校医院官网, 可前往小程序复制~',
    remindContent: '',
    remindRemark: '记得及时预约哦~',
    remindTime: '',
    // timePicker
    start_time: '',
    dateTimeArray: '', //时间数组
    startYear: 2000, //最小年份
    endYear: 2050, // 最大年份
    start_time_p: wx.getStorageSync('date'), //显示的开始时间
    start_time_p2: '', //显示的开始时间2
  },
  
  // input数据双向绑定
  onInputName(e){
    this.setData({
      reminduUrl: e.detail.value
    })
  },
  onInputContent(e){
    this.setData({
      remindContent: e.detail.value
    })
  },
  onInputRemark(e){
    this.setData({
      remindRemark: e.detail.value
    })
  },
  // 向服务端请求发送提醒
  async add_remind(_data){
    const res = await api._add_remind(_data);
    console.log(res);
    wx.showToast({
      title: '已开启提醒',
    })
  },
  // 通过按钮关闭表单
  confirmRemind(e){
    var currentStatus = e.currentTarget.dataset.status; 
    this.formAnimation(currentStatus);
    if(e.currentTarget.dataset.close == "false"){
      wx.requestSubscribeMessage({
        tmplIds: [TEMPLATE_ID],
        success:res=>{
          console.log(res)
          // 准备请求参数
          var _data = {
            "accessToken": wx.getStorageSync('access_token'),
            "data": {
              // MessageVO
              "thing1": {
                "value" : this.data.remindContent + '预约'
              },
              "time3":{
                "value" : this.data.start_time_p2
              },
              "thing4":{
                "value" : this.data.reminduUrl 
              },
              "thing5": {
                "value" : this.data.remindRemark
              } 
            },
            "executeTime": this.data.start_time_p,
            "templateId": TEMPLATE_ID,  //模板id，在微信后台拿
            "touser": wx.getStorageSync('openid'),  //需要提前获取
          }
          console.log(_data)
          // 请求服务端
          this.add_remind(_data);
        }
      })
    }
    else{
      this.data.list[this.data.currentIndex].isOpenRemind = false;
      this.setData({
        list: this.data.list
      })
    }
  },
  
  // 日期选择器事件
  /**
   * 选择时间
   * @param {*} e 
   */
  changeDateTime(e) {
    let dateTimeArray = this.data.dateTimeArray,
      {
        type,
        param
      } = e.currentTarget.dataset;
    this.setData({
      [type]: e.detail.value,
      [param]: dateTimeArray[0][e.detail.value[0]] + '-' + dateTimeArray[1][e.detail.value[1]] + '-' + dateTimeArray[2][e.detail.value[2]] + ' ' + dateTimeArray[3][e.detail.value[3]] + ':' + dateTimeArray[4][e.detail.value[4]] + ':' + dateTimeArray[5][e.detail.value[5]]
    });
  },
  changeDateTimeColumn(e) {
    var dateArr = this.data.dateTimeArray,
      {
        type
      } = e.currentTarget.dataset,
      arr = this.data[type];
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray: dateArr,
      [type]: arr
    });
  },

  async getNucleicInfo(){
    const res = await api._get_book_inform();
    const resSet = res.data.data
    console.log(res)
    let obj = []
    for(let item in resSet){
      let temp = {};
      temp.name = resSet[item].title;
      temp.time = resSet[item].deadLine;
      temp.id = resSet[item].id; // 该通知的id
      temp.url = 'http://ndyy.nju.edu.cn';
      temp.isOpenRemind = resSet[item].isOpenRemind
      switch (resSet[item].finishStatus) {
        case '进行中':
          temp.status = {ongoing: true, over: false, miss: false}
          break;
        case '已完成':
          temp.status = {ongoing: false, over: true, miss: false}
          break;
        case '未完成':
          temp.status = {ongoing: false, over: false, miss: true}
          break;
        default :
          temp.status = {ongoing: true, over: false, miss: false}
          break;
      }
      obj.push(temp);
    }
    this.setData({
      list: obj
    })
    console.log(this.data.list)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取通知
    this.getNucleicInfo();
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    this.setData({
      start_time: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
    });
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
        obj[item].isOpenRemind = false;
      }
    }
    this.setData({
      list: obj
    })
    console.log('完成预约，改变预约状态')
    // TODO: 回传后端，更新状态
  },
  // 点击已预约
  tapAppointment(e){
    this.finishAppointment(e.currentTarget.dataset.index)
  },
  // 打开上报提醒
  switchChange(e){
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      remindContent: this.data.list[e.currentTarget.dataset.index].name,
      start_time_p2: this.data.list[e.currentTarget.dataset.index].time
    })
    // TODO:开启服务提醒 封装相关api
    const index = e.currentTarget.dataset.index
    if(!this.data.list[index].isOpenRemind){
      var currentStatus = e.currentTarget.dataset.status; 
      this.formAnimation(currentStatus)
      this.data.list[index].isOpenRemind = true;
    }
    // 关闭通知，同时更新服务端数据
    else{
      this.data.list[index].isOpenRemind = false;
      wx.showToast({
        title: '已关闭服务通知！',
      })
    }
    // TODO: 回传后端，更新状态
  },

  // 表单弹出动画
  formAnimation(currentStatus){ 
    // 创建动画实例  
    var animation = wx.createAnimation({ 
     duration: 200, //动画时长 
     timingFunction: "linear", //线性 
     delay: 0 //0则不延迟 
    }); 
    // 这个动画实例赋给当前的动画实例 
    this.animation = animation; 
    // 执行第一组动画 
    animation.opacity(0).rotateX(-50).step(); 
    // 导出动画对象赋给数据对象储存 
    this.setData({ 
      animationData: animation.export() 
    })  
    // 设置定时器到指定时候后，执行第二组动画 
    setTimeout(() => { 
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step(); 
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({ 
        animationData: animation 
      })  
      //关闭 
      if (currentStatus == "close") { 
        this.setData({ 
          isShowForm: false
        }); 
      }
    }, 200) // 此处箭头函数不生成自己的this，无须绑定this
    // 显示 
    if (currentStatus == "open") { 
      this.setData({ 
        isShowForm: true,
      }); 
    } 
  },
  // 点击日期选择器事件
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
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