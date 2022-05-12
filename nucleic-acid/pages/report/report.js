// nucleic-acid/pages/report/report.js
import * as IMG from '../../../enum/imageUrl'
import * as api from '../../../utils/api'
import { TEMPLATE_ID } from '../../../enum/enums.js'
const dateTimePicker = require('../../../utils/dateTimer');

Page({
  data: {
    navigationTitle: '上报列表',
    img_url: {
      notice: IMG.NOTICE,
      ongoing: IMG.STATE_ONGOING,
      over: IMG.STATE_OVER,
      miss: IMG.STATE_MISS,
      remind: IMG.REMIND,
      upload: IMG.UPLOAD,
      return: IMG.RETURN,
      noTask: IMG.NULL_REPORT
    },
    list :[],    // 预约信息列表
    now_state: null, // 当前卡片的状态
    reportContent: '',    // 上报弹窗内容
    tempImgUrl: '', // 图片缓存
    isChoose: false, // 是否上传截图
    switchChecked: false, // switch开关
    currentIndex: 2,  // 目前卡片的index
    isShowForm: false, // 是否展示提醒时间表单
    userName: wx.getStorageSync('userInfo_wx').nickName, //用户微信名
    date: wx.getStorageSync('date'), // 当天日期
    remindName: wx.getStorageSync('userInfo_wx').nickName,
    remindContent: '',
    remindRemark: '记得及时上报哦~',
    remindTime: '',
    remindSpot: '小程序内',
    // timePicker
    start_time: '',
    dateTimeArray: '', //时间数组
    startYear: 2000, //最小年份
    endYear: 2050, // 最大年份
    start_time_p: wx.getStorageSync('date'), //显示的开始时间
    isShowSkeleton: true, // 是否显示骨架屏
  },

  // input数据双向绑定
  onInputName(e){
    this.setData({
      remindSpot: e.detail.value
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
  async updateData(_data){
    const res = await api._update_report_inform(_data)
    console.log('更新成功！' + JSON.stringify(res.data));
  },
  // 更新是否开启通知
  async update_isOpenRemind(_isOpenRemind, _id){
    const res = await api._update_report_remind(_isOpenRemind, _id);
    console.log(res.data)
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
                "value" : this.data.remindContent + '上报'
              },
              "time3":{
                "value" : this.data.remindTime
              },
              "thing4":{
                "value" : this.data.remindSpot // 应该是上报地点
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
          if(res.dTxNqzkbtF7apmXfZBYlWD97krufydh5Gh0Zgn2QvlQ == 'reject'){
            wx.showToast({
              title: '请开启提醒权限',
              icon: 'error'
            })
            this.data.list[this.data.currentIndex].isOpenRemind = false;
            this.setData({
              list: this.data.list
            })
          }
          else{
            // 请求服务端
            this.add_remind(_data);
          }
        }
      })
    }
    else{
      this.data.list[this.data.currentIndex].isOpenRemind = false;
      this.setData({
        list: this.data.list
      })
      this.update_isOpenRemind(this.data.list[this.data.currentIndex].isOpenRemind, this.data.list[this.data.currentIndex].id)
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
      [param]: dateTimeArray[0][e.detail.value[0]] + '/' + dateTimeArray[1][e.detail.value[1]] + '/' + dateTimeArray[2][e.detail.value[2]] + ' ' + dateTimeArray[3][e.detail.value[3]] + ':' + dateTimeArray[4][e.detail.value[4]] + ':' + dateTimeArray[5][e.detail.value[5]]
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

  // 点击按钮事件
  reportMedia(e){
    var that = this 
    that.setData({
      now_state: true,
      reportContent: e.currentTarget.dataset.name,
      currentIndex: e.currentTarget.dataset.index
    })
  },
  // 点击黑色背景触发的事件
  hideModal(e){
    //首先创建一个动画对象（让页面不在是一个“死页面”）
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    //animation.translateY(300)中的translate函数是表示在y轴上平移多少px，而后面紧接着的.step表示前面动画的完成，可以开始下一个动画了
    animation.translateY(600).step()
    this.setData({
      /*这里的export函数是导出动画队列，同时export方法在调用完后会清掉前面的动画操作 */
      animationData: animation.export(),
    })
    // 执行第二步动画
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        now_state: false,
      })
    }.bind(this), 200)
  },
  // 选择核酸截图
  async chooseImg(){
    try{
      const res = await api._choose_nucleic();
      // 保存url
      this.setData({
        tempImgUrl: res.tempFiles[0].tempFilePath,
        isChoose: true
      })
      console.log('上传媒体暂时路径: ' + this.data.tempImgUrl);
    }catch(err){
      console.log('选择媒体失败：' + JSON.stringify(err));
    }
  },
  // 上传核酸截图
  async uploadImg(e){
    try{
      const res = await api._upload_nucleic(this.data.tempImgUrl, this.data.list[this.data.currentIndex].id);
      if(res.data.length == 0){
        console.log('错误：后端返回数据为空！返回结果为：' + JSON.stringify(res))
      }
      else{
        const resJson = JSON.parse(res.data)
        console.log(resJson);
        this.setData({
          isChoose: !this.data.isChoose,// 回到上传图片界面
          tempImgUrl: '', // 清空本地图片缓存
          switchChecked: !this.data.switchChecked // 取消上报提醒
        })
        if(resJson.code == 200){
          wx.showToast({
            title: '上传成功！'
          })
          // 改变状态，取消提醒
          this.finishReport(this.data.currentIndex)
        }
        else{
          wx.showToast({
            title: '上传失败！',
            icon: 'error'
          })
        }
      }
    }catch(err){
      console.log('上传失败：' + err);
      wx.showToast({
        title: '上传失败！',
        icon: 'error'
      })
    }
  },
  // 重新上传
  reChoose(){
    this.setData({
      isChoose: !this.data.isChoose,
      tempImgUrl: '',
    })
    wx.showToast({
      title: '已取消上传',
    })
  },
  // 完成上传
  finishReport(index){
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
    console.log('完成上报，改变上报状态')
    const _data = {
      id: this.data.list[index].id,
      finishStatus: '已完成'
    }
    this.updateData(_data)
  },
  // 打开上报提醒
  switchChange(e){
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      remindContent: this.data.list[e.currentTarget.dataset.index].name,
      remindTime: this.data.list[e.currentTarget.dataset.index].time,
    })
    // 开启服务提醒 封装相关api
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
    // 更新
    this.update_isOpenRemind(this.data.list[index].isOpenRemind, this.data.list[index].id)
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
        switchChecked: true
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
  async getNucleicInfo(){
    const res = await api._get_report_inform();
    const resSet = res.data.data
    let obj = []
    for(let item in resSet){
      let temp = {};
      temp.isOpenRemind = resSet[item].isOpenRemind
      temp.name = resSet[item].title;
      temp.time = resSet[item].deadLine;
      temp.id = resSet[item].id; // 该通知的id
      switch (resSet[item].status) {
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
      list: obj,
      isShowSkeleton: false
    })
    console.log(this.data.list)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化数据
    this.getNucleicInfo();
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    this.setData({
      start_time: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
    });
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