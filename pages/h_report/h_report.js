// pages/jiancha/jiancha.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    patientName: '',
    patientMedicalcardnumber: ''
  },

  //检查报告回显
  houduanRequest: function () {
    var that = this;
    var patientId = app.globalData.patientInfo.id
    var that = this;
    wx.request({
      url: 'http://localhost:8081/hospitalReport/seclectReport',//自己请求的服务器的地址
      method: 'GET',
      data:{
        id:patientId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) {
        that.setData({
          reports: req.data
        })

      }
    })
  },
  // 检查报告就诊人信息
  jiuzenren: function () {
    var that = this;
    var patientInfo = app.globalData.patientInfo
    that.setData({
      patientName: patientInfo.patientName,
      patientMedicalcardnumber: patientInfo.patientMedicalcardnumber
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
    this.jiuzenren();
    this.houduanRequest();
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