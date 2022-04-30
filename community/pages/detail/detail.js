// community/pages/detail/detail.js
import * as IMG from '../../../enum/imageUrl'
import * as api from '../../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 9, // 发布帖子的用户id，默认为zy
    forumType: 0, // 求助贴：0，帮助贴：1
    imgUrl: {
      chat: IMG.ICNO_CHAT,
    },
    info: {}, // 帖子信息对象
  },

  // 预览图片
  previewImg(e){
    let temp = []
    const list = e.currentTarget.dataset.list
    for(let item in list){
      temp.push(list[item].imageUrl)
    }
    const url = e.currentTarget.dataset.url
    console.log(JSON.stringify(list) + url)
    if(list.length == 0 ){
      list.push(url)
    }
    wx.previewImage({
      urls: temp,
      current: url,
      showmenu: true,
    })
  },

  // 跳转聊天
  goToChat(){
    const id = this.data.userId
    if(wx.getStorageSync('myId') == id){
      wx.showToast({
        title: '无法和自己聊天！',
        icon: 'error',
        duration: 1000
      })
    }
    else{
      wx.navigateTo({
        url: `/chat/pages/chat/chat?receiverId=`+ id,
      })
    }
  },

  async getForumInfo(type){
    if(type == 0){
      const res = await api._query_sh_forum_byId(this.data.forumId)
      const resData = res.data.data;
      this.setData({
        userId: resData.userId,
        info: resData
      })
    }
    if(type == 1){
      const res = await api._query_rh_forum_byId(this.data.forumId)
      const resData = res.data.data;
      this.setData({
        userId: resData.userId,
        info: resData
      })
    }
    console.log(this.data.info)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id;
    const type = options.type
    this.setData({
      forumId: id,
      forumType: type
    })
    console.log(this.data.forumId)
    console.log(this.data.forumType)
    // 从后端拿该id的帖子数据
    this.getForumInfo(type)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let _title;
    if(this.data.forumType == 0){
      _title = "求助区"
    }
    else{
      _title = "帮忙区"
    }
    wx.setNavigationBarTitle({
      title: _title,
      fail: err => {
        console.log(err)
      }
    })
  },

})