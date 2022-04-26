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
    isSearch: false, // 是否展现搜索页面

    // 测试数据，待改
    test_img: IMG.VECTOR_PIC,
    // 当前项目
    current: 0,
  },
  // 开始输入
  onSearch(){
    console.log('exe')
    this.setData({
      isSearch: true
    })
  },
  // 输入框双向绑定
  onInput(e){
    this.setData({
      keyWord: e.detail.value
    })
    // TODO: 搜索算法
  },
  // 取消输入
  cancelInput(){
    this.setData({
      keyWord: "",
      isSearch: false
    })
  },
  // 清楚历史记录
  clearHistory(){
    this.setData({
      history: []
    })
  },
  // 刷新算法推荐
  refreshTag(){

  },
  // 点击tag
  getInput(e){
    const _keyWord = e.currentTarget.dataset.content;
    this.setData({
      keyWord: _keyWord
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // TODO: 获取历史记录
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

})