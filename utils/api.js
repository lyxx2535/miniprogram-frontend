import { httpRequest } from 'http.js' //引入上面封装好的请求方法
import * as API from '../enum/enums.js'
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
//向后端请求token，参数是userVO
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
//上传核酸截图，暂时不需要token
const _upload_nucleic = () => {
  return uploadMedia({
    url: API.NUCLEIC_ACID,
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
}