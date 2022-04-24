import * as IMG1 from '../enum/imageUrl'
Component({
  /**
   * 组件的初始数据
   */
  data: {
        selected: 0, // 选中的页面
        tabBar:{
          custom:true,
          weight:300,
          selectedWeight:500,
          backgroundColor:"transport",
          list:[
            {
            iconPath: IMG1.HESUAN,
            selectedIconPath: IMG1.HESUAN_SELECTED,
            pagePath: "/pages/index_NA/index_NA",
            text: "核酸"
          },
          {
            iconPath: IMG1.IHELP,
            selectedIconPath: IMG1.IHELP_SELECTED,
            pagePath: "/pages/community/community",
            text: "帮助"
          },
          {
            iconPath: IMG1.MSG,
            selectedIconPath: IMG1.MSG_SELECTED,
            pagePath: "/pages/userList/userList",
            text: "消息"
          },
          {
            iconPath: IMG1.MY,
            selectedIconPath: IMG1.MY_SELECTED,
            pagePath: "/pages/my/my",
            text: "我的"
          },
          ]
        }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchPage (e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })

      // this.setData({tabIndex: e.currentTarget.dataset.index});
      // const _url = e.currentTarget.dataset.url

      // wx.redirectTo({
      //   url: _url
      // })
    }
  }
})