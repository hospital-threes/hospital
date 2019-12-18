// pages/details/details.js
var app = getApp()

const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: true
  },

  change: function (e) {
    var that = this;
    var DataSource = that.data.DataSource;
    var row = DataSource[e.currentTarget.dataset.index];
    row.isF = !row.isF;
    that.setData({
      DataSource: DataSource,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {//动态获取参数
  
      console.log(options.id + "*********************00000");
      
      
    this.setData({
      DataSource: [
        {
          isF: true,
          content: options.cc,
        }
      ],
      //医生id
      doctorid: options.id,
      // 医生职位
      departmentName: options.deptname,
      //医生姓名
      doctorname: options.name,

    

    
//8888888888888888888888888888888888888888888888888888888888888888888888
    })
      var app = getApp();
      app.globalData.doctorId = options.id;

      
    this.huoquaddress(options);
    this.huoqutime(options);
    this.huoquadministrative(options);
    this.yuyue();
      
    
  },
  //获取预约状态
  yuyue:function(){
    var that = this;

    wx.request({
      url: 'http://localhost:8081/doctor/huoqustutas',//自己请求的服务器的地址
      data: {
        
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) {
        that.setData({
          status: req.data
        })

        wx.request({
          url: 'http://localhost:8081/doctor/huoquappointmenttime',//自己请求的服务器的地址
          data: {
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (req) {
            that.setData({
              appointmenttime: req.data
            })
          }
        })
      }
    })

    
  },
  //获取其他科室医生信息
  huoquadministrative: function (options){
    var that = this;
    var deptname = options.deptname;
    
    wx.request({
      url: 'http://localhost:8081/doctor/huoquadministrative',//自己请求的服务器的地址
      data: {
        deptname: deptname
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) {
        that.setData({
          doctorxq: req.data

        })
      }
    })
  },
  //获取日历插件
  huoqutime: function (options){
    var that = this;
    var id=options.id;
    wx.request({
      url: 'http://localhost:8081/doctor/huoqutime',//自己请求的服务器的地址
      data: {
        id: id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json;charset=utf-8' // 默认值
      },
      success: function (req) {
        that.setData({
          calendar: req.data
        })
      }
    })
  },
  //获取医生就诊地址
  huoquaddress: function (options){
     var that = this;
   
    var id=options.id
    wx.request({
      url: 'http://localhost:8081/doctor/huoquaddress',//自己请求的服务器的地址
      data: {
        id: id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) {
        //存储格式 wx.setStorageSync('key命名', value内容);
        wx.setStorageSync('doctorid', req.data.id);
        wx.setStorageSync('doctorname', req.data.name);
        wx.setStorageSync('price', req.data.price);
        console.log(req.data.name + "%%%%%%%%%%%%%%%%%%%%%%");
        that.setData({
          address: req.data
        })
      }
    })
   
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

  },
  select: function (event) {
    var that = this;
    //为上半部分的点击事件
    this.setData({
      currentIndex: event.currentTarget.dataset.index
    })
    var id = event.currentTarget.dataset.id;
    //查询预约状态
    wx.request({
      url: 'http://localhost:8081/doctor/huoqustutas',//自己请求的服务器的地址
      data: {
        id: id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json;' // 默认值
       
      },
      success: function (req) {
        that.setData({
          status: req.data
        })
        wx.request({
          url: 'http://localhost:8081/doctor/huoquappointmenttime',//自己请求的服务器的地址
          data: {
            id: id
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (req) {
            console.log(req)
            that.setData({
              appointmenttime: req.data
            })
          }
        })
      }
    })

    //回调函数成功查询预约时间段
    

    
  },
  //打开规则提示
  showRule: function (e) {
    var that = this;
    var week = e.currentTarget.dataset.week;
  
    

    that.setData({
      isRuleTrue: true
    })
    
  },
  //关闭规则提示
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
  },
  
})

