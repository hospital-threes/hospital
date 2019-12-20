// pages/personal_center/personal_center.js
var e = require("../../utils/util.js"), time = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    defaultAvatarUrl: "/images/my_images/default_avatar.png",
    patientName:'',
    patientTel: '',
    presentCount: 0,
    practiceday: '',
   
    practicetime: "",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
  },

  onLoad: function (options) {
    //判断用户登录信息
    var userId = app.globalData.userId;
    var that = this;
    
    if (userId == null) {
      wx.navigateTo({
        url: '/pages/personal_center/personal_login/personal_login?yemiancode=personal_center',
      })
    } else {
      wx.request({
        url: 'http://localhost:8081/personalCenter/getDefaultPatient?userId='+userId,
        method: 'post',
        header: {
          'content-type': 'application/getDefaultPatient' // 默认值
        },
        success: function (data) {

          app.globalData.patientInfo = data.data;
          
          that.setData({
            patientName: data.data.patientName,
            patientTel: data.data.patientTel
          })
        }
      })
    }
  },

  onReady: function () {
    
  },
  openPage: function (a) {
    
  },
  joinVip: function () { //加入VIP
    
  },
  chooseGeren: function () {
    
  },
  changeView: function () {
    
  },
  sign_in: function () {
    
  },
  onPullDownRefresh() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    
  }
})