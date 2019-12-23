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
  onShow() { //返回显示页面状态函数
    //错误处理
    this.onLoad()//再次加载，实现返回上一页页面刷新
    //正确方法
    //只执行获取地址的方法，来进行局部刷新
  },
  onReady: function () {
    
  },
  openPage: function (a) {
    
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