import * as API from '../enum/enums'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const tsFormatTime = function(timestamp, format){
  const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  let returnArr = [];
  let date = new Date(timestamp);
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  returnArr.push(year, month, day, hour, minute, second);

  returnArr = returnArr.map(formatNumber);

  for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

const formatTimeYMD = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}


const wxuuid = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
 
  var uuid = s.join("");
  return uuid
}


const request = function(method,url,params,header,showLoading=true){
  return new Promise((resolve, reject) => {
    if(showLoading){
      wx.showLoading({
        title: '加载中...',
      })
    }
    wx.request({
      url:  `${API.CHAT_BASE}${url}`,
      method: method,
      data:params,
      header: header,
      success: data => {
        if(data.data){
          if(data.data.code===0){
            resolve(data.data)
          }else if(data.data.code===401){
            wx.redirectTo({url: '/pages/register/register'})
          }else{
            wx.showToast({
              title: data.data.msg,
              icon: 'waring',
              duration: 1500
            })
          }
        }
      },
      fail: err => {
        console.err(err);
        reject(err)
      },
      complete:com=>{
        if(showLoading){
          wx.hideLoading()
        }
      }
    })
  })
}
const shuffle = function(arr) {
  var l = arr.length
  var index, temp
  while(l>0){
      index = Math.floor(Math.random()*l)
      temp = arr[l-1]
      arr[l-1] = arr[index]
      arr[index] = temp
      l--
  }
  return arr
}

module.exports = {
  formatTime,
  wxuuid,
  tsFormatTime,
  formatTimeYMD,
  shuffle
}
