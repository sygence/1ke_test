// pages/other/bind.js
var app = getApp()
const config = require("../../config/index")
const md5 = require("../../utils/md5")
Page({
    data: {
        inputPassword: false,
        isLoading: false,
        username: '',
        password: ''
    },
    
    status: {},
    // 处理输入框内容
    
    bindInputChange(e) {
        var data = e.currentTarget.dataset
        var updateData = {}
        updateData[data['name']] = e.detail.value
        this.setData(updateData)
    },
    /**
     * 验证
     */
    verify() {
        this.status.verify = true
        if (!this.data.username.length) {
            app.msg('请输入您的账号')
            this.status.verify = false
            return this
        } else if (!this.data.password.length) {
            app.msg('请输入您的密码')
            this.status.verify = false
            return this
        }
        return this
    },
    /**
     * 提交绑定
     */
    

      formSubmit() {
        if (this.status.submit) return this
        this.verify()
        if (!this.status.verify) return this
        wx.showLoading({
            title: "验证中..."
        })
        this.status.submit = true
        app.libs.api.req('bind', {
            username: this.data.username,
            password: md5(this.data.password),
        }, (err, res) => {
            wx.hideLoading()
            this.status.submit = false
            if (err) {
                app.model(err.msg)
            } else {
                wx.showToast({
                    title: "绑定成功",
                    icon: "success",
                    mask: true
                })
                wx.removeStorage({
                    key: "userinfo"
                })
                setTimeout(() => {
                    wx.switchTab({
                        url: '/pages/user/index'
                    })
                }, 1000)
            }
        })
    },
      formSubmit: function (e) {
        this.setData({
          isLoading: true
        })
        console.log(e.detail.value)
        //获得表单数据
        var objData = e.detail.value;
        if (objData.username && objData.password) {
          wx.request({
            url: 'https://ehome.susmote.com/zb_system/cmd.php?act=os_wxapi&v=v1&mode=user',
            method: 'POST',
            data: {
              username: objData.username,
              password: objData.password
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {

              var toastr = require('../utils/app.js');
              //var toastr = require( );
              toastr.ok({
                title: '登录成功',
                duration: 1000,
              });
              if (res.data.code == 200) {

                var result = res.data.info
                result.password = objData.password//?
                console.log(result)
                wx.setStorage({
                  key: "account",
                  data: result
                })
                wx.reLaunch({
                  url: '/pages/index/index',
                })

              } else {

                //登录失败
                toastr.error({
                  title: '用户名或密码错误',
                  duration: 1000,
                });



              }
            }
          })
        } else {
          var toastr = require('../utils/app.js');
          toastr.error({
            title: '不能为空',
            duration: 1000,
          });
        }
        setTimeout(() => {
          this.setData({
            isLoading: false
          })
        }, 1000)

      },
      onLoad() {
        //登录前清除缓存
        wx.clearStorageSync()
        console.log('清除缓存')
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#4A699F',
          animation: {
            duration: 400,
            timingFunc: 'easeIn'
          }
        })
      }

})
