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
    showLoading: false
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
    url: API.SEND_REMIND,
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
    url: API.DELETE_REMIND + _task_name,
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
    url: API.CHECK_REMIND,
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
    showLoading: false
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
    showLoading: false
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
    showLoading: false
  })
}
// 发布求助信息，需要token
const _publish_sh_draft = (_data) => {
  return httpRequest({
    url: API.PUBLISH_SH_DRAFT,
    data: _data,
    method: 'POST',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: true
  })
}
// 发布帮助信息，需要token
const _publish_rh_draft = (_data) => {
  return httpRequest({
    url: API.PUBLISH_RH_DRAFT,
    data: _data,
    method: 'POST',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: true
  })
}
// 上传求助帖子截图，需要token
const  _upload_rh_draft_img = (_filePath, _draft_id) => {
  console.log('图片本地路径：' + _filePath)
  return uploadMedia({
    url: API.INSERT_RH_DRAFT_IMG + _draft_id,
    filePath: _filePath,
    name: 'imageList', // key
    header: {
      'content-type': 'multipart/form-data',
      'Authorization': wx.getStorageSync('token')
    },
    method: 'POST',
    showLoading: true
  })
}
// 上传帮助帖子截图，需要token
const  _upload_sh_draft_img = (_filePath, _draft_id) => {
  console.log('图片本地路径：' + _filePath)
  return uploadMedia({
    url: API.INSERT_SH_DRAFT_IMG + _draft_id,
    filePath: _filePath,
    name: 'imageList', // key
    header: {
      'content-type': 'multipart/form-data',
      'Authorization': wx.getStorageSync('token')
    },
    method: 'POST',
    showLoading: true
  })
}
// 通过id查询帮助帖子，需要token
const _query_rh_forum_byId = (_id) => {
  return httpRequest({
    url: API.QUERY_RH_BY_ID + _id,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 通过id查询求助帖子，需要token
const _query_sh_forum_byId = (_id) => {
  return httpRequest({
    url: API.QUERY_SH_BY_ID + _id,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 获得按tag分类的所有求助帖子，需要token
const _query_sh_list_byTag = () => {
  return httpRequest({
    url: API.QUERY_SH_LIST,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 获得按tag分类的所有帮助帖子，需要token
const _query_rh_list_byTag = (_tag) => {
  return httpRequest({
    url: API.QUERY_RH_LIST,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 通过关键词搜索求助帖，需要token
const _search_sh_by_keyWord = (_keyWord) => {
  return httpRequest({
    url: API.SEARCH_SH + _keyWord,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 通过关键词搜索帮助帖，需要token
const _search_rh_by_keyWord = (_keyWord) => {
  return httpRequest({
    url: API.SEARCH_RH + _keyWord,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 获取用户搜索帮助的历史记录，需要token
const _get_rh_search_history = () => {
  return httpRequest({
    url: API.RH_SEARCH_HISTORY + 15,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 获取用户搜索求助的历史记录，需要token
const _get_sh_search_history = () => {
  return httpRequest({
    url: API.SH_SEARCH_HISTORY + 15,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 删除用户搜索求助的历史记录，需要token
const _delete_sh_search_history_byUser = () => {
  return httpRequest({
    url: API.DELETE_SH_HISTORY_BY_USER,
    method: 'DELETE',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 删除用户搜索求助的历史记录，需要token
const _delete_rh_search_history_byUser = () => {
  return httpRequest({
    url: API.DELETE_RH_HISTORY_BY_USER,
    method: 'DELETE',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 删除用户发布的求助帖，需要token
const _delete_sh_forum_byId = (_id) => {
  return httpRequest({
    url: API.DELETE_SH_FORUM_BY_ID + _id,
    method: 'DELETE',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 删除用户发布的帮助贴，需要token
const _delete_rh_forum_byId = (_id) => {
  return httpRequest({
    url: API.DELETE_RH_FORUM_BY_ID + _id,
    method: 'DELETE',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 更新用户核酸上报信息，需要token
const _update_report_inform = (_data) => {
  return httpRequest({
    url: API.UPDATE_REPORT_INFORM,
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

// 更新用户核酸检测信息，需要token
const _update_test_inform = (_data) => {
  return httpRequest({
    url: API.UPDATE_TEST_INFORM,
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
// 更新用户核酸预约信息，需要token
const _update_book_inform = (_data) => {
  return httpRequest({
    url: API.UPDATE_BOOK_INFORM,
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

// 获取用户发布的所有求助贴，需要token
const _sh_list_byUser = () => {
  return httpRequest({
    url: API.SH_LIST_BY_USER,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
  })
}
// 获取用户发布的所有帮助贴，需要token
const _rh_list_byUser = () => {
  return httpRequest({
    url: API.RH_LIST_BY_USER,
    method: 'GET',
    header:{
      "content-type": "application/json",
      'accept': 'application/json',
      'Authorization': wx.getStorageSync('token')
    },
    showLoading: false
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
  _publish_rh_draft,
  _publish_sh_draft,
  _upload_sh_draft_img,
  _upload_rh_draft_img,
  _query_rh_forum_byId,
  _query_sh_forum_byId,
  _query_rh_list_byTag,
  _query_sh_list_byTag,
  _search_rh_by_keyWord,
  _search_sh_by_keyWord,
  _get_rh_search_history,
  _get_sh_search_history,
  _delete_rh_search_history_byUser,
  _delete_sh_search_history_byUser,
  _delete_rh_forum_byId,
  _delete_sh_forum_byId,
  _update_book_inform,
  _update_test_inform,
  _update_report_inform,
  _sh_list_byUser,
  _rh_list_byUser
  
}