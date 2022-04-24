import * as API from '../enum/enums.js'
import { chooseMedia, httpRequest, uploadMedia } from './http.js'

// 登录，参数是用户code
const _login = (_code) => {
  return httpRequest({
    // 后端地址
    url: API.LOGIN_API,
    data: {
      code: _code
    },
    header:{
      "content-type": "application/json",
      'accept': 'application/json'
    },
    method: 'GET',
    showLoading: true
  })
}
// 向后端请求token，参数是userVO
const _get_token = (avatarUrl, nickName, openId, school) => {
  return httpRequest({
    url: API.GET_TOKEN,
    data: {
      avatarUrl: avatarUrl,
      nickName: nickName,
      openId: openId,
      school: school
    },
    header:{
      "content-type": "application/json",
      'accept': 'application/json'
    },
    method: "POST",
    showLoading: true
  })
}
// 查询用户详细信息，需要token
const _get_user_info = () => {
  return httpRequest({
    url: API.GET_USER_INFO,
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    method: "POST"
  })
}
// 查询用户详细信息，使用id，PathVaraible，不需要token
const _get_user_info_byId = (id) => {
  return httpRequest({
    url: API.GET_USER_INFO_BYID + id,
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
    },
    method: "GET",
  })
}
// 获取用户的好友列表，需要token
const _get_user_friendList = () => {
  return httpRequest({
    url: API.FRIEND_LIST,
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    method: "GET",
    showLoading: true
  })
}
// 获取用户的所有聊天记录，需要token
const _get_chat_history = (_friendId, _id, _pageNo, _pageSize) => {
  return httpRequest({
    url: API.CHAT_HISTORY,
    data: {
      friendId: _friendId,
      id: _id,
      pageNo: _pageNo,
      pageSize: _pageSize
    },
    header:{
      "content-type": "application/x-www-form-urlencoded",
      'Authorization': wx.getStorageSync('token')
    },
    method: "GET",
    showLoading: true
  })
}
// 选择核酸截图
const _choose_nucleic = () => {
  return chooseMedia()
}
// 上传核酸截图，需要token
const  _upload_nucleic = (_filePath, _info_id) => {
  console.log('图片本地路径：' + _filePath)
  return uploadMedia({
    url: API.NUCLEIC_OCR + _info_id,
    filePath: _filePath,
    name: 'image', // key
    header: {
      'content-type': 'multipart/form-data',
      'Authorization': wx.getStorageSync('token')
    },
    method: 'POST',
    showLoading: true
  })
}
// 获取小程序的access_token，不需要参数和token
const _get_access_token = () => {
  return httpRequest({
    url: API.ACCESS_TOKEN,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
    }
  })
}
// 核酸模块获取用户收到的上报通知，需要token
const _get_report_inform = () => {
  return httpRequest({
    url: API.GET_REPORT_INFORM,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: true
  })
}
// 核酸模块获取用户收到的预约通知，需要token
const _get_book_inform = () => {
  return httpRequest({
    url: API.GET_BOOK_INFORM,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: true
  })
}
// 核酸模块获取用户收到的检测通知，需要token
const _get_test_inform = () => {
  return httpRequest({
    url: API.GET_TEST_INFORM,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: true
  })
}
// 增加一条预约通知
const _insert_book = (_data) => {
  return httpRequest({
    url: API.INSERT_BOOK_INFORM,
    method: 'POST',
    data: _data,
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 增加一条检测通知
const _insert_test = (_data) => {
  return httpRequest({
    url: API.INSERT_TEST_INFORM,
    method: 'POST',
    data: _data,
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 添加定时提醒
const _add_remind = (_data) => {
  return httpRequest({
    url: API.INSERT_TEST_INFORM,
    method: 'POST',
    data: _data,
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: true
  })
}
// 删除定时提醒
const _delete_remind = (_task_name ) => {
  return httpRequest({
    url: API.INSERT_TEST_INFORM + _task_name,
    method: 'DELETE',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: true
  })
}
// 查看所有定时提醒
const _check_remind = () => {
  return httpRequest({
    url: API.INSERT_TEST_INFORM,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: true
  })
}
// 获取用户待上报数量
const _report_count = () => {
  return httpRequest({
    url: API.REPORT_COUNT,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: true
  })
}
// 获取用户待预约数量
const _book_count = () => {
  return httpRequest({
    url: API.BOOK_COUNT,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: true
  })
}
// 获取用户待检测数量
const _test_count = () => {
  return httpRequest({
    url: API.TEST_COUNT,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: true
  })
}


export {
  _login,
  _get_token,
  _get_user_info,
  _upload_nucleic,
  _get_user_friendList,
  _get_chat_history,
  _get_user_info_byId,
  _choose_nucleic,
  _get_access_token,
  _get_report_inform,
  _get_book_inform,
  _get_test_inform,
  _insert_book,
  _insert_test,
  _add_remind,
  _delete_remind,
  _check_remind,
  _book_count,
  _test_count,
  _report_count,
  
}