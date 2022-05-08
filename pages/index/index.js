// index.js
import { TEMPLATE_ID, TEST_COUNT } from '../../enum/enums.js'
import * as api from '../../utils/api.js'
import * as IMG from '../../enum/imageUrl'

Page({
  data: {
    motto: '测试页面\n请在首次打开项目时点击第一个按钮\n其余按钮无需按',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false

    //轮播图
    autoplay: true,
    interval: 5000,
    duration: 1000,

  },
    getUserProfile(e) {
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          // console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.setStorageSync('userInfo_wx', res.userInfo)
          this.getOpenid(); 
          // this.getToken();
        }
      })
    },
    async getOpenid(){
      const response = await api._login(wx.getStorageSync('code'));
      console.log(response);
      wx.setStorageSync('session_key', response.data.session_key);
      wx.setStorageSync('openid', response.data.openid);
      this.getToken();
    },
    async getToken(){
      const res = await api._get_token(wx.getStorageSync('userInfo_wx').avatarUrl,
                                       wx.getStorageSync('userInfo_wx').nickName,
                                       wx.getStorageSync('openid'),
                                       '南京大学')
      wx.setStorageSync('token', res.data.data.token)
      console.log('token: ' + wx.getStorageSync('token'));
    },
    async add_remind(_data){
      const res = await api._add_remind(_data);
      console.log(res);
    },
    async checkMsg(){
      const res = await api._check_remind();
      console.log(res.data)
    },
    async searchForum(){
      const res = await api._search_sh_by_keyWord('借')
      console.log(res.data)
    },
    // async searchHistory(){
    //   const res = await api._get_sh_search_history()
    //   console.log('求助历史记录：' + JSON.stringify(res.data))
    //   const res1 = await api._get_rh_search_history()
    //   console.log('帮助历史记录：' + JSON.stringify(res1.data))
    // },
    async searchHistory(){
      const res = await api._get_user_info()
      console.log(res.data)
    },
    async deleteForum(){
      const res = await api._delete_rh_forum_byId(128)
      const res1 = await api._delete_sh_forum_byId(115)
      console.log(res.data);
      console.log(res1.data);
    },
    async test(){
      const res = await api._rh_list_byUser()
      console.log(res.data)
    },
  onLoad: function(){
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    console.log('load index page!')
    // this.insertBook()
    // this.insertTest()

    //轮播图
    var that = this; 
    var data = {
      "datas": [
        {
          "id": 1,
          "imgurl": IMG.INDEX_NA
        },
        {
          "id": 2,
          "imgurl": IMG.INDEX_COMMUNITY
        },
        {
          "id": 3,
          "imgurl": IMG.INDEX_CHAT
        }
      ]
    }; 
    that.setData({
      lunboData: data.datas
    })
  },

  gotoNA: function (options) {
      wx.switchTab({
         url: '/pages/index_NA/index_NA',
  })  
  },

})
