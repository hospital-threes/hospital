Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    list: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id

    })
    var id = options.id;
    console.log(options.id + "asds")
    console.log(id + "xxx")
    this.hdynamicszi(id);
  },

  hdynamicszi(id) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: 'http://localhost:8081/hospitalIntroduce/SelectArticleInfoAll?id='+id,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
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
            list: list
          })
          console.log(res)
          wx.hideToast()
        }
      }
    })
  }
})