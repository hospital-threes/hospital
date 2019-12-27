// pages/y_sucess_after/y_sucess_after.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var zhifuname = wx.getStorageSync("zhifuname")
      var orderId = wx.getStorageSync("orderId")  
      var price = wx.getStorageSync("price")
      var patientId = wx.getStorageSync("patientId")
   
      this.setData({
        zhifuname: zhifuname,
        price: price,
        orderId: orderId
      })
    var that = this;
     
      //回显支付时间
    wx.request({
      url: 'http://localhost:8081/doctor/SelectPaytime?orderId=' +orderId + '',//自己请求的服务器的地址
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) {
        that.setData({
         pay: req.data
       })
      }
    }),

   //回显就诊卡号
    wx.request({
      url: 'http://localhost:8081/doctor/SelectCardNumber?patientId=' + patientId + '',//自己请求      的服务器的地址
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (req) {
        that.setData({
          patientNumber: req.data
        })
      }
    })
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
    //先弹出模态框
    this.modalcnt1();
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