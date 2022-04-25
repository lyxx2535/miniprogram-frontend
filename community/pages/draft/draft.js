// community/pages/draft/draft.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 1, // 发布帖子的用户id，默认为1
    ddl: wx.getStorageSync('date'), // 截止时间
    type0: ["求帮跑腿", "求借", "求租"], // 求助类型
    type1: ["帮跑腿", "外借", "出租"], // 帮助类型
    typeIndex: 0, // 当前选中的type下标
    tag: ["日用品", "化妆品", "食物饮品", "药品", "运动用品", "书籍文具", "卫生用品", "电子产品"], // 标签
    tagIndex: 0, // 当前选中的tag下标
    content: "", // 内容/名称
    star: ['☆', '☆', '☆', '☆', '☆'], // 标识紧急程度的星星
    emergency: 0, // 紧急程度, 目前点亮☆的下标
    remark: "", // 备注
    forumImg: [], // 帖子图片url
    forumType: 0, // 求助贴：0，帮助贴：1
  },
  // 选择type
  chooseType(e){
    const _index = e.currentTarget.dataset.index
    this.setData({
      typeIndex: _index
    })
    console.log('选择type: ' + this.data.type0[_index])
  },
  // 选择tag
  chooseTag(e){
    const _index = e.currentTarget.dataset.index
    this.setData({
      tagIndex: _index
    })
    console.log('选择tag: ' + this.data.tag[_index])
    console.log('emergency: ' + this.data.emergency)
  },
  // 选择紧急程度
  chooseEmer(e){
    const _index = e.currentTarget.dataset.index;
    console.log(_index)
    let _star = []
    for (let index = 0; index <= _index; index++) {
      _star.push('⭐')
    }
    for (let index = _index + 1; index < 5; index++) {
      _star.push('☆')
    }
    console.log(_star)
    this.setData({
      star: _star
    })
  },
  // 点击日期选择器事件
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ddl: e.detail.value
    })
  },
  // TODO: linUI上传图片接口
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // TODO: 根据options选择渲染求助还是帮忙
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
    let _title;
    if(this.data.forumType == 0){
      _title = "我要求助"
    }
    else{
      _title = "我可帮忙"
    }
    wx.setNavigationBarTitle({
      title: _title,
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