Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    oId:'',
    list:'',
    price:'',
    radiodit:'微信',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
    })
    var id = options.id;
    this.selectone(id);
  },

  selectone(id){
    var that = this;
    wx.request({
      url: 'http://localhost:8081/rechargeMedicalCard/SelectIdOne?id=' + id,
      method: 'post',
      header: {
        'content-type': 'application/id' // 默认值
      },
      success: function (res) {
        var list = res.data;
        if (list == null) {
        } else {
          that.setData({
            list: list,
            price:list.payMoney
          })
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
    // wx.showModal({
    //   title: '支付',
    //   content: '确定要取消支付吗',
    //   success(res) {//弹出成功之后
    //     if (res.confirm) {//用户点击了确认之后
    //       console.log('用户点击了确定')
    //     } else if (res.cancel) {//用户点击了取消之后
    //       console.log('用户点击取消')
    //       url: '/pages/index/index'
    //     }
    //   }
    // })
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
  goBack: function () {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },

  payment: function () {
    var that = this;
    var oId = that.data.id;
    var id=7;
    var price = that.data.price;
    var radiodit = that.data.radiodit;
    wx.request({
      url: 'http://localhost:8081/rechargeMedicalCard/UpdataMedical',
      data:{
        id:id,
        oId: oId,
        price: price,
        payWay: radiodit,
      },
    success: function (res) {
    // 要使用相对路径
        wx.navigateTo({
          url: '/pages/recharge_medical_card/recharge_medical_card_two/recharge_medical_card_two?oId=' + oId
        })
        
      }
    })
    

  },
  radiodit: function (e) {
    var value = e.currentTarget.id;
    this.setData({
      radiodit: value
    })
  },
})