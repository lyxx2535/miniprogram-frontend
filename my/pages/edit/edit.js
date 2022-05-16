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
        '地理与海洋科学学院',
        '大气科学学院',
        '生命科学学院',
        '医学院',
        '工程管理学院',
        '匡亚明学院',
        '海外教育学院',
        '建筑与城市规划',
        '马克思主义学院',
        '艺术学院',
        '金陵学院'
      ],
      major: [
        ['秉文书院', '行知书院', '有训书院', '安邦书院', '毓琇书院', '开甲书院'],
        ['汉语言文学', '文艺学', '艺术学理论', '中国古典文献学', '中国古代文学', '戏剧戏曲文学', '比较文学与世界文学', '中国现当代文学', '汉语言文字学', '语言学及应用语言学', '汉语言文学（古文文字方向）强基班'],
        ['中国历史系', '世界历史系', '考古工程系'],
        ['马克思主义哲学', '中国哲学', '外国哲学', '逻辑学', '伦理学', '宗教学', '科学技术哲学'],
        ['广播电影电视系', '应用传播系', '新闻与新媒体系'],
        ['法学'],
        ['经济学系', '国际经济贸易系', '金融与保险学系', '产业经济学系', '工商管理系', '会计学系', '营销与电子商务系', '人力资源管理学系'],
        ['英语','法语','德语','俄语','日语','西班牙语','朝鲜语'],
        ['政治学与行政学','行政管理','劳动与社会保障'],
        ['国际政治','外交与国际事务'],
        ['信息管理与信息系统','图书馆学','档案学','编辑出版学'],
        ['社会学','心理学','社会工作与社会政策',],
        ['数学与应用数学','信息与计算科学','统计学'],
        ['物理学','电子科学与工程','现代工程与应用科学'],
        ['天文学','空间科学和技术'],
        ['化学科学','化学生物学','应用化学科学与工程','化学基础学科拔尖班'],//化学化工学院
        ['计算机科学与技术','计算机（计算机与金融工程方向）','信息与计算科学（强基计划）','计算机科学与技术（拔尖计划）'],//计算机科学与技术系
        ['软件工程'],//软件学院
        ['人工智能'],//人工智能学院
        ['电子信息科学与技术','通信工程','微电子科学与工程','集成电路设计与集成系统'],//电子科学与工程学院
        ['材料科学与工程系','光电信息科学与工程','生物医学工程系','能源科学与工程系'],//现代工程与应用科学学院
        ['环境科学','环境科学与工程类（环境与健康实验班）','环境科学（环规）','环境工程'],//环境学院
        ['地质学','生物演化与环境国际班','地球物理','地球化学','水文与水资源工程','地下水科学与工程','地质工程'],//地球科学与工程学院
        ['自然地理学系','国土资源与旅游学系','地理信息科学系','海岸海洋科学系'],//地理与海洋科学学院
        ['大气科学','应用气象学'],
        ['生物科学','生物技术','生态学'],
        ['临床医学（八年制）','临床医学（5+3一体化）','口腔医学（五年制）'],
        ['工业工程','金融工程','自动化'],
        ['大理科强化班'],
        ['汉语言系','对外汉语系'],
        ['建筑系','城市与区域规划系'],
        ['马克思主义理论学科'],
        ['艺术理论与创意系','美术与设计系'],
        ['传媒学院','商学院','外国语学院','信息科学与工程学院','城市与土木工程学院','化学与生命科学学院','艺术学院']
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