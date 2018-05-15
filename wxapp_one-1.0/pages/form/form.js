var app = getApp();
Page({
  data: {
    showTopTips: false,
    countryIndex: 0,
    pickerHidden: false,
    chosen: ''
  },
  
  
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
 
  
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      method: "POST",
      url: 'https://ehome.susmote.com/zb_system/cmd.php?act=os_wxapi&v=v1&mode=reg',
      data: formData,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          mask: true,
          duration: 2000
        }),
          that.setData({
            pickerHidden: true
          }),
          console.log('success:',res)
      }
    })
  }
  
});
