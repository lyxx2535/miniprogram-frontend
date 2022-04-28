// community/pages/draft/draft.js
import * as api from '../../../utils/api'
const dateUtil = require('../../../utils/chat')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ddl: wx.getStorageSync('date'), // 截止时间
    type0: ["求帮跑腿", "求借", "求租"], // 求助类型
    type1: ["帮跑腿", "外借", "出租"], // 帮助类型
    typeIndex: 0, // 当前选中的type下标
    tag: ["日用品", "书籍文具", "食物饮品", "运动用品", "化妆品", "药品",  "卫生用品", "电子产品"], // 标签
    tagIndex: 0, // 当前选中的tag下标
    content: "", // 内容/名称
    star: ['☆', '☆', '☆', '☆', '☆'], // 标识紧急程度的星星
    emergency: 0, // 紧急程度, 目前点亮☆的下标
    remark: "", // 备注
    forumImg: [], // 帖子图片url
    forumType: 1, // 求助贴：0，帮助贴：1
    scrollLeft: 0, // 滚动栏滚动距离
    windowWidth: 0, // 窗体宽度
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
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ddl: e.detail.value
    })
  },
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
    const now = dateUtil.tsFormatTime(d,'Y-M-D h:m:s' )
    const ddl = this.data.ddl + " 00:00:00"
    const _data = {
      "comment": this.data.remark,
      "deadLine": ddl,
      "helpType": this.data.type1[this.data.typeIndex],
      "name": this.data.content,
      "publishDate": now,
      "tag": this.data.tag[this.data.tagIndex],
      "urgency": this.data.emergency,
    }
    let resData;
    // 先发布草稿
    if(this.data.forumType == 0){
      const res = await api._publish_sh_draft(_data);
      if(res.data.code == 401){
        wx.showToast({
          title: '用户认证已过期，请重新登录',
          icon: 'none',
          duration: 3000,
          success: function () {
            setTimeout(function () {
                //要延时执行的代码
                wx.reLaunch({
                    url: '/pages/login/login'
                })
            }, 3000) //延迟时间 
          }
        })
      }
      resData = res.data.data;
      this.setData({
        id: resData.id
      })
    }
    else{
      const res = await api._publish_rh_draft(_data);
      if(res.data.code == 401){
        wx.showToast({
          title: '用户认证已过期，请重新登录',
          icon: 'none',
          duration: 3000,
          success: function () {
            setTimeout(function () {
                //要延时执行的代码
                wx.reLaunch({
                    url: '/pages/login/login'
                })
            }, 3000) //延迟时间 
          }
        })
      }
      resData = res.data.data;
      this.setData({
        id: resData.id
      })
    }
    console.log('发布草稿：' + JSON.stringify(resData))
    // 再上传图片
    const filePaths = this.data.forumImg
    this.uploadImg(filePaths)
    // 上传成功 返回上一级页面，否则不跳转
    wx.navigateBack({
      delta:1 //返回上一级页面
    })
  },
  // linUI上传图片接口
  async uploadImg(filePaths){
    for(let item in filePaths){
      var resData;
      if(this.data.forumType == 0){
        const res = await api._upload_sh_draft_img(filePaths[item], this.data.id);
        resData = res.data
        if(res.data.code == 401){
          wx.showToast({
            title: '用户认证已过期，请重新登录',
            icon: 'none',
            duration: 3000,
            success: function () {
              setTimeout(function () {
                  //要延时执行的代码
                  wx.reLaunch({
                      url: '/pages/login/login'
                  })
              }, 3000) //延迟时间 
            }
          })
        }
      }
      else{
        const res = await api._upload_rh_draft_img(filePaths[item], this.data.id);
        resData = res.data
        if(res.data.code == 401){
          wx.showToast({
            title: '用户认证已过期，请重新登录',
            icon: 'none',
            duration: 3000,
            success: function () {
              setTimeout(function () {
                  //要延时执行的代码
                  wx.reLaunch({
                      url: '/pages/login/login'
                  })
              }, 3000) //延迟时间 
            }
          })
        }
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
              wx.navigateBack({
                delta:1 //返回上一级页面
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