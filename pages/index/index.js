Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      './1.jpg',
      './2.jpg',
      './3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,

    // indicator-dots： 是否显示面板指示点，默认为false;
    // autoplay：是否自动切换，默认为false;
    // interval：自动切换时间间隔，默认5000ms;
    // duration: 滑动动画时长，默认为1000ms;
    list: ''

  },
  





  onLoad: function (options) {
    this.index();
  },
  index() {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;

    wx.request({
      url: 'http://localhost:8081/index/SelectHos',
      method: 'post',
      header: {
        'content-type': 'application/SelectHos' // 默认值
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