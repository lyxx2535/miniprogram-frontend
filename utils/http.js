/**
 * author: Peng Junzhi
 * date: 2022-04-18
 */

//后端地址公共部分
const pubUrl = "http://124.223.105.99:8085/api"
// const pubUrl = "http://localhost:8085/api"

// http请求
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

// 选择本地图片/视频
const chooseMedia = (options) =>{
  return new Promise((resolve, reject) => {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: resolve,
      fail: reject
    })
  })
}

// 上传图片/视频
const uploadMedia = (options) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: pubUrl + options.url,
      filePath: options.filePath,
      name: options.name,
      formData: options.data || {},
      header: options.header || {
        'content-type': 'multipart/form-data',
        'Authorization': wx.getStorageSync('token')
      },
      success: resolve,
      fail: reject
    })
  })
}

export {
  httpRequest,
  uploadMedia,
  chooseMedia
}