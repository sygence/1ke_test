require("../../utils/util.js");

var e = "StuLsn_2017_1";

Page({
    data: {
        weeks: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ],
        days: ["周日", "周二", "周三", "周四", "周五", "周六",  "周一"],
        thisweekdates: [ "*", "*", "*", "*", "*", "*", "*" ],
        dateFrom: "2018-05-20",
        ShowMessageBox: !1,
        MessageText: ""
    },
    OnAddLsn: function() {
        var e = this;
        wx.showActionSheet({
            itemList: [ "导入课表", "手动添加课程", "自定义课表背景"],
            success: function(t) {
                0 == t.tapIndex ? wx.navigateTo({
                    url: "GetLsn"
                }) : 1 == t.tapIndex ? wx.navigateTo({
                    url: "AddLsn"
                }) : 2 == t.tapIndex ? e.DIYbg() : 3 == t.tapIndex && wx.navigateTo({
                   
                });
            }
        });
    },

    //设置背景照片
    DIYbg: function() {
        var e = this;
        wx.showModal({
            content: "选择手机上一张好看的图片作为课表背景吧！（没有好看的图片可以搜一下小程序“壁纸精选”）",
            showCancel: !1,
            confirmText: "选择图片",
            success: function() {
                wx.chooseImage({
                    count: 1,
                    sourceType: [ "album" ],
                    success: function(t) {
                        wx.saveFile({
                            tempFilePath: t.tempFilePaths[0],
                            success: function(t) {
                                wx.removeSavedFile({
                                    filePath: wx.getStorageSync("KebiaoBg")
                                }), console.log(t.savedFilePath), wx.setStorageSync("KebiaoBg", t.savedFilePath), 
                                e.onShow();
                            }
                        });
                    }
                });
            }
        });
    },
    NowWeekChange: function(e) {
        console.log(e);
        var t = parseInt(e.detail.value) + 1;
        this.setData({
            now_week: t
        }), this.MakeKebiao(t);
    },
    onShow: function(e) {
        getApp().SetColor(this);
        var t = wx.getStorageSync("StyleColor"), a = wx.getStorageSync("KebiaoBg");
        this.setData({
            KebiaoBg: a
        });
        var s = wx.getStorageSync("IfShowFromMon");
        1 == s && this.setData({
          days: ["周日", "周二", "周三", "周四", "周五", "周六", "周一" ],
            dateFrom: "2018-02-26"
        });
        var o = new Date();
        console.log(o);
        var i = new Date(this.data.dateFrom);
        console.log(i);
        var c = parseInt((o.valueOf() - i.valueOf()) / 6048e5) + 1, n = o.getDay();
        if (1 == s) r = this.data.days[(0 == n ? 7 : n) ]; else var r = this.data.days[0 == n ? 7 : n];
        this.setData({
            class: "",
            now_week: c,
            StyleColor: t,
            now_day: r
        }), this.MakeKebiao(this.data.now_week), this.GetPublicNotice();
    },
    GetPublicNotice: function() {
        var e = this;
        wx.request({
            url: getApp().globalData.url + "GetPublicNotice.php",
            success: function(t) {
                console.log(t.data), t.data.show && wx.getStorageSync("PublicNotice") != t.data.id && (e.ShowMessageBox(t.data.text, t.data.time), 
                wx.setStorageSync("PublicNotice", t.data.id));
            }
        });
    },
    ShowMessageBox: function(e, t) {
        var a = this;
        a.setData({
            ShowMessageBox: !0,
            MessageText: e
        }), t > 0 && setTimeout(function() {
            a.setData({
                ShowMessageBox: !1,
                MessageText: ""
            });
        }, t);
    },
    CloseMessageBox: function() {
        this.setData({
            ShowMessageBox: !1,
            MessageText: ""
        });
    },
    ViewClass: function(t) {
        var a = this, s = t.currentTarget.dataset.data;
        wx.showModal({
            title: s.title,
            content: "时间：" + s.time[1] + "-" + s.time[2] + "周 每" + s.time[3] + "周 周" + s.time[0] + " " + s.time[4] + "-" + s.time[5] + "节" + s.classroom + "\r\n教师：" + s.teacher,
            confirmText: "取消",
            cancelText: "删除课程",
            cancelColor: "#FF0000",
            success: function(t) {
                t.cancel && wx.showModal({
                    title: "删除确认",
                    content: "此操作将在课程表中删除此课程，删除后可重新从教务系统中导入或手动添加。",
                    confirmText: "删除",
                    confirmColor: "#FF0000",
                    success: function(t) {
                        if (t.confirm) {
                            for (var o = wx.getStorageSync(e), i = 0; i < o.length; i++) o[i].title == s.title && (o.splice(i, 1), 
                            i--);
                            console.log(o), wx.setStorageSync(e, o), a.onShow();
                        }
                    }
                });
            }
        });
    },
    MakeKebiao: function(t) {
        var a = this, s = new Date(this.data.dateFrom), o = new Date(this.data.dateFrom), i = this.data.thisweekdates;
        s.setDate(o.getDate() + 7 * (t - 1)), console.log(s), i[0] = s.getDate().toString();
        for (h = 1; h < 7; h++) s.setDate(s.getDate() + 1), i[h] = s.getDate().toString();
        this.setData({
            thisweekdates: i
        });
        var c = wx.getStorageSync(e), n = wx.getStorageSync("IfShowOtherWeekClass"), r = wx.getStorageSync("IfShowFromMon");
        if (console.log(c), c) {
            for (var l = [], g = [], h = 0; h < c.length; h++) {
                var w = c[h].time;
                if (1 == r && "日" == w[0] && (w[1]--, w[2]--), t >= w[1] && t <= w[2] && ("1" == w[3] || "2" == w[3] && (t - w[1]) % 2 == 0)) {
                    var u = {};
                    if (1 == r) switch (w[0]) {
                      case "一":
                        d = 1;
                        break;

                      case "二":
                        d = 2;
                        break;

                      case "三":
                        d = 3;
                        break;

                      case "四":
                        d = 4;
                        break;

                      case "五":
                        d = 5;
                        break;

                      case "六":
                        d = 6;
                        break;

                      case "日":
                        d = 7;
                    } else switch (w[0]) {
                      case "一":
                        d = 2;
                        break;

                      case "二":
                        d = 3;
                        break;

                      case "三":
                        d = 4;
                        break;

                      case "四":
                        d = 5;
                        break;

                      case "五":
                        d = 6;
                        break;

                      case "六":
                        d = 7;
                        break;

                      case "日":
                        d = 1;
                    }
                    u.day = d, u.start = w[4], u.end = w[5], u.classroom = (w[6] ? w[6] : "") + " " + (w[7] ? w[7] : "") + "-" + (w[8] ? w[8] : ""), 
                    u.title = c[h].title, u.time = w, u.teacher = c[h].teacher, l.push(u);
                } else if (1 == n) {
                    var d, S = {};
                    if (1 == r) switch (w[0]) {
                      case "一":
                        d = 1;
                        break;

                      case "二":
                        d = 2;
                        break;

                      case "三":
                        d = 3;
                        break;

                      case "四":
                        d = 4;
                        break;

                      case "五":
                        d = 5;
                        break;

                      case "六":
                        d = 6;
                        break;

                      case "日":
                        d = 7;
                    } else switch (w[0]) {
                      case "一":
                        d = 2;
                        break;

                      case "二":
                        d = 3;
                        break;

                      case "三":
                        d = 4;
                        break;

                      case "四":
                        d = 5;
                        break;

                      case "五":
                        d = 6;
                        break;

                      case "六":
                        d = 7;
                        break;

                      case "日":
                        d = 1;
                    }
                    S.day = d, S.start = w[4], S.end = w[5], S.classroom = (w[6] ? w[6] : "") + " " + (w[7] ? w[7] : "") + "-" + (w[8] ? w[8] : ""), 
                    S.title = c[h].title, S.string = c[h].string, S.teacher = c[h].teacher, g.push(S);
                }
            }
            this.setData({
                now_week_class: l,
                other_week_class: g
            }), "" == l && (c = [], a.ShowMessageBox("本周没有课，Have Fun！", 3e3));
        } else a.ShowMessageBox("课程表为空，导入/添加课程吧！", 0);
    }
});