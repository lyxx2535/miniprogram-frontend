// pages/chat/chat.js
/**
 * author: Peng Junzhi
 * date: 2022-04-19
 */
import * as API from '../../enum/enums'
import { _get_chat_history, _get_user_info, _get_user_info_byId } from '../../utils/api';

const App = getApp();
const util = require('../../utils/chat');
let isSocketOpen = false;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    triggered: false,
    typeToCode:{
      'text':0,
      'image':1,
      'video':2
    },
    pageName:'',//页面名称
    popupFlag:true,
    sendId:1, //当前用户,此处定死 实际场景中改为自己业务ID
    lineHeight: 24,//表情的大小
    receiveId:'',//接受人
    list:[],//消息列表
    focus: true,//光标选中
    cursor: 0,//光标位置
    comment:'',//文本内容
    resource:'',//资源内容 图片或视频
    functionShow: false,//扩展区，目前只支持发图片
    toBottom:'bottom',// 滚动到底部
    emojiShow: false, //表情区是否显示
    paddingBottom:20, //消息内容区距底部的距离
    keyboardHeight:15,//输入框距下边框距离
    emojiSource: 'https://s1.ax1x.com/2022/04/19/LBDn78.png',//表情图片
    windowHeight:0,//聊天内容区的高度
    sendAvatar:'',//当前用户头像
    receiveAvatar:'',//聊天对象头像
    limit:1,//重连次数
    imgList:[],//聊天记录中的图片数组
    pageNo:1, //聊天记录页码
    pageSize:10,
    isDisConnection:false//是否是手动断开连接
  },
  // 初始化操作：获取我的信息，获取对方信息，初始化组件
  onLoad: function (options) {
    console.log("屏幕高度：" + wx.getSystemInfoSync().windowHeight);
    console.log("头高度：" + App.globalData.navHeight);
    //默认对象是
    const receiveId = options.receiveId ? options.receiveId: 9;
    this.getReceiveInfo(receiveId);
    this.getMemberInfo();
    //初始化emoji组件
    const emojiInstance = this.selectComponent('.mp-emoji');
    this.emojiNames = emojiInstance.getEmojiNames();
    this.parseEmoji = emojiInstance.parseEmoji;
    this.getScollBottom();
  },
  //获取对方信息
  async getReceiveInfo(id){
   const res = await _get_user_info_byId(id);
   console.log('获取聊天对象信息：' + res.data.data);
   if (res.data.code == 200) {
      const info = res.data.data;
      this.setData({
        receiveId: info.id,
        receiveAvatar: info.avatarUrl,
        pageName: info.nickname,
      },function(){
        this.linkSocket();
        this.getMessageHistory("init");
      })
      wx.setNavigationBarTitle({
        title: res.data.data.name,
        fail: err => {
          console.log(err)
        }
      })
    }
  },
  //获取我的信息
  async getMemberInfo(){
    const res = await _get_user_info();
    console.log('send info: ' + res.data.code)
    if (res.data.code == 200) {
      const info = res.data.data;
      console.log('sender avartar: ' + info.avatarUrl)
      this.setData({
        //初始化头像
        sendAvatar: info.avatarUrl,
      },function(){
      })
    }
  },
  // 链接websocket
  linkSocket() {
    let that = this
    wx.connectSocket({
      // todo: 这里需要改成: web-server/{senderId}。roomId可以删除
      url: API.WS_BASE + `web-server/${this.data.sendId}`,
      // url: API.WS_BASE + `webSocketOneToOne/${this.data.sendId}/${this.data.roomId}`,
      success() {
        isSocketOpen = true;
        that.initEventHandle()
      }
    })
  },

   initEventHandle() {
     // 监听 WebSocket 接受到服务器的消息事件
    wx.onSocketMessage((res) => {
      //接收到消息
      console.log("接收到消息" + JSON.stringify(res));
      let resJson = JSON.parse(res.data);
      var messageObj = {};
      messageObj.sendId = resJson.sender;
      if(messageObj.sendId === this.data.sendId){
        //消息发送成功的回调，删除菊花即可。
        for(let item in this.data.list){
          //访问list数组里的json
          if(this.data.list[item].requestId === resJson.requestId){
            this.data.list[item].requestId = null;
            this.data.list[item].time = util.tsFormatTime(resJson.createdTime,'Y-M-D h:m');
            this.data.list[item].type = resJson.type
          }
        }
        this.setData({
          list: this.data.list
        })
        return;
      }else{
        //接受到对方的来信，渲染
        messageObj.messageType = resJson.contentType;
        messageObj.avatar = this.data.receiveAvatar
        if(messageObj.messageType === 0){
          messageObj.content = JSON.parse(resJson.content);
        }else if(messageObj.messageType === 1){//往预览图片的数组里加入一张图片
          this.data.imgList.push(resJson.content);
          messageObj.content = resJson.content;
        }else{
          messageObj.content = resJson.content;
        }
        this.data.list.push(messageObj);
        this.setData({
          list:this.data.list,
          imgList:this.data.imgList
        },function(){
          this.getScollBottom();
        })
      }
    })
    wx.onSocketOpen(() => {
      console.log('WebSocket连接打开')
    })
    wx.onSocketError((res) => {
      console.log('WebSocket连接打开失败')
      this.reconnect()
    })
    wx.onSocketClose((res) => {
      console.log('WebSocket 已关闭！');
      isSocketOpen = false;
      if(this.data.isDisConnection){
        this.reconnect()
      }
    })
  },
  // 断线重连
  reconnect() {
    if (this.lockReconnect) return;
    this.lockReconnect = true;
    clearTimeout(this.timer)
    //超时计时器
    if (this.data.limit < 12) {
      this.timer = setTimeout(() => {
        this.linkSocket();
        this.lockReconnect = false;
      }, 5000);
      this.setData({
        limit: this.data.limit + 1
      })
      console.log("重新连接中："+this.data.limit);
    }
  },
  //改变输入框高度函数，未使用。
  onkeyboardHeightChange(e) {
    const {height} = e.detail
    this.setData({
      keyboardHeight: height
    })
  },
  /**
   * 打开图片
   * @param {} event
   */
  preview:function(event){
    console.log('预览图片！')
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current:currentUrl,
      urls: this.data.imgList,
    })
  },
  /**
   * 显示表情区
   */
  showEmoji:function() {
    this.setData({
      functionShow: false,
      emojiShow:!this.data.emojiShow
    },function(){
        //改变输入框高度
        this.setData({
          keyboardHeight:this.data.emojiShow?300:0,
          paddingBottom:this.data.emojiShow?300:80
        },function(){
          this.getScollBottom();
        })
    })
  },
  /**
   * 显示发送图片区
   */
  showFunction:function() {
    this.setData({
      functionShow:!this.data.functionShow,
      isPaddingBottom:!this.data.functionShow,
      emojiShow: false
    },
    function(){
      this.setData({
        keyboardHeight:this.data.functionShow?200:0,
        paddingBottom:this.data.functionShow?200:80
      },function(){
        this.getScollBottom();
      })
    })
  },
  onFocus(e) {
    this.hideAllPanel()
    this.setData({
      paddingBottom:e.detail.height,
      keyboardHeight:e.detail.height,
    },function(){
      this.getScollBottom()
    })
  },
  onBlur(e) {
      this.setData({
        keyboardHeight:0,
        paddingBottom:80
      })
      this.data.cursor = (e && e.detail.cursor)?e.detail.cursor:0
  },
  onInput(e) {
    const value = e.detail.value
    this.data.comment = value
  },
  onConfirm() {
      //消息发送前的处理
    let msg = this.data.comment;
      if (msg == "") {
        wx.showToast({
          title: '信息不能为空',
          icon: 'none',
          mask: true,
        });
        return;
      }
    const parsedComment = this.parseEmoji(this.data.comment)
    this.onSend(this.data.typeToCode.text,parsedComment)
    this.getScollBottom();
  },
  onSend(type, message) {
    const obj = {};
    obj.content = message; //消息内容
    obj.requestId = util.wxuuid(); //消息请求ID，用于消息是否发送成功，去除菊花
    obj.receiveId = this.data.receiveId;//接收人的ID
    obj.sendId = this.data.sendId; //发送人的ID
    obj.messageType = type; // 0:文本 1:图片 2:视频
    //向后台传入最后一条消息的时间，后台进行计算，下一条消息的间隔是否超过5分钟，超过则显示时间
    if(this.data.list && this.data.list.length>0){
      obj.lastMessageTime = this.data.list[this.data.list.length-1].time;
    }
    //消息先加入聊天区域，此时菊花是转的
    this.data.list.push(obj);
    this.setData({
      comment: '',
      resource:'',
      giftSelected:null,
      popupFlag:true,
      list:this.data.list
    },function(){
      this.getScollBottom();
    })
    this.sendSocket(obj);
  },
  //socket发送消息
  sendSocket:function(obj){
    if (isSocketOpen) {
      wx.sendSocketMessage({
        data: JSON.stringify(obj),
        success(res) {
          console.log("打开socket")
        }
      })
    } else {
      wx.showToast({
        title: '链接已断,重新链接',
        icon: 'none',
        mask: true,
      });
    }
  },
  deleteEmoji: function() {
    const pos = this.data.cursor
    const comment = this.data.comment
    let result = '',
      cursor = 0

    let emojiLen = 6
    let startPos = pos - emojiLen
    if (startPos < 0) {
      startPos = 0
      emojiLen = pos
    }
    const str = comment.slice(startPos, pos)
    const matchs = str.match(/\[([\u4e00-\u9fa5\w]+)\]$/g)
    // 删除表情
    if (matchs) {
      const rawName = matchs[0]
      const left = emojiLen - rawName.length
      if (this.emojiNames.indexOf(rawName) >= 0) {
        const replace = str.replace(rawName, '')
        result = comment.slice(0, startPos) + replace + comment.slice(pos)
        cursor = startPos + left
      }
      // 删除字符
    } else {
      let endPos = pos - 1
      if (endPos < 0) endPos = 0
      const prefix = comment.slice(0, endPos)
      const suffix = comment.slice(pos)
      result = prefix + suffix
      cursor = endPos
    }
    this.setData({
      comment: result,
      cursor: cursor
    })
  },
  hideAllPanel() {
    this.setData({
      functionShow: false,
      emojiShow: false
    })
  },
  //发送消息后滚动到最底部
  getScollBottom() {
      this.setData({toBottom: 'bottom'})
  },
  /**
   * 插入表情
   * @param {} evt
   */
  insertEmoji(evt) {
    const emotionName = evt.detail.emotionName
    const { cursor, comment } = this.data
    const newComment =
      comment.slice(0, cursor) + emotionName + comment.slice(cursor)
    this.setData({
      comment: newComment,
      cursor: cursor + emotionName.length
    })
  },
  /**
   * 选择图片或者视频
   */
  chooseMedia:function(){
    const that = this;
    wx.chooseMedia({
      count: 9,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.type);
        console.log(res.tempFiles)
        const type = res.type === 'image'?that.data.typeToCode.image:that.data.typeToCode.video;
        const tempFilePaths = res.tempFiles;
        for(let index in tempFilePaths){
          that.onSend(type, tempFilePaths[index].tempFilePath);
        }
      }
    })
  },

 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    wx.getSystemInfo({
      success({windowHeight}) {
        that.setData({
          windowHeight:windowHeight-App.globalData.navHeight-80
        })
        console.log(windowHeight);
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isDisConnection:true
    })
    wx.closeSocket()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("关闭");
    wx.closeSocket()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("11111");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onPulling(e) {
    console.log('onPulling:', e)
  },

  onRefresh() {
    const that =this;
    if(this._noDataing){
      setTimeout(function() {
        that.setData({
          triggered: false
        })
      }, 500);
    }else{
      this.getMessageHistory("history");
    }
  },

  onRestore(e) {
    console.log('onRestore:', e)
  },

  onAbort(e) {
    console.log('onAbort', e)
  },

  //下拉获取聊天记录
  async getMessageHistory(ident){
    // console.log('history before data: ' + this.data.sendId + this.data.receiveId + this.data.pageNo + this.data.pageSize)
    const data = _get_chat_history(this.data.receiveIdId,
                                   this.data.sendId,
                                   this.data.pageNo,
                                   this.data.pageSize);
    // const records = data.data.data;
    console.log('history: ' + data.data)
    // if(records){
    //   if(records.length < this.data.pageSize){
    //     this._noDataing = true
    //   }
    //   for(let index in records){
    //     const obj = records[index];
    //     obj.requestId = null;
    //     obj.content = JSON.parse(obj.content);
    //     obj.sendId = obj.senderId
    //     obj.time = util.tsFormatTime(obj.sendTime,'Y-M-D h:m');
    //     this.data.list.unshift(obj);
    //   }
    //   this.setData({
    //     list: this.data.list,
    //     triggered: false,
    //     pageNo: this.data.pageNo + 1
    //   },function(){
    //     if(ident === "init" ){              
    //       this.getScollBottom();
    //     }
    //   })
    // }
  }
})
