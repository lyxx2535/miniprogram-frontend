/**
 * author: Peng Junzhi
 * date: 20220418
 */

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

const uploadMedia = (options) =>{
  return new Promise((resolve, reject) => {
    wx.chooseMedia({
      count: 9,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        // 遍历所有本地上传文件
        for(let index in res.tempFiles){
          console.log('上传媒体暂时路径: ' + res.tempFiles[index].tempFilePath);
          wx.uploadFile({
            url: pubUrl + options.url,
            filePath: res.tempFiles[index].tempFilePath,
            name: options.name,
            formData: options.data || {},
            header: options.header || {
              'content-type': 'multipart/form-data',
              'Authorization': wx.getStorageSync('token')
            },
            success: resolve,
            fail: reject
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  })
}

export {
  httpRequest,
  uploadMedia
}