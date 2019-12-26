//index.js  
//获取应用实例  
var app = getApp()
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    noAnswer: '',
    yesAnswer: ''
  },
  onLoad: function () {
    var that = this;
    var patientId = getApp().globalData.patientId;
    wx.request({
      url: 'http://localhost:8081/personalCenter/getOnlineOrder',
      data: ({
        'patientId': patientId,
      })
      ,
      success(res) {
        var orderList = res.data;
        var array1 = [];
        var array2 = [];
        if (orderList != null) {
          for (var i = 0; i < orderList.length; i++) {
            if (orderList[i].paymentStatus == 0) {
              if (orderList[i].price == null) {
                orderList[i].payStatus = '免费'
              } else {
                orderList[i].payStatus = '已支付'
              }
            } else if (orderList[i].paymentStatus == 1) {
              orderList[i].payStatus = '待支付'
            } else if (orderList[i].paymentStatus == 2) {
              orderList[i].payStatus = '已退款'
            }
            if (orderList[i].status == 1) {
              array1.push(orderList[i])
            } else {
              array2.push(orderList[i])
            }
          }
          that.setData({
            noAnswer: array1,
            yesAnswer: array2
          })

        }
      }
    })

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  //展示详情
  toShowDetail: function (e) {
    //未支付跳转支付页面
    console.log("paymentStatus", e.currentTarget.dataset)
    if (e.currentTarget.dataset.paymentstatus == '1') {
      wx.navigateTo({
        url: '../payonlineorder/payonlineorder?id=' + e.currentTarget.dataset.id
      })
    } else {
      //已支付跳转线上咨询详情
      wx.navigateTo({
        url: '../onlineanswerdetail/onlineanswerdetail?id=' + e.currentTarget.dataset.id
      })
    }

  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

}) 