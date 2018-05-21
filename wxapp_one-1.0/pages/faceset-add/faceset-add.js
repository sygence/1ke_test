import FacesetControl from '../../facesetcontrol/facesetcontrol.js'
Page({
  data: {
    run_type : 'setadd',
    image_type: 'BASE64',
    user_id:'',
    class_id: '',
    user_name: ''
  },
  bindClassInput: function (e) {
    this.data.class_id = e.detail.value
  },
  bindIdInput: function (e) {
    this.data.user_id = e.detail.value
  },
  bindNameInput: function (e) {
    this.data.user_name = e.detail.value
  },
  onLoad(options) {
    let that = this
    this.imgPath = options.imgPath
    this.facesetControl = new FacesetControl(this)
      .on('ImageChanged', (imgPath) => {
        that.imgPath = imgPath
        console.log('imgPath', imgPath)
      })
      .on('DecodeStart', (imgPath) => {
        console.log('DecodeStart',this.data.user_name)
        wx.showLoading({
          title: '解析中',
          mask: true
        },
        console.log('imgPath:',imgPath))
      })
      .on('DecodeComplete', (res) => {
        if (res.code == 0) {
          wx.showModal({
            title: '',
            content: JSON.stringify(res.data),
          })
        } else {
          console.log('解析失败：' + res)
        }
        wx.hideLoading()
      })
  },

  onReady() {
    this.facesetControl.setImage(this.imgPath)
  },
  onShow: function () {

  },
  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }

})

