// pages/freeConsultation/freeConsultation.js
let qqq={};
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    state:1,
    fileList3: [],
    items: [
      { name: '男', value: '男' , checked: 'true' },
      { name: '女', value: '女'}
     
    ],
    item:qqq,
    sms: '',
    value: '',
    password: '',
    username: '',
    textarea:'',
    fix:'男',
    username2: '',
    username3: '',
    message: '',
    phone: '1365577',
    //若登陆后，用户id和手机号从微信域中拿然后放到这里
    userphone:'17611736805',
    userid:'1',
    //咨询表id
    consultationId:'',
    //订单号
    orderNum:''
  },

  clickPreview(v){
    console.log(v);
  },
  afterRead(event) {

   
    var that = this;
    



    console.log(event.detail.file[0].path);
    
    
  



    const { file, name } = event.detail;
    const fileList = this.data[`fileList${name}`];
    //console.log(fileList.concat(file));
    this.setData({ [`fileList${name}`]: fileList.concat(file) });
  },
  delete(event) {
    const { index, name } = event.detail;
    const fileList = this.data[`fileList${name}`];
    fileList.splice(index, 1);
    this.setData({ [`fileList${name}`]: fileList });
  }, 
  //文本框失焦事件
  textareaBlur:function(e){
      console.log(e);
    let that = this;
    that.setData({
      textarea: e.detail.value

    })
  },
  //单选框改变事件
  radioChange:function(e){
    console.log(e);
    let that = this;
    
    that.setData({
      fix: e.detail.value

    })
  },
  //输入框失焦事件
  onClickIcon:function(e){
      console.log(e);
    let that = this;
    that.setData({
      username: e.detail.value

    })
  },
    //免费咨询按钮  跳转成功页面
  freetijiao:function(e){
    var that = this;
    let ite = this.data.item;
    let username = this.data.username;
    console.log(username);
    let text = this.data.textarea;
    let fix = this.data.fix;
    let str = JSON.stringify(ite);
    
    wx.navigateTo({
      url: '/pages/online_consultation/successfulConsulting/successfulConsulting?jsonStr=' + str,
    })
    
  },
  /**
   * 提交  获取图片数据
   */
  submit:function(){
  
      wx.showToast({
        title: '数据加载中',
        icon: 'loading',
        duration: 3000
      });
    
    var that = this;
    //获取付费状态，根据状态判断
    let state = this.data.state;

    let ite = this.data.item;
    let str = JSON.stringify(ite);
    let username = this.data.username;
    let text = this.data.textarea;
    let fix = this.data.fix;
    let phone =this.data.userphone;
    let userid = this.data.userid;
    const fileList = this.data[`fileList3`];
    let photos = [] //定义数据用来接取循环的base64
    for(var i=0;i<fileList.length;i++){
      console.log(fileList[i]);
      //将图片路径转为base64格式
      let base64 = wx.getFileSystemManager().readFileSync(fileList[i].path, 'base64')
      console.log(base64)
      let o = {
        base64Str: base64

      }
      photos.push(o);
    }
    that.houduanRequest(photos, ite, phone, username, text, fix, userid, state); //将photos存入oss服务器
  },
  
  //跳转到付费页面
  submitPay:function(id){
    let consultationId=this.data.consultationId;
      console.log("fanggouyaoni");
    console.log(consultationId);
    var that = this;
    let ite = this.data.item;
    let username = this.data.username;
    console.log(username);
    let text = this.data.textarea;
    let fix = this.data.fix;
    let str = JSON.stringify(ite);
    let orderNum = this.data.orderNum;
    
    wx.navigateTo({
      url: '/pages/online_consultation/consultingPaid/consultingPaid?jsonStr=' + str + '&consultationId=' + consultationId + '&orderNum=' + orderNum,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let item = JSON.parse(options.jsonStr);
    let that = this;
    that.setData({
      item: item,
      state: item.ispremium

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



  houduanRequest: function (photos, ite, phone, username, text, fix, userid, state) {
  
    console.log(photos);
    var that = this;

    wx.request({
      url: 'http://localhost:8081/onlineConsultation/api',//自己请求的服务器的地址
      method: 'POST',
      dataType:'json',
      data: { photos: photos, ite: ite, phone: phone, biaoti: username, text: text, fix: fix, userid: userid, state: state},
      
      success: function (req) {
        console.log(req);
        console.log(req.data.response + "=============rrrrrrrrr=========");
        if (req.data.response==true){
          console.log("成功");
          wx.hideToast();
          if (state==0){
            that.freetijiao();
          }
          if (state == 1){
            that.setData({
              consultationId: req.data.id,
              orderNum: req.data.orderNum
            })
            that.submitPay();
          }
          
        } else {
          console.log("失败");
          wx.hideToast();
        }

       
        /**
        *  var list = req.data;
        if (list == null) {
          
          wx.showToast({
            title: 'ErrorMessage',
            icon: 'false',   //图标
            duration: 1500  //提示的延迟的时间
          })
        } else {
          console.log("nima");
        }*/
      }
    })
  }
})