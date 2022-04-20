import * as API from '../enum/enums.js'
import { httpRequest } from './http.js' //引入上面封装好的请求方法
import { uploadMedia } from './http.js'

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
    method: "POST",
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
  })
}
// 上传核酸截图，暂时不需要token
const _upload_nucleic = () => {
  return uploadMedia({
    url: API.NUCLEIC_ACID,
    name: 'image', // key
    header: {
      'content-type': 'multipart/form-data'
    }
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

}