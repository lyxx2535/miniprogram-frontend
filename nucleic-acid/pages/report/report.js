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
    now_state:null,
    reportContent: '',    // 上报弹窗内容
    tempImgUrl: '',
    isChoose: false,
    switchChecked: false,
    currentIndex: 0,  //目前卡片的index
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
      delay: 5
    })
    this.animation = animation
    //animation.translateY(300)中的translate函数是表示在y轴上平移多少px，而后面紧接着的.step表示前面动画的完成，可以开始下一个动画了
    animation.translateY(600).step()
    this.setData({
      /*这里的export函数是导出动画队列，同时export方法在调用完后会清掉前面的动画操作 */
      animationData: animation.export(),
    })
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
      const res = await api._upload_nucleic(this.data.tempImgUrl);
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
    const index = e.currentTarget.dataset.index
    if(this.data.list[index].status.over || this.data.list[index].status.miss){
      wx.showToast({
        title: '检测已过期，无法开启提醒！',
        icon: 'none'
      })
      this.setData({
        switchChecked: false
      })
    }
    else{
      // TODO: 弹出表单 选择上报时间 开启服务提醒
    }
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})