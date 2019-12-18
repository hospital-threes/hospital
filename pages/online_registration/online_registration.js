// pages/appointment/appointment.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */



  data: {
    flag: 0,
    currentTab: 0
  },
  switchNav: function (e) {
    var that = this;
    var deptId = e.currentTarget.dataset.bookId
    wx.request({
      url: 'http://localhost:8081/doctor/appointment',//自己请求的服务器的地址
      data:{
        deptId: deptId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) {
        console.log(req.data)
    

        that.setData({
            pp:req.data,
        })
      }
    })


    
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({
        currentTab: id
      });
    }
    page.setData({
      flag: id
    });
  },
  catchTouchMove: function (res) {
    return false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var deptId=1;
    wx.request({
      url: 'http://localhost:8081/doctor/appointment',//自己请求的服务器的地址
      data: {
        deptId:deptId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) {
        that.setData({
          pp: req.data
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