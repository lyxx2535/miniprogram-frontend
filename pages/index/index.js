// index.js
import { TEMPLATE_ID } from '../../enum/enums.js'
import * as api from '../../utils/api.js'

Page({
  data: {
    motto: '测试页面\n请在首次打开项目时点击第一个按钮\n其余按钮无需按',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
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
    async queryhelpMsg(){
      const res = await api._query_rh_forum_byId(31)
      const res2 = await api._query_sh_forum_byId(1)
      console.log(res.data)
      console.log(res2.data)
    },
    async queryForumList(){
      const res = await api._query_rh_list_byTag();
      const res2 = await api._query_sh_list_byTag();
      console.log(res.data);
      console.log(res2.data)
    },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    console.log('load index page!')
    // this.insertBook()
    // this.insertTest()
  },

})
