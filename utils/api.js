import * as API from '../enum/enums.js'
import { chooseMedia, httpRequest, uploadMedia } from './http.js' //引入上面封装好的请求方法

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
// 选择核酸截图
const _choose_nucleic = () => {
  return chooseMedia()
}
// 上传核酸截图，暂时不需要token
// todo: 接口路径改了？
const  _upload_nucleic = (_filePath) => {
  console.log('截图参数：' + _filePath)
  return uploadMedia({
    url: API.NUCLEIC_ACID,
    filePath: _filePath,
    name: 'image', // key
    header: {
      'content-type': 'multipart/form-data'
    }
  })
  // this._choose_nucleic().then(res => {
  // // 遍历所有本地上传文件
  //   for(let index in res.tempFiles){
  //     console.log('上传媒体暂时路径: ' + res.tempFiles[index].tempFilePath);
  //   }
  //   return uploadMedia({
  //     url: API.NUCLEIC_ACID,
  //     filePath: res.tempFiles[0].tempFilePath,
  //     name: 'image', // key
  //     header: {
  //       'content-type': 'multipart/form-data'
  //     }
  //   })
  // })
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
}