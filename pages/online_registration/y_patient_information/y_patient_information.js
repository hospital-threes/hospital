// pages/y_patient_information/y_patient_information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

// 按钮--就诊人立即预约
  gotoPageyuyue1: function (event) {

    wx.navigateTo({
      //判断费用是否有值---有值跳成功支付页面---反跳支付页面
      // if(){
      //   url: '/pages/y_sucess/y_sucess'
      // }

      url: '/pages/online_registration/y_confirm/y_confirm'

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