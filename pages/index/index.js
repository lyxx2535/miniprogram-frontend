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
    async getAccessToken(){
      const res = await api._get_access_token();
      if(res.data.data.length == 0){
        console.log('错误：后端返回数据为空！返回结果为：' + JSON.stringify(res.data))
      }
      else{
        wx.setStorageSync('access_token', JSON.parse(res.data.data).access_token)
        console.log('access_token: ' + wx.getStorageSync('access_token'))
      }
    },
    async add_remind(_data){
      const res = await api._add_remind(_data);
      console.log(res);
    },
    // 发送服务消息
    testMsg(){
      wx.requestSubscribeMessage({
        tmplIds: [TEMPLATE_ID],
        success:res=>{
          console.log(res)
          // 准备请求参数
          var _data = {
            "access_token": wx.getStorageSync('access_token'),
            "data": {
              // MessageVO
              "thing1": {
                "value" : "核酸检测提醒"
              },
              "time3":{
                "value" :  "某个时间"
              },
              "thing4":{
                "value" : "fzz"
              },
              "thing5": {
                "value" : "备注"
              } 
            },
            "executeTime": "2022-04-26 11:46:45",
            "template_id": TEMPLATE_ID,  //模板id，在微信后台拿
            "touser": wx.getStorageSync('openid'),  //需要提前获取
          }
          // 请求服务端
          this.add_remind(_data);
        }
      })
    },
    async getNucleicInfo(){
      const res = await api._get_nucleic_inform();
      console.log(res)
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
