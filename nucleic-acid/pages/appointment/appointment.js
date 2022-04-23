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
    // TODO: 回传后端，更新状态
  },
  // 点击已预约
  tapAppointment(e){
    this.finishAppointment(e.currentTarget.dataset.index)
  },
    // 打开上报提醒
    switchChange(e){
      // TODO:开启服务提醒 封装相关api
      if(!this.data.switchChecked){
        var currentStatus = e.currentTarget.dataset.status; 
        this.formAnimation(currentStatus)
      }
      // 关闭通知时
      else{
        this.setData({
          switchChecked: false
        })
        wx.showToast({
          title: '已关闭服务通知！',
        })
      }
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