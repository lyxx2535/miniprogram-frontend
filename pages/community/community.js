// community/pages/community/community.js
import * as IMG from '../../enum/imageUrl'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationTitle: '互助社区', // 页面title
    navbar: ['求助区', '帮忙区'],
    currentTab: 0,
    NEW: IMG.ICNO_NEW,
    test_img: IMG.VECTOR_PIC,
    // nav: ['算法推荐','食物饮品','日用品','书籍文具'],
    // nav:[{'id':'算法推荐','image':IMG.LABEL_RECOMMEND},
    //           {'id':'食物饮品','image':IMG.LABEL_FOOD},
    //           {'id':'日用品','image':IMG.LABEL_DAILY},
    //           {'id':'书籍文具','image':IMG.LABEL_BOOK},
    // ],//待补充
    //更换图片！！！
    nav:[{'id':'算法推荐','image':'https://s2.loli.net/2022/04/25/uhfpOyQeCbArGq3.png'},
              {'id':'食物饮品','image':'https://s2.loli.net/2022/04/25/mlv8R2kiYE5ODpf.png'},
              {'id':'日用品','image':'https://s2.loli.net/2022/04/25/a8TgQZPzsRHVJ2L.png'},
              {'id':'书籍文具','image':'https://s2.loli.net/2022/04/25/WNwolAz9V4JjZRu.png'},
    ],
    // 当前项目
    current: 0,
    // 滚动栏滚动距离
    scrollLeft: 0,
    // 窗体宽度
    windowWidth: 0,

    // pjz - 搜索
    list: [], // 帖子的搜索结果
    keyWord: "", // 搜索关键字
    history: ['阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴'], // 历史搜索词
    algorithm: ['阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴','阿巴'], // 算法推荐关键词
    asset: {
      search: IMG.ICNO_SEARCH,
      trash: IMG.ICNO_DELETE,
      refresh: IMG.ICNO_REFRESH
    },
    isSearch: false, // 是否展现搜索页面
    isShowRes: false, // 是否展现搜索结果
  },

  // pjz - 搜索
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
    if(!this.data.isShowRes){
      this.setData({
        isShowRes: true
      })
    }
    console.log(this.data.isShowRes)
    // TODO: 搜索算法
  },
  // 取消输入
  cancelInput(){
    this.setData({
      keyWord: "",
      isSearch: false,
      isShowRes: false
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
      keyWord: _keyWord,
      // 此时bindinput无法监听到input值变化，需要手动设置视图变化
      isShowRes: true
    })
  },

  // cyr - community
  //切换bar
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //全局变量
    app.globalData.currentTab = e.currentTarget.dataset.idx;
  },

  //标签点击响应事件
  currentNav: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let scrollLeft =  e.currentTarget.offsetLeft - ( this.data.windowWidth * 0.9 ) / 2;
    this.setData({
      current: index,
      scrollLeft: scrollLeft
    })
  },
  // 查看帖子详情
  checkDetail(e){
    // const id = e.currentTarget.dataset.id;
    const id = 1; // 这里暂时先随便写一个值
    wx.navigateTo({
      url: '/community/pages/detail/detail?id=' + id,
    })
  },
  // 跳转至编辑页
  toDraft(){
    let type;
    if(this.data.currentTab == undefined){
      type = 0
    }
    else{
      type = this.data.currentTab
    }
    wx.navigateTo({
      url: '/community/pages/draft/draft?type=' + type,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          windowWidth: result.windowWidth
        })
      },
    })
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    this.setData({
      currentTab: app.globalData.currentTab
    })
    const data = [{
      name: '一只口罩',
      type: '紧急租借',
      tag: '日用品',
      remark: '阿巴阿巴',
      userName: '阿巴阿巴',
      avartar: this.data.test_img,
      showImg: this.data.test_img,
      id: '1'
    }]
    this.setData({
      list: data
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