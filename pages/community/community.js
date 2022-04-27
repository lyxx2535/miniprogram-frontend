// community/pages/community/community.js
import * as IMG from '../../enum/imageUrl'
import * as api from '../../utils/api'
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
    nav:[
      {'id':'算法推荐','image':IMG.LABEL_RECOMMEND},
      {'id':'食物饮品','image':IMG.LABEL_FOOD},
      {'id':'日用品','image':IMG.LABEL_DAILY},
      {'id':'书籍文具','image':IMG.LABEL_BOOK},
      {'id':'运动用品','image':IMG.LABEL_SPORT},
      {'id':'化妆品','image':IMG.LABEL_COSMETICS},
      {'id':'药品','image':IMG.LABEL_MEDICINE},
      {'id':'卫生用品','image':IMG.LABEL_HYGIENE},
      {'id':'电子产品','image':IMG.LABEL_ELECTRONIC},
    ],
    forumSeekHelp: {}, // 求助页面显示的帖子对象，成员是各个标签的帖子list
    seekHelpList: [], // 当前展示的求助帖子list
    forumRenderHelp: {}, // 帮助页面显示的帖子对象，成员是各个标签的帖子list
    renderHelpList: [], // 当前展示的帮助帖子list
    // 当前项目
    current: 0,
    // 滚动栏滚动距离
    scrollLeft: 0,
    // 窗体宽度
    windowWidth: 0,

    // pjz - 搜索
    searchRes: [], // 帖子的搜索结果
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
  refreshData(index){
    // 改变当前list视图
    switch (index) {
      case 0:
        if(this.data.forumRenderHelp['算法推荐'] == undefined){
          this.setData({
            renderHelpList: []
          })
        }
        if(this.data.forumSeekHelp['算法推荐'] == undefined){
          this.setData({
            seekHelpList: []
          })
        }
        this.setData({
          seekHelpList: this.data.forumSeekHelp['算法推荐'],
          renderHelpList: this.data.forumRenderHelp['算法推荐'],
        })
        break;
      case 1:
        if(this.data.forumRenderHelp['食物饮品'] == undefined){
          this.setData({
            renderHelpList: []
          })
        }
        if(this.data.forumSeekHelp['食物饮品'] == undefined){
          this.setData({
            seekHelpList: []
          })
        }
        this.setData({
          seekHelpList: this.data.forumSeekHelp['食物饮品'],
          renderHelpList: this.data.forumRenderHelp['食物饮品'],
        })        
          break;
      case 2:
        if(this.data.forumRenderHelp['日用品'] == undefined){
          this.setData({
            renderHelpList: []
          })
        }
        if(this.data.forumSeekHelp['日用品'] == undefined){
          this.setData({
            seekHelpList: []
          })
        }
        this.setData({
          seekHelpList: this.data.forumSeekHelp['日用品'],
          renderHelpList: this.data.forumRenderHelp['日用品'],
        })        
        break;
      case 3:
        if(this.data.forumRenderHelp['书籍文具'] == undefined){
          this.setData({
            renderHelpList: []
          })
        }
        if(this.data.forumSeekHelp['书籍文具'] == undefined){
          this.setData({
            seekHelpList: []
          })
        }
        this.setData({
          seekHelpList: this.data.forumSeekHelp['书籍文具'],
          renderHelpList: this.data.forumRenderHelp['书籍文具'],
        })
          break;
      case 4:
        if(this.data.forumRenderHelp['运动用品'] == undefined){
          this.setData({
            renderHelpList: []
          })
        }
        if(this.data.forumSeekHelp['运动用品'] == undefined){
          this.setData({
            seekHelpList: []
          })
        }
        this.setData({
          seekHelpList: this.data.forumSeekHelp['运动用品'],
          renderHelpList: this.data.forumRenderHelp['运动用品'],
        })
        break;
      case 5:
        if(this.data.forumRenderHelp['化妆品'] == undefined){
          this.setData({
            renderHelpList: []
          })
        }
        if(this.data.forumSeekHelp['化妆品'] == undefined){
          this.setData({
            seekHelpList: []
          })
        }
        this.setData({
          seekHelpList: this.data.forumSeekHelp['化妆品'],
          renderHelpList: this.data.forumRenderHelp['化妆品'],
        })
          break;
      case 6:
        if(this.data.forumRenderHelp['药品'] == undefined){
          this.setData({
            renderHelpList: []
          })
        }
        if(this.data.forumSeekHelp['药品'] == undefined){
          this.setData({
            seekHelpList: []
          })
        }
        this.setData({
          seekHelpList: this.data.forumSeekHelp['药品'],
          renderHelpList: this.data.forumRenderHelp['药品'],
        })
          break;
      case 7:
        if(this.data.forumRenderHelp['卫生用品'] == undefined){
          this.setData({
            renderHelpList: []
          })
        }
        if(this.data.forumSeekHelp['卫生用品'] == undefined){
          this.setData({
            seekHelpList: []
          })
        }
        this.setData({
          seekHelpList: this.data.forumSeekHelp['卫生用品'],
          renderHelpList: this.data.forumRenderHelp['卫生用品'],
        })
          break;
      case 8:
        if(this.data.forumRenderHelp['电子产品'] == undefined){
          this.setData({
            renderHelpList: []
          })
        }
        if(this.data.forumSeekHelp['电子产品'] == undefined){
          this.setData({
            seekHelpList: []
          })
        }
        this.setData({
          seekHelpList: this.data.forumSeekHelp['电子产品'],
          renderHelpList: this.data.forumRenderHelp['电子产品'],
        }) 
        break;
    }
    console.log('刷新视图！')
  },
  //标签点击响应事件
  currentNav: function (e) {
    let index = e.currentTarget.dataset.index;
    let scrollLeft =  e.currentTarget.offsetLeft - ( this.data.windowWidth * 0.9 ) / 2;
    console.log('change tag index: ' + index)
    this.setData({
      current: index,
      scrollLeft: scrollLeft
    })
    this.refreshData(index);
    console.log(this.data.seekHelpList)
  },
  // 查看帖子详情
  checkDetail(e){
    const id = e.currentTarget.dataset.id;
    console.log('查看' + id + '号帖子内容')
    // const id = 1; // 这里暂时先随便写一个值
    wx.navigateTo({
      url: '/community/pages/detail/detail?id=' + id + '&type=' + this.data.currentTab,
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
  async getSeekHelpList(){
    const res = await api._query_sh_list_byTag();
    const resData = res.data.data;
    this.setData({
      forumSeekHelp: resData
    })
    console.log(resData)
    this.refreshData(this.data.current)
  },
  async getRenderHelpList(){
    const res = await api._query_rh_list_byTag();
    const resData = res.data.data;
    this.setData({
      forumRenderHelp: resData
    })
    console.log(resData)
    this.refreshData(this.data.current)
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
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    // this.setData({
    //   currentTab: 0
    // })
    // 加载后端数据
    this.getSeekHelpList();
    this.getRenderHelpList();
    console.log('load！')
    // 搜索功能的测试数据
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
  onReady(){
    wx.setNavigationBarTitle({
      title: this.data.navigationTitle,
      fail: err => {
        console.log(err)
      }
    })
  }
})