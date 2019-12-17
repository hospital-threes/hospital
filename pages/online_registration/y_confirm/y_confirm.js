// pages/y_confirm/y_confirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

// 点击支付后跳转页面
  yuyuesucessafter: function (event) {

    wx.navigateTo({

      url: "/pages/online_registration/y_sucess_after/y_sucess_after"

    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        if (res.confirm) {
          console.log('再次预约')
          wx.reLaunch({
            url: '/pages/online_registration/y_time/y_time'//调回预约页面（支付失败弹出模态框---预加载）
          })
        } else if (res.cancel) {
          console.log('不预约了')
          wx.reLaunch({
            url: '/pages/online_registration/y_time/y_time'//调回预约页面（支付失败弹出模态框---预加载）
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

  }
})