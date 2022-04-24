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
          weight:300,
          selectedWeight:500,
          backgroundColor:"transport",
          list:[
            {
            iconPath:IMG1.HESUAN,
            selectedIconPath:IMG1.HESUAN_SELECTED,
            iconPath:IMG1.HESUAN_SELECTED,
            pagePath:"/nucleic-acid/pages/index_NA/index_NA",
            text:"核酸"
          },
          {
            iconPath:IMG1.IHELP,
            selectedIconPath:IMG1.IHELP_SELECTED,
            pagePath:"/community/pages/community/community",
            text:"帮助"
          },
          {
            iconPath:IMG1.MSG,
            selectedIconPath:IMG1.MSG_SELECTED,
            pagePath:"/chat/pages/userList/userList",
            text:"消息"
          },
          {
            iconPath:IMG1.MY,
            selectedIconPath:IMG1.MY_SELECTED,
            pagePath:"/pages/index/index",
            text:"我的"
          },
          ]
        }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchPage (e) {
      // //data为接受到的参数
      // const data = e.currentTarget.dataset;
      //取出参数中的path作为路由跳转目标的目标地址
      // wx.switchTab({url: data.pagePath});
      //记录选中的index
      console.log(e.currentTarget.dataset.url)
      // console.log('index: ' + e.currentTarget.dataset.index)
      // this.setData({tabIndex: e.currentTarget.dataset.index});
      const _url = e.currentTarget.dataset.url
      this.setData({
        tabIndex: e.currentTarget.dataset.index
      })
      wx.redirectTo({
        url: _url
      })
    }
  }
})