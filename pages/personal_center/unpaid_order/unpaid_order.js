// pages/person_center/unpaid_order/unpaid_order.js
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    patientName: '',
    patientMedicalCardNumber: '',
    list1: [],
    list2: [],
    list3: [],
    list4: []
  },
  /**
   * 预约挂号
   */
  getReservationIsNotPaid() {
    var that = this;
    wx.request({
      url: 'http://localhost:8081/personalCenter/getReservationIsNotPaid',
      method: 'post',
      data: {
        'patientId': app.patientInfo.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data != null) {
          that.setData({

            list1: res.data
          })
        } else {
          wx.showToast({
            title: res.data.data,
            icon: 'none',   //图标
            duration: 1500  //提示的延迟的时间
          })
        }
      }
    })

  },
  /**
   * 在线咨询
   */
  getOnlineconsultationIsNotPaid() {
    var that = this;
    wx.request({
      url: 'http://localhost:8081/personalCenter/getOnlineconsultationIsNotPaid',
      method: 'post',
      data: {
        'patientId': app.patientInfo.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data != null) {
          that.setData({
            list2: res.data
          })
        } else {
          wx.showToast({
            title: res.data.data,
            icon: 'none',   //图标
            duration: 1500  //提示的延迟的时间
          })
        }
      }
    })
  },
  /**
   * 门诊缴费
   */
  getOutpatientpayment() {
    var that = this;
    wx.request({
      url: 'http://localhost:8081/personalCenter/getOutpatientpayment',
      method: 'post',
      data: {
        'patientId': app.patientInfo.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data != null) {
          that.setData({
            list3: res.data
          })
        } else {
          wx.showToast({
            title: res.data.data,
            icon: 'none',   //图标
            duration: 1500  //提示的延迟的时间
          })
        }
      }
    })
  },
  /**
   * 就诊卡充值
   */
  getPatientrechargeIsNotPaid() {
    var that = this;
    wx.request({
      url: 'http://localhost:8081/personalCenter/getPatientrechargeIsNotPaid',
      method: 'post',
      data: {
        'patientId': app.patientInfo.id,
        'status': 0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data != null) {
          that.setData({
            list4: res.data
          })
        } else {
          wx.showToast({
            title: res.data.data,
            icon: 'none',   //图标
            duration: 1500  //提示的延迟的时间
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var patientInfo = app.patientInfo
    this.setData({
      patientName: patientInfo.patientName,
      patientHealthcarecardnumber: patientInfo.patientHealthcarecardnumber
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
    //预约挂号
    this.getReservationIsNotPaid();
    //在线咨询
    this.getOnlineconsultationIsNotPaid();
    //门诊缴费
    this.getOutpatientpayment();
    //就诊卡充值
    this.getPatientrechargeIsNotPaid();
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