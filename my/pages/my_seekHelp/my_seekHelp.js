// my/pages/my_help/my_help.js
import * as IMG from '../../../enum/imageUrl'
import * as api from '../../../utils/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        QUESTION:IMG.ICON_QUESTION,
        tips:[
            {'icon':IMG.ICON_OVER_BLACK,'tip':'正在进行的帖子，右滑可变为已解决状态。'},
            {'icon':IMG.ICON_DELETE_BLACK,'tip':'已解决和未解决的帖子，可以左滑进行删除。系统默认显示一个月内的所有帖子。'},
            {'icon':IMG.ICON_REDO_BLACK,'tip':'到期未解决的帖子，左滑跳转到发布页面，修改日期即可重新发布。'},
        
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
       // 删除该条信息
       deleteMsg(e){
        console.log("delete")
    },
    // 编辑该条信息
    editMsg(e){
        console.log("edit")
    },
    // 结束该条信息
    overMsg(e){
        console.log("over")
    },
    // 获得“帮忙”信息，让“进行中”数据展示在“已截止”之前
    async getSeekHelpList(){
        const res = await api._sh_list_byUser()
        const resData = res.data.data;
        let ongoingList = []
        let endList = []
        for(let item in resData){
            switch(resData[item].finishStatus){
                case '进行中':
                    ongoingList.push(resData[item])
                    break
                default:
                    endList.push(resData[item])
                    break
            }
        }
        console.log(endList)
        this.setData({
            seekHelpList: ongoingList.concat(endList)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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