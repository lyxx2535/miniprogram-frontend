// nucleic-acid/pages/report/report.js
import * as IMG from '../../../enum/imageUrl'
import * as api from '../../../utils/api'
Page({
  data: {
    navigationTitle: '上报列表',
    img_url: {
      notice: IMG.NOTICE,
      ongoing: IMG.STATE_ONGOING,
      over: IMG.STATE_OVER,
      miss: IMG.STATE_MISS,
      remind: IMG.REMIND,
      upload: IMG.UPLOAD
    },
    list :[],    // 预约信息列表
    now_state: null, // 当前卡片的状态
    reportContent: '',    // 上报弹窗内容
    tempImgUrl: '', // 图片缓存
    isChoose: false, // 是否上传截图
    switchChecked: false, // switch开关
    currentIndex: 0,  // 目前卡片的index
    isShowForm: false, // 是否展示提醒时间表单
    userName: wx.getStorageSync('userInfo_wx').nickName, //用户微信名
    date: wx.getStorageSync('date'), // 当天日期
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
    wx.showLoading({  // 显示加载中loading效果 
      title: "加载中",
      mask: true  //开启蒙版遮罩
    });
    try{
      const res = await api._upload_nucleic(this.data.tempImgUrl);
      const resJson = JSON.parse(res.data)
      console.log(resJson);
      this.setData({
        isChoose: !this.data.isChoose,// 回到上传图片界面
        tempImgUrl: '', // 清空本地图片缓存
        switchChecked: !this.data.switchChecked // 取消上报提醒
      })
      //隐藏加载界面
      wx.hideLoading();
      if(resJson.code == 200){
        wx.showToast({
          title: '上传成功！'
        })
        // 改变状态，取消switch
        this.finishReport(this.data.currentIndex)
      }
      else{
        wx.showToast({
          title: '上传失败！',
          icon: 'error'
        })
      }
    }catch(err){
      console.log('上传失败：' + JSON.stringify(err));
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
    // TODO: 回传后端，更新状态
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
          title: '已关闭提醒',
        })
      }
  },
  // 通过按钮关闭表单
  confirmRemind(e){
    var currentStatus = e.currentTarget.dataset.status; 
    this.formAnimation(currentStatus);
    wx.showToast({
      title: '已开启提醒',
    })
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
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 测试数据
    const test = [
      {
        name: '第四次常态化检测',
        time: '4月23日22:00',
        status: {
          ongoing: true,
          over: false,
          miss: false
        }
      },
      {
        name: '第三次常态化检测',
        time: '4月10日22:00',
        status: {
          ongoing: false,
          over: true,
          miss: false
        }
      },
      {
        name: '第八轮全员检测',
        time: '4月8日19:00',
        status: {
          ongoing: false,
          over: false,
          miss: true
        }
      }
    ]
    this.setData({
      list: test
    })
    console.log('装载测试数据：' + JSON.stringify(this.data.list))
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