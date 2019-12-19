var flag = false;
Page({
  data: {
    index: "0",
    patient:'',
    id:''
  },
  onLoad: function (options) {
    var that=this
    //根据id查询就诊人信息
    wx.request({
      url: 'http://localhost:8080/user/getPatientById',
      data: {
        'id': options.id,
      },
      success(res) {
        that.setData({
          patient:res.data,
          id:res.data.id
        })

      }
    })
    
  
  },


  areaPickerBindchange: function (e) {
    this.setData({
      areaValue: e.detail.value
    })
  },
  addrePickerBindchange: function (e) {
    this.setData({
      addreValue: e.detail.value
    })
  },
  //点击删除就诊人
  delete: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除该就诊人吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:8080/user/deletePatient',
            data: {
              'id': that.data.id,
            },
            success(res) {
              wx.navigateBack({
                delta: 1
              })
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  
  //修改就诊人信息
  formSubmit: function (e) {
    console.log(this.data.id)
    var that = this;
    wx.request({
      url: 'http://localhost:8080/user/updatePatient',
      
      data: {
        'id': this.data.id,
        'patientName': e.detail.value.patientName,
        'patientTel': e.detail.value.patientTel,
        'patientArea': e.detail.value.patientArea,
        'patientAddress': e.detail.value.patientAddress,
        'patientIdcard': e.detail.value.patientIdcard,
        'patientHealthcarecardnumber': e.detail.value.patientHealthcarecardnumber,
      },
      success(res) {
        if (res.data==true){
          //回到上一级页面
          wx.navigateBack({
            delta: 1
          })

        }
      }
    })
  },
  //取消修改
  cancel: function () {
    wx.navigateBack({
      delta: 1
    })

  },

})