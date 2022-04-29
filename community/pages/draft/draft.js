// community/pages/draft/draft.js
import * as api from '../../../utils/api'
const dateUtil = require('../../../utils/chat')
const dateTimePicker = require('../../../utils/dateTimer');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type0: ["求帮跑腿", "求借", "求租"], // 求助类型
    type1: ["帮跑腿", "外借", "出租"], // 帮助类型
    typeIndex: 0, // 当前选中的type下标
    tag: ["食物饮品", "日用品", "书籍文具", "运动用品", "化妆品", "药品", "卫生用品", "电子产品"], // 标签
    tagIndex: 0, // 当前选中的tag下标
    content: "", // 内容/名称
    star: ['☆', '☆', '☆', '☆', '☆'], // 标识紧急程度的星星
    emergency: 0, // 紧急程度, 目前点亮☆的下标
    remark: "", // 备注
    forumImg: [], // 帖子图片url
    forumType: 1, // 求助贴：0，帮助贴：1
    scrollLeft: 0, // 滚动栏滚动距离
    windowWidth: 0, // 窗体宽度
    // timePicker
    start_time: '',
    ddl: wx.getStorageSync('date'), // 截止时间
    dateTimeArray: '', //时间数组
    startYear: 2000, //最小年份
    endYear: 2050, // 最大年份
    ddl_p: wx.getStorageSync('date'), //显示的时间
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

  // 选择type
  chooseType(e){
    const _index = e.currentTarget.dataset.index
    this.setData({
      typeIndex: _index
    })
    console.log('选择type: ' + this.data.type1[_index])
  },
  // 选择tag
  chooseTag(e){
    const _index = e.currentTarget.dataset.index
    let _scrollLeft =  e.currentTarget.offsetLeft - ( this.data.windowWidth * 0.9 ) / 2;
    this.setData({
      tagIndex: _index,
      scrollLeft: _scrollLeft
    })
    console.log('选择tag: ' + this.data.tag[_index])
  },
  // 选择紧急程度 - 已废弃，LinUI真香
  chooseEmer(e){
    const _index = e.currentTarget.dataset.index;
    this.setData({
      emergency: _index
    })
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
  // 保存输入栏值
  saveContent(e){
    this.setData({
      content: e.detail.value
    })
  },
  saveRemark(e){
    this.setData({
      remark: e.detail.value
    })
  },
  // 点击日期选择器事件
  // bindDateChange: function(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     ddl: e.detail.value
  //   })
  // },
  onChangeTap(e){
    this.setData({
      forumImg: e.detail.all
    })
    console.log('上传图片本地路径list：' + this.data.forumImg)
  },
  // 选择紧急程度 - LinUI
  onChangeRate(e){
    console.log('选择紧急度：' + e.detail.score)
    this.setData({
      emergency: e.detail.score
    })
  },
  // 发布
  async publish(){
    var d = new Date()
    const now = dateUtil.tsFormatTime(d,'Y/M/D h:m:s' )
    const ddl = this.data.ddl_p
    const _data = {
      "comment": this.data.remark,
      "deadLine": ddl,
      "name": this.data.content,
      "publishDate": now,
      "tag": this.data.tag[this.data.tagIndex],
      "urgency": this.data.emergency,
    }
    console.log('发布数据：' + JSON.stringify(_data))
    let resData;
    // 先发布草稿
    if(this.data.forumType == 0){
      _data["seekHelpType"] = this.data.type0[this.data.typeIndex]
      const res = await api._publish_sh_draft(_data);
      resData = res.data.data;
      this.setData({
        id: resData.id
      })
    }
    else{
      _data["helpType"] = this.data.type1[this.data.typeIndex]
      const res = await api._publish_rh_draft(_data);
      resData = res.data.data;
      this.setData({
        id: resData.id
      })
    }
    console.log('发布草稿：' + JSON.stringify(resData))
    // 再上传图片
    const filePaths = this.data.forumImg
    // 如果没上传图片，直接返回之前的页面
    if(filePaths.length == 0){
      wx.switchTab({
        url: '/pages/community/community',
      })
    }
    else{
      this.uploadImg(filePaths)
    }
  },
  // linUI上传图片接口
  async uploadImg(filePaths){
    for(let item in filePaths){
      var resData;
      if(this.data.forumType == 0){
        const res = await api._upload_sh_draft_img(filePaths[item], this.data.id);
        resData = res.data
      }
      else{
        const res = await api._upload_rh_draft_img(filePaths[item], this.data.id);
        resData = res.data
      }
      if(resData.length == 0){
        console.log('错误：后端返回数据为空！返回结果为：' + JSON.stringify(resData))
        this.deleteForum()
      }
      else{
        const resJson = JSON.parse(resData)
        console.log(resJson);
        if(resJson.code == 200){
          wx.showToast({
            title: '上传成功！',
            duration: 3000,
            success: () => {
              // 上传成功 返回上一级页面，否则不跳转
              wx.switchTab({
                url: '/pages/community/community',
              })
            }
          })
        }
        else{
          wx.showToast({
            title: '上传失败！',
            icon: 'error'
          })
          this.deleteForum()
        }
      }
      this.finishPublish()
    }
  },
  async deleteForum(){
    // 删求助帖
    if(this.data.forumType == 0){
      const res = await api._delete_sh_forum_byId(this.data.id)
      console.log('已删除异常发布帖：' + res.data)
    }
    // 删帮忙贴
    else{
      const res = await api._delete_rh_forum_byId(this.data.id)
      console.log('已删除异常发布帖：' + res.data)
    }
  },
  finishPublish(){
    this.setData({
      ddl: wx.getStorageSync('date'), // 截止时间
      typeIndex: 0, // 当前选中的type下标
      tagIndex: 0, // 当前选中的tag下标
      content: "", // 内容/名称
      emergency: 0, // 紧急程度, 目前点亮☆的下标
      remark: "", // 备注
      forumImg: [], // 帖子图片url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 拿到当天日期
    var d = new Date();
    wx.setStorageSync('date', util.tsFormatTime(d,'Y/M/D h:m:s'))
    this.setData({
      start_time: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
    });
    // 根据options选择渲染求助还是帮忙
    this.setData({
      forumType: options.type
    })
    console.log('当前草稿类别：' + this.data.forumType)
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          windowWidth: result.windowWidth
        })
      },
    })
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
    this.setData({
      forumImg: []
    })
  }
})