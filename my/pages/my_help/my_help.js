// my/pages/my_help/my_help.js
import * as IMG from '../../../enum/imageUrl'
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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