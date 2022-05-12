// user
const LOGIN_API = '/user/sessionId'
const GET_TOKEN = '/user/login'
const TOKEN_TEST = '/user/test'
const GET_USER_INFO = '/user/query'
const GET_USER_INFO_BYID = '/user/info/'
const ACCESS_TOKEN = '/user/access-token'
const UPDATE_USER_INFO = '/user/update'
// chat
const CHAT_BASE = 'https://localhost:9999/message-server/'
// const WS_BASE = 'ws://localhost:9999/message-server/'
const WS_BASE = 'wss://xjk-advisor.com:8085/'
const FRIEND_LIST = '/user/friend-list'
const CHAT_HISTORY = '/message/get-chat-history'
// nucleic_acid
const NUCLEIC_OCR = '/nucleic-acid/info/upload/';
const GET_REPORT_INFORM = '/nucleic-acid/info/user-list';
const INSERT_TEST_INFORM = '/nucleic-acid/testing/insert'
const GET_TEST_INFORM = '/nucleic-acid/testing/user-list'
const INSERT_BOOK_INFORM = '/nucleic-acid/booking/insert'
const GET_BOOK_INFORM = '/nucleic-acid/booking/user-list'
const UPDATE_REPORT_INFORM = '/nucleic-acid/info/update'
const UPDATE_TEST_INFORM = '/nucleic-acid/testing/update'
const UPDATE_BOOK_INFORM = '/nucleic-acid/booking/update'
const UPDATE_REPORT_REMIND = '/nucleic-acid/info/remind/'
const UPDATE_BOOK_REMIND = '/nucleic-acid/booking/remind/'
const UPDATE_TEST_REMIND = '/nucleic-acid/testing/remind/'
const FINISH_TEST = '/nucleic-acid/testing/finish/'
const FINISH_BOOK = '/nucleic-acid/booking/finish/'
// 发送服务消息
const SEND_REMIND = '/task/add'
const CHECK_REMIND = '/task/list'
const DELETE_REMIND = '/task/delete/'
// 获取数量
const TEST_COUNT = '/nucleic-acid/testing/count'
const BOOK_COUNT = '/nucleic-acid/booking/count'
const REPORT_COUNT = '/nucleic-acid/info/count'
// service message
const TEMPLATE_ID = 'dTxNqzkbtF7apmXfZBYlWD97krufydh5Gh0Zgn2QvlQ'
// community
const PUBLISH_RH_DRAFT = '/help-info/insert'
const PUBLISH_SH_DRAFT = '/seek-help/insert'
const INSERT_RH_DRAFT_IMG = '/help-info/upload/'
const INSERT_SH_DRAFT_IMG = '/seek-help/upload/'
// forum - seekHelp/renderHelp
const QUERY_SH_BY_ID = '/seek-help/query/'
const QUERY_RH_BY_ID = '/help-info/query/'
const QUERY_SH_LIST = '/seek-help/tag'
const QUERY_RH_LIST = '/help-info/tag'
const SEARCH_SH = '/seek-help/search/'
const SEARCH_RH = '/help-info/search/'
const SH_SEARCH_HISTORY = '/seek-help/history/'
const RH_SEARCH_HISTORY = '/help-info/history/'
const DELETE_SH_HISTORY_BY_USER = '/seek-help/delete-all-history'
const DELETE_RH_HISTORY_BY_USER = '/help-info/delete-all-history'
const DELETE_RH_FORUM_BY_ID = '/help-info/delete/'
const DELETE_SH_FORUM_BY_ID = '/seek-help/delete/'
const SH_LIST_BY_USER = '/seek-help/user-list'
const RH_LIST_BY_USER = '/help-info/user-list'
const SH_UPDATE_STATUS_BY_ID = '/seek-help/update-status/'
const RH_UPDATE_STATUS_BY_ID = '/help-info/update-status/'
const CLICK_RENDER_HELP = '/help-info/click/'
const CLICK_SEEK_HELP = '/seek-help/click/'
const END_CLICK_RH = '/help-info/end-click/'
const END_CLICK_SH = '/seek-help/end-click/'
const GET_RH_RECOMMEND = '/help-info/recommend'
const GET_SH_RECOMMEND = '/seek-help/recommend'
const UPDATE_RH_FORUM = '/help-info/update'
const UPDATE_SH_FORUM = '/seek-help/update'
const UPDATE_RH_IMAGE = '/help-info/update-image/'
const UPDATE_SH_IMAGE = '/seek-help/update-image/'
const DELETE_RH_IMAGE = '/help-info/delete-image/'
const DELETE_SH_IMAGE = '/seek-help/delete-image/'

export {
  LOGIN_API,
  GET_TOKEN,
  TOKEN_TEST,
  GET_USER_INFO,
  CHAT_BASE,
  WS_BASE,
  NUCLEIC_OCR,
  FRIEND_LIST,
  CHAT_HISTORY,
  GET_USER_INFO_BYID,
  ACCESS_TOKEN,
  TEMPLATE_ID,
  GET_REPORT_INFORM,
  INSERT_BOOK_INFORM,
  INSERT_TEST_INFORM,
  GET_TEST_INFORM,
  GET_BOOK_INFORM,
  UPDATE_BOOK_INFORM,
  UPDATE_TEST_INFORM,
  UPDATE_REPORT_INFORM,
  UPDATE_BOOK_REMIND,
  UPDATE_REPORT_REMIND,
  UPDATE_TEST_REMIND,
  FINISH_BOOK,
  FINISH_TEST,
  SEND_REMIND,
  CHECK_REMIND,
  DELETE_REMIND,
  TEST_COUNT,
  BOOK_COUNT,
  REPORT_COUNT,
  PUBLISH_SH_DRAFT,
  PUBLISH_RH_DRAFT,
  INSERT_SH_DRAFT_IMG,
  INSERT_RH_DRAFT_IMG,
  QUERY_RH_BY_ID,
  QUERY_SH_BY_ID,
  QUERY_RH_LIST,
  QUERY_SH_LIST,
  SEARCH_RH,
  SEARCH_SH,
  RH_SEARCH_HISTORY,
  SH_SEARCH_HISTORY,
  DELETE_RH_HISTORY_BY_USER,
  DELETE_SH_HISTORY_BY_USER,
  DELETE_RH_FORUM_BY_ID,
  DELETE_SH_FORUM_BY_ID,
  SH_LIST_BY_USER,
  RH_LIST_BY_USER,
  SH_UPDATE_STATUS_BY_ID,
  RH_UPDATE_STATUS_BY_ID,
  UPDATE_USER_INFO,
  CLICK_RENDER_HELP,
  CLICK_SEEK_HELP,
  END_CLICK_RH,
  END_CLICK_SH,
  GET_SH_RECOMMEND,
  GET_RH_RECOMMEND,
  UPDATE_RH_FORUM,
  UPDATE_SH_FORUM,
  UPDATE_SH_IMAGE,
  UPDATE_RH_IMAGE,
  DELETE_RH_IMAGE,
  DELETE_SH_IMAGE,
  
}