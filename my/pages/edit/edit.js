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
    nameRule:[{
      required: true
        },{
      type: 'text',
      min: 2,
      max: 5,
      message: "长度在2-5之间"
    }], // 输入规则
    show:[false, false, false, false, false],//控制下拉列表的显示隐藏，false隐藏、true显示
    select:{
      school: ['南京大学'],
      insititute: ['软件学院'],
      major: ['软件工程'],
      grade: ['2018本', '2019本', '2020本', '2021本'],
      sex: ['男', '女']
    },//下拉列表的数据
    index:[0, 0, 0, 0, 0], // 控制下拉列表的下标
  },
  // 获取用户信息
  async getUserInfo(){
    const res = await api._get_user_info()
    console.log(res.data)
    if(res.data.code == 200){
      this.setData({
        userInfo: res.data.data
      })
      setTimeout( () => this.setData({
        isShowSkeleton: false,
      }), 500)
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
    console.log(e.currentTarget.dataset.index)
    this.data.index[Index] = e.currentTarget.dataset.index
    this.data.show[Index] = !this.data.show[Index]
    this.setData({
      index: this.data.index,
      show: this.data.show
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    this.getUserInfo()
  },
})