// pages/personal_center/personal_login/personal_login.js

Page({
  data: {
    phone: '',
    pCode: '',
    getSmsCodeBtnTxt: "获取验证码",
    getSmsCodeBtnColor: "#4ecfcf",
    smsCodeDisabled: false,
    yemiancode:''
  },


  // 获取输入账号 
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })

  },
  //监事页面加载函数
  onLoad: function (options) {
    //医院动态新闻id
    this.setData({
      yemiancode: options.yemiancode
    })
  },
  // 获取输入验证码 
  pCodeInput: function(e) {
    this.setData({
      pCode: e.detail.value
    })

  },
  // 验证手机验证码
  checkUserName: function(phonephoneNum) {
    var phoneres = /^1(3|4|5|7|8)\d{9}$/;
    if (phoneres.test(phonephoneNum)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
  },
  // 发送手机验证码
  getpCode: function() {
    var phonephoneNum = this.data.phone;
    var that = this;
    var count = 60;
    if (this.checkUserName(phonephoneNum)) {
      wx.request({
        url: 'http://localhost:8081/personalCenter/getPhoneCode?phone=' + phonephoneNum,
        method: 'post',
        header: {
          'content-type': 'application/SelectNews' // 默认值
        },
        success: function(data) {
          var si = setInterval(function() {
            if (count > 0) {
              count--;
              that.setData({
                getSmsCodeBtnTxt: count + ' s',
                getSmsCodeBtnColor: "#999",
                smsCodeDisabled: true
              });
            } else {
              that.setData({
                getSmsCodeBtnTxt: "获取验证码",
                getSmsCodeBtnColor: "#4ecfcf",
                smsCodeDisabled: false
              });
              count = 60;
              clearInterval(si);
            }
          }, 1000);
        }
      })
    }
  },
  // 登录 
  login: function() {
    if (this.data.phone.length == 0 || this.data.pCode.length == 0) {
      wx.showToast({
        title: '用户名和验证码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      var phone = this.data.phone;
      var pCode = this.data.pCode;
      var yemiancode = this.data.yemiancode;
      // 这里修改成跳转的页面 

      wx.request({
        url: 'http://localhost:8081/personalCenter/verifyPhoneCode?phone=' + phone + '&pCode=' + pCode,
        method: 'post',
        header: {
          'content-type': 'application/SelectNews' // 默认值
        },
        success: function(data) {
          console.log(data.data);
          if (data.data.result == 'success') {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })

            //将数据存放到全局变量中
            var app = getApp()
            app.globalData.userId = data.data.userId


            if(yemiancode == ''){
              wx.switchTab({
                url: '/pages/personal_center/personal_center',
              })
            }else{
              //登录成功跳转到页面
              wx.redirectTo({
                url: '/pages/' + yemiancode + '/' + yemiancode,
              })
            }
            
            
          } else {
            wx.showToast({
              title: '验证码错误',
              icon: 'loading',
              duration: 2000
            })
          }
        }
      })
    }
  }
})