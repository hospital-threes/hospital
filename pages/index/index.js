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
    list: '',
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
      url: 'http://localhost:8081/index/SelectHos?hospitalId=1',
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
          wx.hideToast()
        }
      }
    })
  },
  tiaozhuanyemian(event){//点击图片跳转页面

    // 页面跳转判断值 判断想要跳转什么页面
    var yemiancode = event.currentTarget.dataset['yemiancode'];
    
    //判断用户登录信息
    var userinfo = getApp().globalData.userinfo;
    if (userinfo == null) {
      wx.navigateTo({
        url: '/pages/personal_center/personal_login/personal_login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/' + yemiancode + '/' + yemiancode + '?hospitalId=1',
      })
    }
  }
  
})