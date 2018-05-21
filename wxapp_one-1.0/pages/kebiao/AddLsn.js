Page({
    data: {
        weekArray: [ [ "一", "二", "三", "四", "五", "六", "日" ], [ 1,], [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ], [ "每周", "每两周" ] ],
        weekIndex: [ 0, 0, 1, 0 ],
        jieshuArray: [ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ], [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] ],
        jieshuIndex: [ 0, 1 ],
        xuebuindex: 0,
        
    },
    AddLsn: function(e) {
        if (!(t = wx.getStorageSync("StuLsn_2017_1"))) var t = [];
        var a = e.detail.value, s = this;
        if ("" == a.title || "" == a.jiaoxuelou || "" == a.jiaoshi) s.setData({
            ShowMessageBox: !0,
            jieshuIndex: [ 0, 1 ],
            MessageText: "信息不全，请补全信息后重试"
        }), setTimeout(function() {
            s.setData({
                ShowMessageBox: !1,
                MessageText: ""
            });
        }, 3e3); else {
            var i = {
                title: a.title,
                teacher: a.teacher,
                time: [ s.data.weekArray[0][s.data.weekIndex[0]], s.data.weekIndex[1] + 1, s.data.weekIndex[2] + 1, s.data.weekIndex[3] + 1, s.data.jieshuIndex[0] + 1, s.data.jieshuIndex[1] + 1,  a.jiaoxuelou, a.jiaoshi ]
            };
            console.log(i), t.push(i), wx.setStorageSync("StuLsn_2017_1", t), wx.showToast({
                title: "添加成功",
                icon: "success",
                duration: 2e3
            });
            var n = getCurrentPages();
            n.length > 1 && n[n.length - 2].onShow(), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 1e3);
        }
    },
    weekPickerChange: function(e) {
        var t = this, a = e.detail.value;
        a[1] <= a[2] ? this.setData({
            weekIndex: a
        }) : (t.setData({
            ShowMessageBox: !0,
            weekIndex: [ 0, 0, 1, 0 ],
            MessageText: "周数不合法：结束周数应大于等于开始周数"
        }), setTimeout(function() {
            t.setData({
                ShowMessageBox: !1,
                MessageText: ""
            });
        }, 3e3));
    },
    jieshuPickerChange: function(e) {
        var t = this, a = e.detail.value;
        a[0] <= a[1] ? this.setData({
            jieshuIndex: a
        }) : (t.setData({
            ShowMessageBox: !0,
            jieshuIndex: [ 0, 1 ],
            MessageText: "节数不合法：结束节数应大于等于开始节数"
        }), setTimeout(function() {
            t.setData({
                ShowMessageBox: !1,
                MessageText: ""
            });
        }, 3e3));
    },
    xuebuPickerChange: function(e) {
        this.setData({
            xuebuindex: e.detail.value
        });
    },
    onLoad: function() {
        getApp().SetColor(this);
    }
});