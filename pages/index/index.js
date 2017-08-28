//index.js
//获取应用实例
var app = getApp()
var day = ["今天", "明天", "后天"];
Page({
  data: {
    day: day
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this

    that.getLocation();
  },

  // 通过微信，获取经纬度
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        var latitude = res.latitude //纬度
        var longitude = res.longitude //经度
        console.log("lat:" + latitude + "lon:" + longitude)

        //调用天气查询
        that.getCity(latitude, longitude);
      },
    })
  },

  //通过百度地图，获取城市信息
  //详细接口见：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
  getCity: function (latitude, longitude) {
    var that = this;
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var params = {
      //百度地图 微信小程序 API Key
      ak: "Pu6g4NqLbBPdrrnhTVPmx3RCqR3R0nWb",
      output: "json",
      location: latitude + "," + longitude //维度+经度
    }

    //通过微信发起网络请求
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        console.log(JSON.stringify(res))
        //前端的 json 解析简直方便！！
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;

        //赋值
        that.setData({
          city: city,
          district: district,
          street: street
        })

        //查询天气，传 经纬度 作为参数
        that.getWeather(latitude + "," + longitude);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //通过和风天气，获取城市天气
  //接口详情见：https://www.heweather.com/documents/api/v5/weather
  getWeather: function (city) {
    var that = this;
    var url = "https://free-api.heweather.com/v5/weather";
    var params = {
      city: city,
      key: "f7da3083a7bf45b7800704d128bd6900",
    }

    //通过微信发起网络请求
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        console.log(JSON.stringify(res))

        //获取需要的数据
        var tmp = res.data.HeWeather5[0].now.tmp;
        var txt = res.data.HeWeather5[0].now.cond.txt;
        var code = res.data.HeWeather5[0].now.cond.code;
        var suggestion_brf = res.data.HeWeather5[0].suggestion.air.brf; //舒适度指数简介
        var suggestion_txt = res.data.HeWeather5[0].suggestion.air.txt; //舒适度详细描述
        var dir = res.data.HeWeather5[0].now.wind.dir;
        var sc = res.data.HeWeather5[0].now.wind.sc;
        var hum = res.data.HeWeather5[0].now.hum;
        var fl = res.data.HeWeather5[0].now.fl;
        var daily_forecast = res.data.HeWeather5[0].daily_forecast;

        that.setData({
          tmp: tmp,
          txt: txt,
          code: code,
          suggestion_brf: suggestion_brf,
          suggestion_txt: suggestion_txt,
          dir: dir,
          sc: sc,
          hum: hum,
          fl: fl,
          daily_forecast: daily_forecast
        })

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
