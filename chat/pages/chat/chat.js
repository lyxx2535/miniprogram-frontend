// pages/chat/chat.js
/**
 * author: Peng Junzhi
 * date: 2022-04-19
 */

import * as API from '../../../enum/enums'
import { _get_chat_history, _get_user_info, _get_user_info_byId } from '../../../utils/api';

const App = getApp();
const util = require('../../../utils/chat');
let isSocketOpen = false;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    triggered: false,//重新刷新标志
    typeToCode:{
      'text':0,
      'image':1,
      'video':2
    },//图片功能删掉了，暂时没用
    pageName:'',//页面名称
    senderId: 1, //当前用户ID
    lineHeight: 24,//表情的大小
    receiverId: 0,//接受人
    roomId: 0,//房间ID 防止串线
    list:[],//消息列表
    focus: false,//光标选中
    cursor: 0,//光标位置
    comment:'',//文本内容
    functionShow: false,//扩展区，目前只支持发图片
    toBottom:'bottom',// 滚动到底部
    emojiShow: false, //表情区是否显示
    paddingBottom: 0, //消息内容区距底部的距离
    keyboardHeight: 0,//输入框距下边框距离
    emojiSource: 'https://s1.ax1x.com/2022/04/19/LBDn78.png',//表情图片
    windowHeight:0,//聊天内容区的高度
    sendAvatar:'',//当前用户头像
    receiveAvatar:'',//聊天对象头像
    limit:1,//重连次数
    imgList:[],//聊天记录中的图片数组
    pageNo:0, //聊天记录页码
    pageSize:10,//聊天记录页容量
    isDisConnection: false, //是否是手动断开连接
    isAutoPosition: true, // 页面是否随键盘上移
    trueKbHeight: false, // 键盘距底部的真实距离
  },
  // 初始化操作：获取我的信息，获取对方信息，初始化组件
  onLoad: function (options) {
    console.log("屏幕高度：" + wx.getSystemInfoSync().windowHeight);
    console.log("头高度：" + App.globalData.navHeight);
    //默认聊天对象是zy id：9
    const receiverId = options.receiverId;
    this.getMemberInfo(receiverId);
    this.getReceiveInfo(receiverId);
    if(wx.getStorageSync(`comment${receiverId}`)){
      this.setData({
        comment: wx.getStorageSync(`comment${receiverId}`)
      })
    }
    console.log('comment' + this.data.comment)
    //初始化emoji组件
    // const emojiInstance = this.selectComponent('.mp-emoji');
    // this.emojiNames = emojiInstance.getEmojiNames();
    // this.parseEmoji = emojiInstance.parseEmoji;
    // this.getScollBottom();
  },
  // 获取对方信息
  async getReceiveInfo(id){
   const res = await _get_user_info_byId(id);
   console.log('获取聊天对象信息：' + JSON.stringify(res.data.data));
   if (res.data.code == 200) {
      const info = res.data.data;
      this.setData({
        receiverId: info.id,
        receiveAvatar: info.avatarUrl,
        pageName: info.nickname
      },function(){
        this.linkSocket();
        this.getMessageHistory("init");
      })
      wx.setNavigationBarTitle({
        title: res.data.data.nickName,
        fail: err => {
          console.log(err)
        }
      })
    }
  },
  // 获取我的信息
  async getMemberInfo(receiverId){
    const res = await _get_user_info();
    console.log('获取我的信息：' + JSON.stringify(res.data.data));
    if (res.data.code == 200) {
      const info = res.data.data;
      this.setData({
        //初始化头像
        sendAvatar: info.avatarUrl,
        senderId: info.id
      },function(){
      })
    }
  },
  // 链接websocket
  linkSocket() {
    let that = this
    this.setData({
      roomId: this.data.senderId + this.data.receiverId
    })
    console.log('roomId: ' + this.data.roomId)
    wx.connectSocket({
      url: API.WS_BASE + `web-server/${this.data.senderId}/${this.data.roomId}/${this.data.receiverId}`,
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
      if(res.data.length == 0){
        console.log('错误：后端返回数据为空！返回结果为：' + JSON.stringify(res))
      }
      else{
        let resJson = JSON.parse(res.data);
        var messageObj = {};
        messageObj.senderId = resJson.senderId;
        //如果是发送消息
        if(messageObj.senderId === this.data.senderId){
          //消息发送成功的回调，删除菊花即可。
          for(let item in this.data.list){
            // 访问list数组里的json，找到最新发的那条信息
            if(this.data.list[item].id == null){
              console.log('新发消息： ' + JSON.stringify(this.data.list[item]))
              // 删除小菊花
              this.data.list[item].receiverId = null;
              this.data.list[item].sendTime = util.tsFormatTime(resJson.sendTime,'Y/M/D h:m:s');
              this.data.list[item].isShowTime = resJson.isShowTime;
              this.data.list[item].id = resJson.id;
            }
          }
          this.setData({
            list: this.data.list
          })
          console.log('消息列表：' + JSON.stringify(this.data.list))
          //如果是接受消息
        }else{
          //接受到对方的来信，渲染
          // messageObj.avatar = this.data.receiveAvatar;
          //传入时间
          messageObj.id = resJson.id
          messageObj.sendTime = util.tsFormatTime(resJson.sendTime,'Y/M/D h:m:s');
          messageObj.content = resJson.content;
          messageObj.isShowTime = resJson.isShowTime;
          this.data.list.push(messageObj);
          console.log('接受到对方来信：' + messageObj)
          this.setData({
            list: this.data.list,
          },function(){
            this.getScollBottom();
          })
        }
      }
      // 随后改变键盘弹出状态
      if(this.data.list.length <= 5){
        this.setData({
          isAutoPosition: false,
          trueKbHeight: true
        })
      }
      else{
        this.setData({
          isAutoPosition: true,
          trueKbHeight: false
        })
      }
      console.log('监听页面上弹状态：' + this.data.isAutoPosition)
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
  // showEmoji:function() {
  //   this.setData({
  //     functionShow: false,
  //     emojiShow:!this.data.emojiShow
  //   },function(){
  //       //改变输入框高度
  //       this.setData({
  //         keyboardHeight:this.data.emojiShow?300:0,
  //         paddingBottom:this.data.emojiShow?300:80
  //       },function(){
  //         this.getScollBottom();
  //       })
  //   })
  // },
  /**
   * 显示发送图片区
   */
  // showFunction:function() {
  //   this.setData({
  //     functionShow:!this.data.functionShow,
  //     isPaddingBottom:!this.data.functionShow,
  //     emojiShow: false
  //   },
  //   function(){
  //     this.setData({
  //       keyboardHeight:this.data.functionShow?200:0,
  //       paddingBottom:this.data.functionShow?200:80
  //     },function(){
  //       this.getScollBottom();
  //     })
  //   })
  // },
  onFocus(e) {
    this.hideAllPanel()
    if(this.data.trueKbHeight){
      this.setData({
        paddingBottom: e.detail.height,
        keyboardHeight: e.detail.height,
      },function(){
        this.getScollBottom()
      })
    }
    else{
      this.setData({
        paddingBottom: e.detail.height
      },function(){
        this.getScollBottom()
      })
    }
  },
  onBlur(e) {
      this.setData({
        keyboardHeight:0,
        paddingBottom: 0
      })
      this.data.cursor = (e && e.detail.cursor)?e.detail.cursor:0
  },
  onInput(e) {
    const value = e.detail.value
    this.data.comment = value
    wx.setStorageSync(`comment${this.data.receiverId}`, value)
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
    // const parsedComment = this.parseEmoji(this.data.comment)
    // this.onSend(parsedComment)
    console.log('发送消息：' + this.data.comment)
    this.onSend(this.data.comment)
    this.getScollBottom();
  },
  onSend(message) {
    const obj = {};
    obj.senderId = this.data.senderId; //发送人的ID
    obj.receiverId = this.data.receiverId;//接收人的ID
    obj.roomId = this.data.roomId; //二人组合成的房间ID
    obj.content = message; //消息内容
    //消息先加入聊天区域，此时菊花是转的
    this.data.list.push(obj);
    //向后台传入最后一条消息的时间，后台进行计算，下一条消息的间隔是否超过5分钟，超过则显示时间
    if(this.data.list && this.data.list.length > 1){
      obj.lastSendMsgTime = util.tsFormatTime(this.data.list[this.data.list.length - 2].sendTime, 'Y/M/D h:m:s');
    }
    else{
      obj.lastSendMsgTime = null;
    }
    console.log('第' + this.data.roomId + '号房 ' + '上一条消息发送时间: ' + obj.lastSendMsgTime)
    wx.setStorageSync(`comment${this.data.receiverId}`, '')
    this.setData({
      comment: '',
      list: this.data.list
    },function(){
      this.getScollBottom();
    })
    this.sendSocket(obj);
  },
  //socket发送消息
  sendSocket:function(obj){
    console.log(JSON.stringify(obj))
    if (isSocketOpen) {
      wx.sendSocketMessage({
        data: JSON.stringify(obj),
        success(res) {
          console.log("打开socket!");
        }
      })
    } else {
      wx.showToast({
        title: '链接已断,重新链接',
        icon: 'none',
        mask: true,
      });
    }
    this.getScollBottom();
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    wx.getSystemInfo({
      success({windowHeight}) {
        that.setData({
          windowHeight: windowHeight - App.globalData.navHeight
        })
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
  onReachBottom(e) {
    console.log('onReachBottom:', e)
  },
  // 下拉处理
  onPulling(e) {
    console.log('onPulling:', e)
  },
  // 下拉获取聊天记录
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
  //获取聊天记录
  async getMessageHistory(ident){
    const data = await _get_chat_history(this.data.receiverId,
                                   this.data.senderId,
                                   this.data.pageNo,
                                   this.data.pageSize);
      console.log('拉取页码：' + this.data.pageNo)
      const records = data.data.data;
      if(records){
        if(records.length < this.data.pageSize){
          this._noDataing = true
        }
        if(records.length <= 7){
          this.setData({
            isAutoPosition: false,
            trueKbHeight: true
          })
        }
        else{
          this.setData({
            isAutoPosition: true,
            trueKbHeight: false
          })
        }
        for(let index in records){
          const obj = records[index];
          // receiverId设为null，用于标注小菊花
          obj.receiverId = null;
          obj.content = obj.content;
          obj.senderId = obj.senderId;
          obj.id = obj.id;
          obj.isShowTime = obj.isShowTime;
          obj.sendTime = util.tsFormatTime(obj.sendTime,'Y/M/D h:m:s');
          // 这里需要逆序添加 保证最新的消息永远在list的最后面
          this.data.list.unshift(obj);
        }
        // 页数 + 1
        this.setData({
          list: this.data.list,
          triggered: false,
          pageNo: this.data.pageNo + 1
        },function(){
          if(ident === "init" ){              
            this.getScollBottom();
          }
        })
        console.log('本地缓存聊天记录：' + JSON.stringify(this.data.list));
      }
  }
})
