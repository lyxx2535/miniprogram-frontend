// nucleic-acid/pages/detection/detection.js
import * as IMG from '../../../enum/imageUrl'
import * as api from '../../../utils/api'
Page({
  data: {
    navigationTitle: '检测列表',
    img_url: {
      notice: IMG.NOTICE,
      ongoing: IMG.STATE_ONGOING,
      over: IMG.STATE_OVER,
      miss: IMG.STATE_MISS,
      remind: IMG.REMIND
    },
    // 预约信息列表
    list :[],
  },
  async getNucleicInfo(){
    const res = await api._get_test_inform();
    const resSet = res.data.data
    let obj = []
    for(let item in resSet){
      let temp = {};
      temp.name = resSet[item].title;
      temp.time = resSet[item].testingTime.replace('-', '年').replace('-', '月') + '日';
      temp.id = resSet[item].id; // 该通知的id
      temp.spot = resSet[item].place;
      temp.requirement = resSet[item].require;
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
    this.getNucleicInfo()
  },
  // 完成检测
  finishDetection(index){
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
    console.log('完成检测，改变检测状态')
    // TODO: 回传后端，更新状态

  },
  // 点击已检测
  tapDetection(e){
    console.log('123')
    this.finishDetection(e.currentTarget.dataset.index)
  },
  // 打开上报提醒
  switchChange(e){
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
  // 通过按钮关闭表单
  powerDrawer(e){
    var currentStatus = e.currentTarget.dataset.status; 
    this.formAnimation(currentStatus)
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