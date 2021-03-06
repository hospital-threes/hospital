//var li=[];
var index = 0;
var app = getApp()
Page({
  data: {
    list: [],
    id: '',
    checkId: ''
  },
  //添加就诊人信息
  addAddre: function(e) {
    wx.navigateTo({
      url: '../addinformation/addinformation'
    })
  },
  //修改就诊人默认状态
  toModifyAddre: function(e) {
    wx.navigateTo({
      url: '../updateinformation/updateinformation?id=' + e.currentTarget.dataset.id
    })
  },

  //改变默认选中
  toCleanOrder: function(e) {
    var that = this

    var li = this.data.list;

    for (var i = 0; i < li.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        li[e.currentTarget.dataset.index].image = "/images/my_images/check.png"
        that.setData({
          checkId: li[e.currentTarget.dataset.index].id
        })
        app.globalData.patientInfo = li[e.currentTarget.dataset.index]
      } else {
        li[i].image = "/images/my_images/uncheck.png"
      }
    }
    wx.request({
      url: 'http://localhost:8081/personalCenter/UpdateMoren',
      data: {
        'patientid': that.data.checkId,
        'userId': app.globalData.userId
      },
      success(res) {
        if (res.data == true) {
          //用onLoad周期方法重新加载，实现当前页面的刷新
          that.onLoad()
        }
      }
    })
    this.setData({
      list: li
    })
  },

  onLoad: function(options) {

    var userId = getApp().globalData.userId;
    var that = this;
    wx.request({
      url: 'http://localhost:8081/personalCenter/selectPatient',
      data: {
        'userId': userId,
      },
      success(res) {
        var patient = res.data;

        for (var i = 0; i < patient.length; i++) {
          if (patient[i].isDefault == 0) {
            patient[i].image = "/images/my_images/check.png"
            that.setData({
              checkId: patient[i].id
            })
          } else {
            patient[i].image = "/images/my_images/uncheck.png"
          }
        }
        that.setData({
          list: patient
        })

      }
    })
  },
  onShow() { //返回显示页面状态函数
    //错误处理
    this.onLoad() //再次加载，实现返回上一页页面刷新
    //正确方法
    //只执行获取地址的方法，来进行局部刷新
  }
})