// pages/jianchaXianging/jianchaXianging.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 检查报告就诊人和信息详情页面回显
  jiuzenren: function (options) {
    console.log(options.reportId);
    var reportId = options.reportId;
    var that = this;
    wx.request({
      url: 'http://localhost:8081/Xingqing?id=2&reportId=' + reportId + '',//自己请求的服务器的地址
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) {
        that.setData({
          personX: req.data
        })

      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      reportId: options.reportId,//reportId前后保持一致，获取动态参数
    })

    this.jiuzenren(options);


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