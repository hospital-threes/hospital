// pages/index10/index10.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.oId,
    })
    var id = options.oId
    this.selectone(id);
  },
  selectone(id) {
    var that = this;
    wx.request({
      url: 'http://localhost:8081/rechargeMedicalCard/SelectIdOne?id=' + id,
      method: 'post',
      header: {
        'content-type': 'application/id' // 默认值
      },
      success: function (res) {
        var list = res.data;
        if (list == null) {

        } else {
          that.setData({
            list: list,
          })
        }
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

  },
  return_home: function () {
    // 要使用相对路径
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})