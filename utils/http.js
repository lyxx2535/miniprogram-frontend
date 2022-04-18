//后端地址公共部分
const pubUrl = "http://124.223.105.99:8085/api/"

const httpRequest = (options) =>{
  return new Promise((resolve, reject) => {
    wx.request({
      url: pubUrl + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      success: resolve,
      fail: reject
    })
  })
}

export {
  httpRequest
}