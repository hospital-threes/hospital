Page({
  /**
   * 页面的初始数据
   */
  data: {
    price: '',
    radiodit:'',
    jzk:'',
    medicalcardBalance:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.money+"op")   // e.id 即为要获取的参数值
    console.log(options.patientMedical + "p")
    console.log(options.jzk+"jck")
    var that = this;
    that.setData({
      price: options.money,
      jzk:options.jzk,
      medicalcardBalance: options.medicalcard,
      id:options.id
    })
    // //获取当前时间戳  
    // var timestamp = Date.parse(new Date());
    // timestamp = timestamp / 1000;
    // console.log("当前时间戳为：" + timestamp);

    // //获取当前时间  
    // var n = timestamp * 1000;
    // var date = new Date(n);
    // //年  
    // var Y = date.getFullYear();
    // //月  
    // var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    // //日  
    // var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    // //时  
    // var h = date.getHours();
    // //分  
    // var m = date.getMinutes();
    // //秒  
    // var s = date.getSeconds();




    // //转换为时间格式字符串  
    // console.log(date.toDateString());

    // console.log(date.toGMTString());

    // console.log(date.toISOString());

    // console.log(date.toJSON());

    // console.log(date.toLocaleDateString());

    // console.log(date.toLocaleString()+"asdasd");

    // console.log(date.toLocaleTimeString());

    // console.log(date.toString());

    // console.log(date.toTimeString());

    // console.log(date.toUTCString());
    // console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);

    
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
    wx.showModal({
      title: '支付',
      content: '确定要取消支付吗',
      success(res) {//弹出成功之后
        if (res.confirm) {//用户点击了确认之后
          console.log('用户点击了确定')
        } else if (res.cancel) {//用户点击了取消之后
          console.log('用户点击取消')
          url: '/pages/index/index'
        }
      }
    })
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
    console.log("1")
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },

  payment: function () {
    var that = this;
    var ss = that.data.price;
    var medicalcardBalance = that.data.medicalcardBalance;
    var price= that.data.price;
    var aa = medicalcardBalance + price;
    var id = that.data.id;
    console.log(aa+"aa");
   
    wx.request({
      url: 'http://localhost:8081/rechargeMedicalCard/UpdataMedical',
      data:{
        id:id,
        price: price
      },
    success: function (res) {
    // 要使用相对路径
        wx.navigateTo({
        url:'/pages/recharge_medical_card/recharge_medical_card_two/recharge_medical_card_two'
        })
        
      }
    })
    

  },
  radiodit: function (e) {
    var value = e.currentTarget.id;
    console.log(e.currentTarget.id+"选项")
    this.setData({
      radiodit: value
    })
  },
})