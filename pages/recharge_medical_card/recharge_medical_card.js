// pages/index7/index7.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    patientMedical:'',
    medicalcard:'',
    money: '',
    return: "<",
    statusBarHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.payment();
  },
  payment() {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
     
      url: 'http://localhost:8081/personalCenter/selectPatient?userId=' + 18,
      method: 'post',
      header: {
        'content-type': 'application/SelectNews' // 默认值
      },
      success: function (res) {
        var list = res.data;
        if (list == null) {
          wx.showToast({
            title: 'ErrorMessage',
            icon: 'false',   //图标
            duration: 1500  //提示的延迟的时间
          })
        } else {
          that.setData({
          
            list: list,
            patientMedical: list[0].patientMedicalcardnumber,
            id: list[0].id,
            medicalcard: list[0].medicalcardBalance
          })
          wx.hideToast()
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
  //点击下一步
  one_down: function () {
    var that = this;
    var jzk = '就诊卡充值';
    var money = that.data.money;
    var status='0';
    wx.request({
      url: 'http://localhost:8081/rechargeMedicalCard/InsertOrder',
      data: {
        orderName: jzk,
        status: status,
        payMoney: money
      },
      success: function (res) {
        var money = that.data.money;
        var patientMedical = that.data.patientMedical;
        var jzk = '就诊卡充值';
        var id = that.data.id;
        var medicalcard = that.data.medicalcard
        var id = that.data.list[0].id
        if (parseInt(money) > 0) {
          // 要使用相对路径 
          wx.navigateTo({
            url: '/pages/recharge_medical_card/recharge_medical_card_one/recharge_medical_card_one?money=' + money + '&patientMedical=' + patientMedical + '&jzk=' + jzk + '&medicalcard=' + medicalcard + '&id=' + id,
          })
        }
      }
    })
  },
  //修改金额
  money_update: function (e) {
    //获取当前元素id
    var value = e.currentTarget.id;
    this.setData({
      money: value
    })
  },
  inputedit: function (e) {
    var value = e.currentTarget.value;
    this.setData({
      money: value
    })
  },
  add_patient: function () {
    console.log("跳转添加就诊人页面")
  }
})