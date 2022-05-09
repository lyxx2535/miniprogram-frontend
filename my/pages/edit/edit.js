// my/pages/edit/edit.js
import * as api from '../../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationTitle: '设置个人信息',
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
  // 获取用户信息
  async getUserInfo(){
    const res = await api._get_user_info()
    console.log(res.data)
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
  // 保存输入框内容
  saveContent(e){
    this.data.userInfo.name = e.detail.value;
    this.setData({
      userInfo: this.data.userInfo,
      isEdit: true
    })
  },
  // 点击保存修改按钮
  async updateInfo(){
    if(!this.data.isEdit){
      wx.showToast({
        title: '您尚未进行修改, 无法保存',
        icon: 'none',
        duration: 1000
      })
    }
    else{
      if(this.data.isChoose[0]){
        this.data.userInfo.school = this.data.select.school[this.data.index[0]]
      }
      if(this.data.isChoose[1]){
        this.data.userInfo.institute = this.data.select.institute[this.data.index[1]]
      }
      if(this.data.isChoose[2]){
        this.data.userInfo.major = this.data.select.major[this.data.instituteIndex][this.data.index[2]]
      }
      if(this.data.isChoose[3]){
        this.data.userInfo.grade = this.data.select.grade[this.data.index[3]]
      }
      if(this.data.isChoose[4]){
        this.data.userInfo.gender = this.data.select.sex[this.data.index[4]]
      }
      console.log(this.data.userInfo)
      const res = await api._update_userInfo(this.data.userInfo);
      wx.setStorageSync('userInfo', this.data.userInfo) // 更新userInfo
      console.log(res.data)
      wx.showToast({
        title: '已成功修改',
        duration: 1000
      })
    }
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
    let Index = Number(e.currentTarget.dataset.type);//获取点击的下拉列表的下标\
    this.data.index[Index] = e.currentTarget.dataset.index
    if(Index == 1){ // 如果选择的是院系，渲染对应的专业列表
      this.setData({
        instituteIndex: e.currentTarget.dataset.index
      })
    }
    this.data.show[Index] = !this.data.show[Index]
    this.data.isChoose[Index] = true
    this.setData({
      index: this.data.index,
      show: this.data.show,
      isChoose: this.data.isChoose,
      isEdit: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserInfo()
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