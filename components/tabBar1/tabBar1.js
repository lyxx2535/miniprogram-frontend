import * as IMG1 from '../../enum/imageUrl'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
        tabIndex:0,
        tabBar:{
          custom:true,
          color:"#5F5F5F",
          selectedColor:"#027FF5",
          backgroundColor:"#F7F7F7",
          list:[
            {
            iconPath:IMG1.MY,
            selectedIconPath:IMG1.MY_SELECTED,
            pagePath:"pages/index/index",
            text:"我的"
          },
          {
            iconPath:IMG1.IHELP,
            selectedIconPath:IMG1.IHELP_SELECTED,
            pagePath:"pages/my/my",
            text:"帮助"
          },
        ]
        }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab (e) {
      //data为接受到的参数
      const data =e.currentTarget.dataset;
      //取出参数中的path作为路由跳转目标的目标地址
      wx.switchTab({url: data.path});
      //记录选中的index
      this.setData({tabIndex:data.index});
    }
  }
})