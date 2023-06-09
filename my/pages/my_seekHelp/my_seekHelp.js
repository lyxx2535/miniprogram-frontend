// my/pages/my_help/my_seekHelp.js
import * as IMG from '../../../enum/imageUrl'
import * as api from '../../../utils/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        QUESTION:IMG.ICON_QUESTION,
        tips:[
            {'icon':IMG.ICON_OVER_BLACK,'tip':'对于进行中的帖子，点该按钮可变为已解决状态。'},
            {'icon':IMG.ICON_DELETE_BLACK,'tip':'对于所有帖子，点该按钮可进行删除。系统默认显示一个月内的所有帖子。'},
            {'icon':IMG.ICON_REDO_BLACK,'tip':'对于所有帖子，点该按钮可重新进行编辑和发布。'},
        ],
        seekHelpList: [], // 当前展示的互助帖子list
        test_img: IMG.VECTOR_PIC,
        img_url: {
            solved: IMG.STATE_SOLVED,
            unsolved: IMG.STATE_UNSOLVED,
            delete: IMG.ICON_DELETE,
            over: IMG.ICON_OVER,
            redo: IMG.ICON_REDO,
          },
        clickDelete: false,
        clickOver: false,
        clickRedo: false,
        currentId: 0,
    },

    showTips: function () {
        this.setData({
            isTipsTrue: true
        })
    },

    hideTips: function () {
        this.setData({
            isTipsTrue: false
        })
    },

    storeId(e){
        const id = e.currentTarget.dataset.id;
        this.setData({
            currentId: id,
        })
    },
     // 查看帖子详情
    checkDetail(e){
        const id = e.currentTarget.dataset.id;
        console.log('查看' + id + '号帖子内容')
        // const id = 1; // 这里暂时先随便写一个值
        wx.navigateTo({
            url: '/community/pages/detail/detail?id=' + id + '&type=0',
        })
    },
    // 预览图片
    previewImg(e){
        let temp = []
        const list = e.currentTarget.dataset.list
        for(let item in list){
            temp.push(list[item].imageUrl)
        }
        const url = e.currentTarget.dataset.url
        console.log(JSON.stringify(list) + url)
        if(list.length == 0 ){
            list.push(url)
        }
        wx.previewImage({
            urls: temp,
            current: url,
            showmenu: true,
        })
    },
      // 通过按钮关闭表单
      async confirmDelete(e){
        if(e.currentTarget.dataset.close == "false"){//用户点击了确定
          await api._delete_sh_forum_byId(this.data.currentId);
          await this.getSeekHelpList();
          this.deleteMsg()//关闭页面
        }
        else{
            this.deleteMsg()
        }
    },
    // 通过按钮结束表单
    async confirmOver(e){
        if(e.currentTarget.dataset.close == "false"){//用户点击了确定，进行页面刷新
          await api._update_sh_status_byId(this.data.currentId, "已解决");
          await this.getSeekHelpList();
          this.overMsg()
         }
        else{
            this.overMsg()
        }
    },
    deleteMsg(e){
        this.setData({
            clickDelete: !this.data.clickDelete
        })
    },
    // 编辑该条信息
    editMsg(e){
        wx.navigateTo({
            url: '/community/pages/draft/draft?id=' + this.data.currentId + '&type=' + 0,
          })
    },
    // 结束该条信息
    overMsg(e){
        this.setData({
            clickOver: !this.data.clickOver
        })
    },
    // 获得“帮忙”信息，让“进行中”数据展示在“已截止”之前
    async getSeekHelpList(){
        const res = await api._sh_list_byUser()
        const resData = res.data.data;
        let list1 = [];
        let list2 = [];
        let list3 = [];
        for(let item in resData){
            switch(resData[item].finishStatus){
                case '进行中':
                    list1.push(resData[item])
                    break
                case '未解决':
                    list2.push(resData[item])
                    break
                case '已解决':
                    list3.push(resData[item])
                    break
            }
        }
        this.setData({
            seekHelpList: list1.concat(list2).concat(list3),
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad () {
        this.getSeekHelpList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let _title = "我的求助";
        wx.setNavigationBarTitle({
          title: _title,
          fail: err => {
            console.log(err)
          }
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})