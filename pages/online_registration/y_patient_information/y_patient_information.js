var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

// 按钮--就诊人立即预约
  gotoPageyuyue1: function (options) {
     //添加预约表接口
    var orderId = Math.floor(Math.random() * 66666 + 50);
    wx.setStorageSync('orderId', orderId);
    var userId = app.globalData.userId;
    var price = wx.getStorageSync('price')
    var patientId = wx.getStorageSync("patientId")
    var timeframeId = wx.getStorageSync("timeframeId")  
    var doctorId = getApp().globalData.doctorId
    var hospitalId= app.globalData.hospitalInfo.id;
    
    //立即预约---添加预约表
    wx.request({
      url: 'http://localhost:8081/doctor/addReservationTable?userId=' + userId + '&price=' + price + '&patientId=' + patientId + '&timeframeId=' + timeframeId + '&doctorId=' + doctorId + '&hospitalId+' + hospitalId + '&departmentId=2&orderId=' + orderId+'',//自己请求的服务器的地址
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (req) {
        console.log("添加成功！！！！！！！！！！+");

        if (price != null || price != '') {
          wx.navigateTo({
            //判断费用是否有值---有值跳成功支付页面---反跳支付页面
            url: '/pages/online_registration/y_confirm/y_confirm'
          })
        }
        else {
          wx.navigateTo({
            //判断费用是否有值---有值跳成功支付页面---反跳支付页面
            url: '/pages/online_registration/y_sucess/y_sucess'

          })
        }



      }
    })


    




    
  },


//查询就诊人回显默认的
  selectHuixiapatient: function (){
    var that=this;
    //用户id
    var userId = app.globalData.userId;
    console.log(userId + "----------------------");
    wx.request({
      url: 'http://localhost:8081/personalCenter/selectHuixiapatient?id=' + userId + '',//自己请求的服务器的地址
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) {
        that.setData({
          patientName: req.data
        })
        console.log(req.data.id + "patientId++++++++++++++++++++++++++");
        wx.setStorageSync('patientId', req.data.id);
      }
    })

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selectHuixiapatient();
    var hospitalName = app.globalData.hospitalInfo.hospitalName
    var price = wx.getStorageSync("price")
  
    this.setData({
      id:options.id,
      apptimeId: options.apptimeId,
      price: price,
      hospital: app.globalData.hospital,
      hospitalName: hospitalName
    })
    this.findtime(options);
  },
  //获取预约时间
  findtime: function (options){
    var doctorId = getApp().globalData.doctorId
    var hospital=getApp().globalData.hospital
    var that = this;
    that.setData({
      hospital: hospital
    })
    var id=options.id
    var apptimeId = options.apptimeId
    wx.request({
      url: 'http://localhost:8081/doctor/findtime',//自己请求的服务器的地址
      data: {
        id:id,
        apptimeId:apptimeId,
        doctorId: doctorId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) {
        console.log(req.data)
        that.setData({
          timeList:req.data
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