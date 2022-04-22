// user
const LOGIN_API = '/user/sessionId';
const GET_TOKEN = '/user/login';
const TOKEN_TEST = '/user/test';
const GET_USER_INFO = '/user/query';
const GET_USER_INFO_BYID = '/user/info/'
// chat
const CHAT_BASE = 'http://localhost:9999/message-server/'
// const WS_BASE = 'ws://localhost:9999/message-server/'
const WS_BASE = 'ws://124.223.105.99:8085/'
const FRIEND_LIST = '/user/friend-list'
const CHAT_HISTORY = '/message/get-chat-history'

// OCR
const NUCLEIC_ACID = '/nucleic-acid/info/upload';

export {
  LOGIN_API,
  GET_TOKEN,
  TOKEN_TEST,
  GET_USER_INFO,
  CHAT_BASE,
  WS_BASE,
  NUCLEIC_ACID,
  FRIEND_LIST,
  CHAT_HISTORY,
  GET_USER_INFO_BYID,
}