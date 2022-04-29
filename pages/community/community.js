// community/pages/community/community.js
import { DELETE_RH_HISTORY_BY_USER } from '../../enum/enums'
import * as IMG from '../../enum/imageUrl'
import * as api from '../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now_state:null,
    Help:IMG.ICNO_HELP,
    Seek_Help:IMG.ICNO_SEEKHELP,
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
    current: 0,  // 当前项目
    scrollLeft: 0, // 滚动栏滚动距离
    windowWidth: 0, // 窗体宽度
    // 搜索模块
    searchRes: [], // 帖子的搜索结果
    keyWord: "", // 搜索关键字
    history: [], // 历史搜索词
    algorithm: [], // 算法推荐关键词
    asset: {
      search: IMG.ICNO_SEARCH,
      trash: IMG.ICNO_DELETE,
      refresh: IMG.ICNO_REFRESH
    },
    isSearch: false, // 是否展现搜索页面
    isShowRes: false, // 是否展现搜索结果
    isShowSkeleton: true, // 是否展示骨架条
  },

  // pjz - 搜索
  async getSearchHistory(){
    if(this.data.currentTab == 0){
      const res = await api._get_sh_search_history()
      console.log('求助历史记录：' + JSON.stringify(res.data))
      this.setData({
        history: res.data.data
      })
    }
    else{
      const res = await api._get_rh_search_history()
      console.log('帮助历史记录：' + JSON.stringify(res.data))
      this.setData({
        history: res.data.data
      })
    }
  },
  // 开始输入
  onSearch(){
    console.log('exe')
    this.setData({
      isSearch: true
    })
    // 获取搜索记录
    this.getSearchHistory()
  },
  async searchSH(value){
    // handle空串
    if(value == ''){
      this.setData({
        searchRes: []
      })
      return
    }
    const res = await api._search_sh_by_keyWord(value)
    console.log('搜索求助贴：' + JSON.stringify(res.data))
    this.setData({
      searchRes: res.data.data
    })
  },
  async searchRH(value){
    // handle空串
    if(value == ''){
      this.setData({
        searchRes: []
      })
      return
    }
    const res = await api._search_rh_by_keyWord(value)
    console.log('搜索帮助贴：' + JSON.stringify(res.data))
    this.setData({
      searchRes: res.data.data
    })
  },
  // 输入框双向绑定
  onInput(e){
    this.setData({
      keyWord: e.detail.value
    })
    console.log('搜索值: ' + e.detail.value)
    if(!this.data.isShowRes){
      this.setData({
        isShowRes: true
      })
    }
    console.log(this.data.isShowRes)
    // 搜索算法
    if(this.data.currentTab == 0){
      this.searchSH(e.detail.value)
    }
    else{
      this.searchRH(e.detail.value)
    }
  },
  // 取消输入
  cancelInput(){
    this.setData({
      keyWord: "",
      isSearch: false,
      isShowRes: false
    })
  },
  async deleteHistoryByUser(){
    if(this.data.currentTab == 0){
      const res = await api._delete_sh_search_history_byUser()
      console.log('删除求助历史记录：' + JSON.stringify(res.data))
    }
    else{
      const res = await api._delete_rh_search_history_byUser()
      console.log('删除帮助历史记录：' + JSON.stringify(res.data))
    }
  },
  // 清除历史记录
  clearHistory(){
    this.setData({
      history: []
    })
    this.deleteHistoryByUser()
  },
  // TODO: 刷新算法推荐
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
  //切换bar
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //全局变量
    app.globalData.currentTab = e.currentTarget.dataset.idx;
    // 刷新历史记录
    this.getSearchHistory()
    // 刷新搜索结果
    if(this.data.currentTab == 0){
      this.searchSH(this.data.keyWord)
    }
    else{
      this.searchRH(this.data.keyWord)
    }
    // TODO: 刷新算法推荐
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
  //跳转出选择栏
  Popup(e){
    var that = this 
    that.setData({
      now_state:true
    })
    this.getTabBar().setData({
      show: false,
    });
    console.log(that.data.now_state);
  },
   //点击背景触发的事件
   hideModal(e){
    // //首先创建一个动画对象（让页面不在是一个“死页面”）
    // var animation = wx.createAnimation({
    //   duration: 200,
    //   timingFunction: "linear",
    //   delay: 0
    // })
    // this.animation = animation
    //animation.translateY(300)中的translate函数是表示在y轴上平移多少px，而后面紧接着的.step表示前面动画的完成，可以开始下一个动画了
    // animation.translateY(300).step()
    // this.setData({
    //   /*这里的export函数是导出动画队列，在外面的wxml中会用到该数据，同时export方法在调用完后会清掉前面的动画操作 */
    //   animationData: animation.export(),
    // })
    /*这里的setTimeout是一个延时器，而它在这里延时了200ms，然后在执行动画 */
    // setTimeout(function () {
    //   animation.translateY(0).step()
      // this.setData({
      //   animationData: animation.export(),
      //   now_state: false,
      // })
      var that = this 
      that.setData({
        now_state:false
      })
      this.getTabBar().setData({
        show: true,
      });
      
      console.log(that.data.now_state);
      
    },
   
  // 跳转至编辑页
  toDraft1(){
    wx.navigateTo({
      url: '/community/pages/draft/draft?type=1',
    })
  },
  toDraft2(){
    wx.navigateTo({
      url: '/community/pages/draft/draft?type=0',
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
      forumRenderHelp: resData,
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
    setTimeout( () => this.setData({
      isShowSkeleton: false,
    }), 500)
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