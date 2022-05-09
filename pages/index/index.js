// index.js
import * as api from '../../utils/api.js'
import * as IMG from '../../enum/imageUrl'

Page({
  data: {
    userInfo: {},
    //轮播图
    autoplay: true,
    interval: 5000,
    duration: 1000,
    now_state: null, // 当前卡片的状态
    userInfo: {}, // 用户信息列表
    isShowSkeleton: true, // 是否展示骨架框
    tagUrl: 'https://peng-img.oss-cn-shanghai.aliyuncs.com/wechat/my/tab_%E4%B8%8B%E6%8B%89.png',
    show:[false, false, false, false, false],//控制下拉列表的显示隐藏，false隐藏、true显示
    instituteIndex: 0,
    select:{
      school: ['南京大学'],
      institute: [
        '新生学院',
        '文学院',
        '历史学院',
        '哲学系',
        '新闻传播学院',
        '法学院',
        '商学院',
        '外国语学院',
        '政府管理学院',
        '国际关系学院',
        '信息管理学院',
        '社会学院',
        '数学系',
        '物理学院',
        '天文空间与科学学院',
        '化学化工学院',
        '计算机科学与技术系',
        '软件学院',
        '人工智能学院',
        '电子科学与工程学院',
        '现代工程与应用科学学院',
        '环境学院',
        '地球科学与工程学院',
        '大气科学学院',
        '生命科学学院',
        '医学院',
        '工程管理学院',
        '匡亚明学院',
        '海外教育学院',
        '建筑与城市规划',
        '马克思主义学院',
        '艺术学院'
      ],
      major: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        ['软件工程'],
      ],
      grade: ['2018本', '2019本', '2020本', '2021本', '2019硕', '2020硕', '2021硕'],
      sex: ['男', '女']
    },//下拉列表的数据
    index:[0, 0, 0, 0, 0], // 控制下拉列表的下标
    isChoose: [false, false, false, false, false], // 用户是否选择了该下标
    isEdit: false, // 用户是否进行了修改
  },
  onLoad: function(){
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    console.log('load index page!')
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
    if(wx.getStorageSync('isLogin')){
      this.getUserInfo()
    }
  },
  // 获取用户信息
  async getUserInfo(){
    const res = await api._get_user_info()
    if(res.data.code == 200){
      this.setData({
        userInfo: res.data.data
      })
      const institute = res.data.data.institute
      for(let item in this.data.select.institute){
        if(institute == this.data.select.institute[item]){
          this.setData({
            instituteIndex: item
          })
          break;
        }
      }
      console.log(this.data.select.institute[this.data.instituteIndex])
      setTimeout( () => this.setData({
        isShowSkeleton: false,
      }), 500)
    }
  },
  startLogin(){
    var that = this 
    that.setData({
      now_state: true,
    })
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.data.userInfo.avatarUrl = res.userInfo.avatarUrl
        this.data.userInfo.nickName = res.userInfo.nickName
        this.setData({
          userInfo: this.data.userInfo,
          hasUserInfo: true
        })
        console.log(this.data.userInfo)
        wx.setStorageSync('userInfo_wx', res.userInfo)
        this.getOpenid(); 
      }
    })
  },
  async getOpenid(){
    const response = await api._login(wx.getStorageSync('code'));
    wx.setStorageSync('session_key', response.data.session_key);
    wx.setStorageSync('openid', response.data.openid);
    this.data.userInfo.openId = response.data.openid
    this.setData({
      userInfo: this.data.userInfo,
    })
    this.getToken();
  },
  async getToken(){
    console.log(this.data.userInfo)
    const res = await api._get_token(this.data.userInfo)
    wx.setStorageSync('token', res.data.data.token)
    console.log('token: ' + wx.getStorageSync('token'));
    // 保存当前用户id
    this.getMyInfo()
    wx.setStorageSync('isLogin', true)
    wx.switchTab({
      url: '/pages/index_NA/index_NA',
    })
  },
  // 获得自己的id
  async getMyInfo(){
    const res = await api._get_user_info();
    console.log('获取我的信息：' + JSON.stringify(res.data.data));
    if (res.data.code == 200) {
      const info = res.data.data;
      wx.setStorageSync('myId', info.id)
    }
  },
  goToNA: function (options) {
    if(wx.getStorageSync('isLogin')){
      wx.switchTab({
        url: '/pages/index_NA/index_NA',
      })
    }
    else{
      wx.showToast({
        title: '请先登录哦，登录之后就可以直接从此按钮进入平台~',
        icon: 'none',
        duration: 3000
      })
    }
  },
  // 点击黑色背景触发的事件
  hideModal(e){
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(600).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        now_state: false,
      })
    }.bind(this), 200)
  },
  // 点击下拉显示框
  selectTap(e){
    this.data.show[Number(e.currentTarget.dataset.index)] = !this.data.show[Number(e.currentTarget.dataset.index)]
    this.setData({
      show: this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e){
    let Index = Number(e.currentTarget.dataset.type);//获取点击的下拉列表的下标
    this.data.index[Index] = e.currentTarget.dataset.index
    this.data.show[Index] = !this.data.show[Index]
    if(Index == 1){ // 如果选择的是院系，渲染对应的专业列表
      this.setData({
        instituteIndex: e.currentTarget.dataset.index
      })
    }
    this.data.isChoose[Index] = true
    this.setData({
      index: this.data.index,
      show: this.data.show,
      isChoose: this.data.isChoose,
    });
  },
  // 点击保存修改按钮
  saveInfo(){
    for(let item in this.data.isChoose){
      if(!this.data.isChoose[item] || !this.data.isEdit){
        wx.showToast({
          title: '您还有未填写的信息，请完成填写',
          icon: 'none',
          duration: 1000
        })
        return;
      }
    }
    this.data.userInfo.school = this.data.select.school[this.data.index[0]]
    this.data.userInfo.institute = this.data.select.institute[this.data.index[1]]
    this.data.userInfo.major = this.data.select.major[this.data.instituteIndex][this.data.index[2]]
    this.data.userInfo.grade = this.data.select.grade[this.data.index[3]]
    this.data.userInfo.gender = this.data.select.sex[this.data.index[4]]
    console.log(this.data.userInfo)
    this.getUserProfile()
  },
  // 保存输入框内容
  saveContent(e){
    this.data.userInfo.name = e.detail.value;
    this.setData({
      userInfo: this.data.userInfo,
      isEdit: true
    })
  },
})
