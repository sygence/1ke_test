var t = require("../../utils/md5.js");

Page({
    data: {
        showLoading: !0,
        Index: [ 0, 1 ],
        Array: [ [ "2017-2018学年" ], [ "上学期", "下学期" ] ]
    },
    PickerChange: function(t) {
        this.setData({
            Index: t.detail.value
        });
    },
    onShow: function(e) {
        var a = this;
        getApp().SetColor(this), a.setData({
            StuInfo: wx.getStorageSync("StuInfo")
        });
        var o = new Date().valueOf();
        wx.request({
            //url: getApp().globalData.url + ,
            data: {
                timestamp: o,
                token: t.hexMD5("inwhuapp" + o)
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    fileid: t.data.fileid,
                    showLoading: !1
                });
            }
        });
    },
    ChangeCode: function(t) {
        this.onShow();
    },
    GetStuScore: function(e) {
        var a = this.data.Index[1], o = this.data.Index[0] + 2017, n = e.detail.value, s = new Date().valueOf();
        n.timestamp = s, n.token = t.hexMD5("inwhuapp" + s), n.term = a, n.year = o;
        var l = this;
        "" == n.id || "" == n.pwd || "" == n.xdvfb ? wx.showModal({
            title: "信息不全",
            content: "请填写完整信息",
            showCancel: !1
        }) : (l.setData({
            showLoading: !0
        }), wx.request({
            url: getApp().globalData.url + "StuLsn.php?act=put",
            data: n,
            success: function(t) {
                if (console.log(t.data), "1" == t.data.message) {
                    var e = t.data.data;
                    console.log(e);
                    for (var n = [], s = 0; s < e.length; s++) for (var i = e[s].string.split("{br}"), r = 0; r < i.length - 1; r++) {
                        var c = i[r];
                        c = (c = (c = (c = (c = (c = c.replace(/周/g, "")).replace(/每/g, "")).replace(/节/g, "")).replace(/:/g, ",")).replace(/-/g, ",")).replace(/;/g, ",");
                        var g = {
                            title: e[s].title,
                            teacher: e[s].teacher,
                            time: c.split(",")
                        };
                        n.push(g);
                    }
                    console.log(n), l.setData({
                        showLoading: !1
                    }), wx.showToast({
                        title: "课表已更新",
                        icon: "success",
                        duration: 2e3
                    }), wx.setStorageSync("StuLsn_" + o + "_" + a, n);
                    var h = getCurrentPages();
                    h.length > 1 && h[h.length - 2].onShow(), setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 1e3);
                } else "0" == t.data.message ? (l.setData({
                    showLoading: !1
                }), wx.showModal({
                    title: "验证失败",
                    content: "学号或密码或验证码错误，请重新填写。",
                    showCancel: !1
                })) : wx.showModal({
                    title: "获取失败",
                    content: "请退出稍后重试",
                    showCancel: !1
                });
            }
        }));
    }
});