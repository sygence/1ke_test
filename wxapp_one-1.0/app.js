//app.js
const api = require('function/api')
const login = require('function/login')

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口  
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData: {
    userInfo: null,
    // musicSwitch:'show',
    // toastSwitch:'show'
  }
})

var options = {
    // 开发者自定义操作
    libs: {
        api,
        login
    },
    globalData: {},
    onLaunch: function() {
        // 记录网络状态
        wx.getNetworkType({
            success: res => {
                this.globalData.networkType = res.networkType
            }
        })
        wx.onNetworkStatusChange(res => {
            this.globalData.networkType = res.networkType
        })
    },
    // 进入小程序验证一次
    // onShow() {
        // 进入的时候就验证一次
        // 验证登录
        // if (!this.globalData.isLogin) {
        //     login.check(err => {
        //         if (err) {
        //             // 用户登录
        //             login.login(err => {
        //                 if (!err) this.globalData.isLogin = true
        //             })
        //         } else {
        //             this.globalData.isLogin = true
        //         }
        //     })
        // }
    // },
    msg(content) {
        wx.showToast({
            title: content,
            icon: "none"
        })
        return this
    },
    model(content) {
        wx.showModal({
            title: "提示",
            showCancel: false,
            content
        })
        return this
    },
}

App(options)

options.libs.api.appGlobalData = options.globalData
