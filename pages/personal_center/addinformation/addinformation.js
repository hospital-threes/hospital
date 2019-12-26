var index = 0;
var app = getApp();
Page({
  data:{
  
    addreValue:0,
    addreRange:['　　　　　　　　　　','长沙市芙蓉区','长沙市天心区','长沙市雨花区','长沙市开福区','长沙市岳麓区','长沙市长沙县'],
    door:"街道门牌信息",
    areaValue:0,
    areaRange:['　　','60以下','60-90','90-110','110-130','130-140','140-150','150-160','160-170','170-180','180以上']
  },
    areaPickerBindchange:function(e){
    this.setData({
      areaValue:e.detail.value
    })
  },
    addrePickerBindchange:function(e){
    this.setData({
      addreValue:e.detail.value
    })
  },
  formSubmit: function(e) {
    var warn ="";
    var that = this;
    var flag = false;
    
      flag=true;
      console.log('form发生了submit事件，携带数据为：', e.detail.value)

    var userId = app.globalData.userId;
    var patientInfo = app.globalData.patientInfo;
    var isDefault = 1;
    if (patientInfo == null){
      isDefault = 0;
    }
    wx.request({
      url: 'http://localhost:8081/personalCenter/addPatient',
      data: {
        patientAddress: e.detail.value.patientAddress,
        patientArea: e.detail.value.patientArea,
        patientHealthcarecardnumber: e.detail.value.patientHealthcarecardnumber,
        patientIdcard: e.detail.value.patientIdcard,
        patientMedicalcardnumber: e.detail.value.patientMedicalcardnumber,
        patientName: e.detail.value.patientName,
        patientTel: e.detail.value.patientTel,
        userId: userId,
        isDefault:isDefault
      },
      success(res) {
        if(res.data==true){
          wx.navigateBack({
            delta: 1
          })
        }
       
      }
    })

    
   
  },
  
  })