// pages/about/about.js
//获取应用实例
const app = getApp()
var visiable = false
Page({

  data:{
    aboutApp: 'Hi\n这是 ZzWeather 关于页面 \n 更多内容敬请期待！^_^\n\nhttps://github.com/yangxiaoge/wechat_weather\n\n下面是ReadHub热门话题',
  },

  //跳转log 页面
  viewLog: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function() {
    // 获取 readhub 热门话题
    this.getHotTopics()
  },

  // 转发分享小程序
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Zz 天气预报',
      path: '/pages/index/index',
      success: function(res) {
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(res) {
        // 转发失败取消提示
        // wx.showToast({
        //   title: '转发失败',
        //   icon: 'loading',
        //   duration: 2000
        // })
      }
    }
  },

  getHotTopics: function() {
    var that = this;
    var url = "https://api.readhub.cn/topic";

    wx.request({
      url: url,
      success: function(res) {
        console.log(JSON.stringify(res));

        that.setData({
          hottopic_datas: res.data.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

})