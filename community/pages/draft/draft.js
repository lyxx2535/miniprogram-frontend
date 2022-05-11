// community/pages/draft/draft.js
import * as api from '../../../utils/api'
const dateUtil = require('../../../utils/chat')
const dateTimePicker = require('../../../utils/dateTimer');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type0: ["求帮跑腿", "求借", "求租", "求购"], // 求助类型
    type1: ["帮跑腿", "外借", "出租", "出售"], // 帮助类型
    typeIndex: 0, // 当前选中的type下标
    tag: ["食物饮品", "日用品", "书籍文具", "运动用品", "化妆品", "药品", "卫生用品", "电子产品"], // 标签
    tagIndex: 0, // 当前选中的tag下标
    content: "", // 内容/名称
    star: ['☆', '☆', '☆', '☆', '☆'], // 标识紧急程度的星星
    emergency: 0, // 紧急程度, 目前点亮☆的下标
    remark: "", // 备注
    forumImg: [], // 帖子图片url
    forumType: 1, // 求助贴：0，帮助贴：1
    forumId: -1, // 新建帖子：-1 修改已存在帖子：id
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
  handleUnknown(filePath) {
    if(filePath.includes('.unknown')){
      return filePath.substring(0, filePath.length() - 7) + 'jpg'
    }
    else return filePath
  },
  // 检查输入
  checkInput(){
    if(this.data.content.length == 0){
      console.log('exe')
      wx.showToast({
        title: '请输入名称',
        icon: 'none'
      })
      return false
    }
    if(this.data.remark.length == 0){
      console.log('exe')
      wx.showToast({
        title: '请输入备注',
        icon: 'none'
      })
      return false
    }
    return true
  },
  publish(){
    // 先检查是否输入
    const flag = this.checkInput();
    if(flag){
      this.publishDraft();
    }
  },
  // 发布
  async publishDraft(){
    // 如果是新建帖子
    if(this.data.forumId == -1){
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
    }
    // 如果是修改帖子
    else{
      var d = new Date()
      const now = dateUtil.tsFormatTime(d,'Y/M/D h:m:s' )
      const _data = {
        "comment": this.data.remark,
        "deadLine": this.data.ddl_p,
        "name": this.data.content,
        "publishDate": now,
        "tag": this.data.tag[this.data.tagIndex],
        "urgency": this.data.emergency,
        "id": this.data.forumId
      }
      console.log('修改帖子数据：' + JSON.stringify(_data))
      if(this.data.forumType == 0){
        _data["seekHelpType"] = this.data.type0[this.data.typeIndex]
        const res = await api._update_sh_forum(_data);
        console.log(res.data)
      }
      else{
        _data["helpType"] = this.data.type1[this.data.typeIndex]
        const res = await api._update_rh_forum(_data);
        console.log(res.data)
      }
      // 再上传图片
      const filePaths = this.data.forumImg
      // 如果没上传图片，直接返回之前的页面
      if(filePaths.length == 0){
        let _url;
        if(this.data.forumType == 0){
          _url = '/my/pages/my_seekHelp/my_seekHelp'
        }
        else{
          _url = '/my/pages/my_help/my_help'
        }
        wx.navigateTo({
          url: _url,
        })
      }
      else{
        this.setData({
          id: this.data.forumId
        })
        this.uploadImg(filePaths)

      }
    }
  },
  // 修改图片接口 - 弃用
  async updateImg(filePaths){
    for(let item in filePaths){
      var resData;
      if(this.data.forumType == 0){
        const res = await api._update_sh_img(this.handleUnknown(filePaths[item]), this.data.forumId);
        resData = res.data
      }
      else{
        const res = await api._update_rh_img(this.handleUnknown(filePaths[item]), this.data.forumId);
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
            title: '编辑成功！',
            duration: 3000,
            success: () => {
              let _url;
              if(this.data.forumType == 0){
                _url = '/my/pages/my_seekHelp/my_seekHelp'
              }
              else{
                _url = '/my/pages/my_help/my_help'
              }
              wx.navigateTo({
                url: _url,
              })
            }
          })
        }
        else{
          wx.showToast({
            title: '编辑失败！',
            icon: 'error'
          })
          this.deleteForum()
        }
      }
    }
  },
  isTempFile(filePath){
    if(filePath.includes('wechat')) return false;
    else return true
  },
  // linUI上传图片接口
  async uploadImg(filePaths){
    for(let item in filePaths){
      // 如果图片已上传
      if(!this.isTempFile(filePaths[item])){
        continue;
      }
      var resData;
      if(this.data.forumType == 0){
        const res = await api._upload_sh_draft_img(this.handleUnknown(filePaths[item]), this.data.id);
        resData = res.data
      }
      else{
        const res = await api._upload_rh_draft_img(this.handleUnknown(filePaths[item]), this.data.id);
        resData = res.data
      }
      if(resData.length == 0){
        console.log('错误：后端返回数据为空！返回结果为：' + JSON.stringify(resData))
        this.deleteForum()
      }
      // 如果是插入图片
      else if(this.data.forumId == -1){
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
      // 如果是更新图片
      else{
        const resJson = JSON.parse(resData)
        console.log(resJson);
        if(resJson.code == 200){
          wx.showToast({
            title: '编辑成功！',
            duration: 3000,
            success: () => {
              let _url;
              if(this.data.forumType == 0){
                _url = '/my/pages/my_seekHelp/my_seekHelp'
              }
              else{
                _url = '/my/pages/my_help/my_help'
              }
              wx.navigateTo({
                url: _url,
              })
            }
          })
        }
        else{
          wx.showToast({
            title: '编辑失败！',
            icon: 'error'
          })
        }
      }
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
  // 删除图片
  async removeImg(e){
    if(this.data.forumId != -1){
      console.log(e.detail)
      for(let item in this.data.imageList){
        if(this.data.imageList[item].imageUrl == e.detail.current){
          if(this.data.forumType == 0){
            const res = await api._delete_sh_image(this.data.imageList[item].id)
            console.log(res.data)
          }
          else{
            const res = await api._delete_rh_image(this.data.imageList[item].id)
            console.log(res.data)
          }
          return;
        }
      }
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
  // lyx:
  async getForumInfo(type){
    let _typeIndex = 0;//指示类型下标
    let _tagIndex = 0;//指示标签下标
    let imgList = [];//存储图片url
    if(type == 0){//求助类型
      const res = await api._query_sh_forum_byId(this.data.forumId)
      const resData = res.data.data;
      console.log(resData)
      while(this.data.type0[_typeIndex] != resData.seekHelpType){
        _typeIndex++;
      }
      while(this.data.tag[_tagIndex] != resData.tag){
        _tagIndex++;
      }
      for(let item in resData.urlList){
        imgList.push(resData.urlList[item].imageUrl)
      }
      this.setData({
        typeIndex: _typeIndex, // 当前选中的type下标
        tagIndex: _tagIndex, // 当前选中的tag下标
        content: resData.name, // 内容/名称
        emergency: resData.urgency, // 紧急程度, 目前点亮☆的下标
        remark: resData.comment, // 备注
        forumImg: imgList, // 帖子图片url
        ddl_p: resData.deadLine,
        imageList: resData.urlList
      })
    }
    if(type == 1){//帮助类型
      const res = await api._query_rh_forum_byId(this.data.forumId)
      const resData = res.data.data;
      console.log(resData)
      while(this.data.type1[_typeIndex] != resData.helpType){
        _typeIndex++;
      }
      while(this.data.tag[_tagIndex] != resData.tag){
        _tagIndex++;
      }
      for(let item in resData.urlList){
        imgList.push(resData.urlList[item].imageUrl)
      }
      this.setData({
        typeIndex: _typeIndex, // 当前选中的type下标
        tagIndex: _tagIndex, // 当前选中的tag下标
        content: resData.name, // 内容/名称
        emergency: resData.urgency, // 紧急程度, 目前点亮☆的下标
        remark: resData.comment, // 备注
        forumImg: imgList, // 帖子图片url
        ddl_p: resData.deadLine,
        imageList: resData.urlList
      })
      console.log('已有图片列表：' + this.data.forumImg)
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var d = new Date();
    wx.setStorageSync('date', dateUtil.tsFormatTime(d,'Y/M/D h:m:s'))
    this.setData({
      ddl: wx.getStorageSync('date'),
      ddl_p: wx.getStorageSync('date')
    });
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    this.setData({
      start_time: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
    });
    // 根据options选择渲染求助还是帮忙
    this.setData({
      forumId: options.id,
      forumType: options.type
    })
    console.log('当前草稿id：' + this.data.forumId)
    console.log('当前草稿类别：' + this.data.forumType)
    // 如果帖子已经存在，从后端拿该id的帖子数据
    if(this.data.forumId != -1){
      this.getForumInfo(this.data.forumType)
    }
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
  }
})