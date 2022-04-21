// pages/list/list.js
/**
 * author: Peng Junzhi
 * date: 2022-04-19
 */
import { _get_user_friendList } from '../../../utils/api';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '加载中...', // 状态
    list: [], // 数据列表
    myOpenId: wx.getStorageSync('openid'),// 用户的唯一标识
    type: '', // 数据类型
    loading: true // 显示等待框
  },
  toChat(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/chat/pages/chat/chat?receiverId=`+ id,
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
   * 生命周期函数--监听页面展示
   * 用于返回页面时刷新数据
   */
  onShow: function(options){
    this.get_friend_list();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { // options 为 board页传来的参数
    this.get_friend_list();
  }
})