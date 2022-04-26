// community/pages/search/search.js
import * as IMG from '../../../enum/imageUrl'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], // 帖子的搜索结果
    keyWord: "", // 搜索关键字
    history: ['阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴'], // 历史搜索词
    algorithm: ['阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴'], // 算法推荐关键词
    asset: {
      search: IMG.ICNO_SEARCH,
      trash: IMG.ICNO_DELETE,
      refresh: IMG.ICNO_REFRESH
    },
    navigationTitle: '搜一搜',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    wx.setNavigationBarTitle({
      title: this.data.navigationTitle,
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