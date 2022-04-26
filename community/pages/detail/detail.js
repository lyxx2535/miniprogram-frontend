// community/pages/detail/detail.js
import * as IMG from '../../../enum/imageUrl'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 1, // 发布帖子的用户id，默认
    avartar: "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqkI35J2pSNIibGqV1MZZiaPVNSLnlIYfPPu9QV3rHYBdnicxroF2bBEhQ7drrOsEMkOQtnH4icVSMCQQ/132", // 发布帖子用户的头像url
    userName: "彭俊植", // 发布帖子的用户名称
    forumId: 0, // 帖子ID
    postTime: "4月22日 17：41", // 帖子发布时间
    ddl: "4月23日", // 截止时间
    type: "求帮跑腿", // 帖子类型
    tag: "日用品", // 标签
    content: "一只口罩", // 内容
    emergency: 4, // 紧急程度
    remark: "孩子口罩用完了，求好心人私戳", // 备注
    forumImg: [IMG.ICNO_CHAT, IMG.ICNO_REFRESH, IMG.MY_SELECTED, IMG.MY_SELECTED, IMG.MY_SELECTED, IMG.MY_SELECTED], // 帖子图片url
    forumType: 0, // 求助贴：0，帮助贴：1
    imgUrl: {
      chat: IMG.ICNO_CHAT,
    },
    info: {}, // 帖子信息对象
  },

  // 跳转聊天
  goToChat(){
    const id = this.data.userId
    wx.navigateTo({
      url: `/chat/pages/chat/chat?receiverId=`+ id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id;
    this.setData({
      forumId: id
    })
    // TODO: 从后端拿该id的帖子数据

    // let _star = []
    // for (let index = 0; index < this.data.emergency; index++) {
    //   _star.push('★')
    // }
    // this.setData({
    //   star: _star
    // })
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
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

})