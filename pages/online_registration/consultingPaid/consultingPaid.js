// pages/consultingPaid/consultingPaid.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:1,
    consultationId:'',
    item:'',
    author:'',
    orderNum:'',
    userid:"",
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    //获取带过来的咨询表id 根据id修改对应的问题状态
    let id=options.consultationId;
    let orderNum = options.orderNum;
    console.log(options.orderNum);
    let item = JSON.parse(options.jsonStr);
    let that = this;
    that.setData({
      item: item,
      author: item.author,
      state: item.state,
      consultationId:id,
      orderNum: orderNum,
      userid: item.id
    })
  },
  submit:function(){
    let that = this;
    console.log(this.data.userid);
    console.log(this.data.orderNum);
    
    // console.log(parmas);
    //********************************************* 小测试************************************//
    //小程序调用登录接口 获取code
    wx.login({    //1
      success(res) {
        wx.showLoading({
          title: '加载中',
        })
        if (res.code) {
          var paramsData = {
            "payType": "3",
            "rechargeMoney": 0.01, //获取支付金额
            //用户id 请调用相应接口 本地只作测试处理
            "userId": "c39993421bca559c99736a67bb29c526",
            "code": res.code
          }
          //小程序请求服务器接口 start
          wx.request({    //2
            url: "http://localhost:8081/m/recharge/create",
            method: "post",
            data: paramsData,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.hideLoading();
              //预支付成功
              console.log(res.data.msg);
              //小程序调用 支付API start    
              wx.requestPayment({     //3
                timeStamp: res.data.data.timeStamp,//时间戳，从 1970 年 1 月 1 日 00:00:00 至今的秒数，即当前的时间
                nonceStr: res.data.data.nonceStr, //随机字符串，长度为32个字符以下
                package: res.data.data.package,   //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
                signType: res.data.data.signType, //签名算法  MD5
                paySign: res.data.data.paySign,    //签名 跟统一下单一致
                success: function (res) {
                  console.log(res);
                  console.log(res.errMsg);
                  
                  console.log(that);

                  let ite = that.data.item;
                  console.log(ite);
                  let str = JSON.stringify(ite);
                  wx.navigateTo({
                    url: '/pages/online_consultation/successfulPaidConsultation/successfulPaidConsultation?jsonStr=' + str,
                  })
                  //修改咨询表的支付状态
                  let id=that.data.consultationId;
                  wx.request({
                    url: 'http://localhost:8081/onlineConsultation/updateConsultationState',//自己请求的服务器的地址
                    method: 'GET',
                    data:{'id':id},
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success: function (req) {
                      var list = req.data;
                      if (list == false) {
                        wx.showToast({
                          title: 'ErrorMessage',
                          icon: 'false',   //图标
                          duration: 1500  //提示的延迟的时间
                        })
                      } else {
                        

                      }
                    }
                  })



                 
                },
                fail: function (res) {
                  that.openConfirm();
                  console.log(res);
                },
                complete: function (res) {
                  console.log(res);


                }
              })
              //小程序调用 支付API end
            }
          })
          //小程序请求服务器接口 end
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  openConfirm: function () {
    wx.showModal({
      title: '支付失败',
      content: '此提问将无法得到医生回复',
      confirmText: "重新提问",
      cancelText: "不提问了",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
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