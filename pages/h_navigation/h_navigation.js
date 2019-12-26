// pages/treatment_guide/treatment_guide.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.hospitalInfo)
    //从index传来的
    let latitude = app.globalData.hospitalInfo.latitude;
    let longitude = app.globalData.hospitalInfo.longitude
    var hospitalName = app.globalData.hospitalInfo.hospitalName
    let plugin = requirePlugin('routePlan');
    let key ='HSSBZ-J72C6-Z2XSH-EMTQF-KBYN5-CAFJI';  //使用在腾讯位置服务申请的key
    let referer = 'hospital';   //调用插件的app的名称
    //let table_id= "Ck4CYItaBbXTR1ZzyMpfBEavdv5lrYC";
    let endPoint = JSON.stringify({  //终点
      'name': hospitalName,
      'latitude': latitude,
      'longitude': longitude
    });
    wx.redirectTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },


})