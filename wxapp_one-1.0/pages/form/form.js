var app = getApp();
Page({
  data: {
    showTopTips: false,
    pickerHidden: false,
    chosen: '',
    array: ["计算机学院", "商学院", "艺术学院", "环化学院", "体育学院","机械工程学院","电子工程学院","汽车工程学院"],
    objectArray: [
      {
        id: 0,
        name: '计算机学院'
      },
      {
        id: 1,
        name: '商学院'
      },
      {
        id: 2,
        name: '艺术学院'
      },
      {
        id: 3,
        name: '环化学院'
      },
      {
        id: 4,
        name: '体育学院'
      },
      {
        id: 5,
        name: '机械工程学院'
      },
      {
        id: 6,
        name: '电子工程学院'
      },
      {
        id: 7,
        name: '汽车工程学院'
      }
    ],
    
    
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      department: e.detail.value
    })
  },
 
  
 
  
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    var index = e.detail.value;

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      method: "POST",
      url: 'https://ehome.susmote.com/zb_system/cmd.php?act=os_wxapi&v=v1&mode=reg',
      data: {formData,
      },
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
