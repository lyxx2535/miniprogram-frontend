// pages/list/list.js
/**
 * author: Peng Junzhi
 * date: 2022-04-19
 */
import * as API from '../../enum/enums'
import { _get_user_friendList } from '../../utils/api';
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '加载中...', // 状态
    list: [], // 数据列表
    // myOpenId: '1111',
    myOpenId: wx.getStorageSync('openid'),
    type: '', // 数据类型
    loading: true // 显示等待框
  },
  toChat(event){
    // let openId = event.currentTarget.dataset.openid;
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      // url: `/pages/chat/chat?receiveOpenId=`+openId,
      url: `/pages/chat/chat?receiverId=`+ id,
    })
  },
  async get_friend_list(){
    // 不需要参数了，携带token查
    const res = await _get_user_friendList();
    console.log(res.data);
    this.setData({
      list: res.data.data,
      loading: false // 关闭等待框
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { // options 为 board页传来的参数
    this.get_friend_list();
    // const openId = this.data.myOpenId;
    // const _this = this;
    // // 拼接请求url
    // // todo: url: usr/friend-list need token
    // const url =  API.CHAT_BASE + 'mobile/register/getMemberList/' + openId;
    // wx.setStorageSync('myOpenid', openId);
    // console.log(wx.getStorageSync('myOpenid'))
    // // TODO: GET接口，无参数，带token，请求所有聊天过的用户数据
    // // 返回对象数组，每个对象包含用户名、用户头像url及对应的最新消息内容和通信时间
    // // 请求数据
    // wx.request({
    //   url: url,
    //   data: {},
    //   header: {
    //     'content-type': 'json' // 默认值
    //   },
    //   success: function(res) {
    //     console.log(res.data);
    //     // 赋值
    //     _this.setData({
    //       list: res.data.data,
    //       loading: false // 关闭等待框
    //     })
    //   }
    // })
  }
})