Page({

  data: {
    contactsList: [
      {
        name: "校园110",
        phoneNumber: "02787996110",
      },
      {
        name: "寝室格力空调维修电话",
        phoneNumber: "177 7149 3830",
      },
      {
        name: "寝室海尔空调维修电话",
        phoneNumber: "88032572",
      }
    ]

  },
  phoneCall: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      success: function () {
        console.log("成功拨打电话")

      },

    })

  },
  onLoad: function (options) {
  },
 
 
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
  
})