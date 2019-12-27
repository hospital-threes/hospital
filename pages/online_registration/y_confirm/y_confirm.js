// pages/y_confirm/y_confirm.js
Page({

  /**
  * 页面的初始数据
  */

  data: {
    // 初始显示时间
    countDownDay: 10,
    countDownHour: 10,
    countDownMinute: 10,
    countDownSecond: 10,

  },

  radioChange: function (e) {
    var str = null;
    for (var value of this.data.items) {
      if (value.name === e.detail.value) {
        str = value.value;
        console.log(str);
        break;
      }
    }
    this.setData({ radioStr: str });
  }
  ,

  radioChange: function (e) {
    var str = null;
    for (var value of this.data.items) {
      if (value.name === e.detail.value) {
        str = value.value;
        console.log(str);
        break;
      }
    }
    this.setData({ radioStr: str });
  }
,

// 点击支付后跳转页面
  yuyuesucessafter: function (event) {
    //添加预约表---支付成功（支付方式，支付时间）
    var zhifuname= wx.getStorageSync("zhifuname")  
    var orderId = wx.getStorageSync("orderId")  
    console.log(zhifuname+"=============");

    wx.request({
      url: 'http://localhost:8081/doctor/addReservationTablePay?priceType=' + zhifuname + '&orderId=' + orderId+'',//自己请求的服务器的地址
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) {
        wx.navigateTo({
          url: "/pages/online_registration/y_sucess_after/y_sucess_after"
        })
      }
    })
 

  },



  radioChang2: function (e) {
    var that = this;
    var zhifuname = e.detail.value;
    console.log('radio发生change事件，携带value值为', zhifuname)
    //存入支付名
    wx.setStorageSync('zhifuname', zhifuname);

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var price = wx.getStorageSync('price')
    var orderId = wx.getStorageSync('orderId')
   
    var that = this;
    wx.request({
      url: 'http://localhost:8081/doctor/selectZhifuStyle',//自己请求的服务器的地址
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) {

        that.setData({
          zhifus: req.data
        })

      }
    })

this.setData({
  pricem: price,
  orderId: orderId

})

    that.startTimer(900);
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

 //支付失败返回按钮弹出模态框
  modalcnt: function () {
    wx.showModal({
      title: '提示',
      content: '支付失败,此次预约订单将自动删除',
      success: function (res) {
        if (res.cancel) {
          console.log('再次预约')
          wx.reLaunch({
            url: '/pages/online_registration/online_registration'//调回预约页面（支付失败弹出模态框---预加载）
          })
        } else if (res.confirm) {
          console.log('不预约了')
  
          var orderId = wx.getStorageSync('orderId')
          //删除订单（根据唯一预约订单号）
          wx.request({
            url: 'http://localhost:8081/doctor/deleteOrder?orderId='+orderId+'',//自己请求的服务器的地址
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (req) {
                 console.log('订单删除成功！！！！！！');
              wx.reLaunch({
                url: '/pages/online_registration/online_registration'//调回预约页面（支付失败弹出模态框---预加载）
              })
            }
          })



        
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {//左上角返回判断
    //先弹出模态框
    this.modalcnt();
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
  //倒计时
  startTimer: function (currentstartTimer) {

    //注意点3: 清除定时器 为了保证每次只有一个定时器，和下拉刷新 配合，否则会导致 计时数据跳动，因为创建了多个定时器。
    clearInterval(interval);
    interval = setInterval(function () {

      // 秒数
      var second = currentstartTimer;
      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;

      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      console.log("--------" + currentstartTimer)
      if (currentstartTimer == 0) {
        clearInterval(interval);
        wx.redirectTo({
          url: "../appointment/appointment",
        })
      }
      currentstartTimer--;
    }.bind(this), 1000);
  }
})