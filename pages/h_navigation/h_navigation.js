// pages/treatment_guide/treatment_guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    hospitalName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从index传来的
    let latitude = options.latitude
    let longitude = options.longitude
    var hospitalName = options.hospitalName

    this.setData({
      latitude: latitude,
      longitude: longitude,
      hospitalName: hospitalName
    })
    console.log(longitude + "222")
    console.log(latitude + "qweqwe")
    console.log(hospitalName + "qweqwe")
    let plugin = requirePlugin('routePlan');
    let key = '23NBZ-ANPCW-QRWRU-RZOEM-RECR3-FGFJX';  //使用在腾讯位置服务申请的key
    let referer = 'hospital';   //调用插件的app的名称
    //let table_id= "Ck4CYItaBbXTR1ZzyMpfBEavdv5lrYC";
    let endPoint = JSON.stringify({  //终点
      'name': hospitalName,
      'latitude': latitude,
      'longitude': longitude
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },


})