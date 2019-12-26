// pages/treatment_guide/treatment_guide.js
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
    this.hdynamics();
  },
  hdynamics() {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;

    wx.request({
      url: 'http://localhost:8081/hospitalIntroduce/SelectNews?articleType=' + 1 + '&hospitalId=' + 1,
      method: 'post',
      header: {
        'content-type': 'application/SelectNews' // 默认值
      },
      success: function (res) {
        var list = res.data;
        if (list == null) {
          wx.showToast({
            title: 'ErrorMessage',
            icon: 'false',   //图标
            duration: 1500  //提示的延迟的时间
          })
        } else {
          that.setData({
            list: list
          })
          console.log(res)
          wx.hideToast()
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

  }
})