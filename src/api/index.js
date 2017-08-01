// axios instance options & export object
// import axios from 'axios'
// // console.log(axios)
// let instance = axios.create({
//   // timeout: 100
//   // headers: {
//   //   // Accept : "application/json, text/plain, */*",
//   //   // ContentType : "application/json;charset=utf-8",
//   //   timeout: 15000
//   // }
// })
//
// // console.log(instance)
// // Override timeout default for the library
// // Now all requests will wait 2.5 seconds before timing out
// export let ajax = {
//   get: function (url, data, timeout) {
//     instance.defaults.timeout = timeout
//     return instance.get(url, data)
//   },
//   post: function (url, data, timeout) {
//     instance.defaults.timeout = timeout
//     return instance.post(url, data)
//   }
// }

/**********************************************
*example:
*method:GET
*export const AJAXAPI = 'example/ajaxuri'
*descript:AJAXAPI 用于展示例子
***********************************************/
export const bannerListApi = '/bannerlist' // 首页banner
export const productSortApi = '/productSort' // 首页产品分类
export const productListApi = '/productList' // 首页产品分类
export const smsApi = '/smsApi' // 短信验证
export const forgetPwdApi = '/forgetPwdApi' // 忘记密码
export const loginApi = '/loginApi' // 登录
export const logoutApi = '/logoutApi' // 登出
export const signupApi = '/signupApi' // 注册
export const extensionCodeApi = '/extensionCodeApi' // 推广码
export const getDetailData = '/detaildata' // 获取详情页数据
export const userInfoApi = '/getUserInfoApi' // 获取用户信息
export const msgApi = '/getMsg' // 站内信

export const trialInitApi = '/getTrail' // 站内信

export const baseUrl = '//pkufi-perftest.zhongan.io'
export const teamList = baseUrl + '/pluto/activity/team/detail' //所有团列表接口
export const createTeam = baseUrl + '/pluto/activity/team/save' //建团接口
export const getActivity = baseUrl +'/pluto/activity/'//获取活动详情
export const getTeamList = baseUrl +'/pluto/activity/teamUser/list'//团队列表
export const getTeamDetail = baseUrl +'/pluto/activity/teamUser/detail'//团队列表
export const joinTeam = baseUrl +'/pluto/activity/teamUser/save'//参团接口

export const registerApi = baseUrl + '/pluto/loginuser/register' // 用户注册
export const isExistApi = baseUrl + '/pluto/loginuser/isexist/' // 是否注册
export const getUserInfoApi = baseUrl + '/pluto/loginuser/user' // 获取用户信息
export const myFriendApi = baseUrl + '/pluto/loginuser/friend/list/' // 我的好友
export const myTaskApi = baseUrl + '/pluto/activity/team/activityTeamTask' // 我的任务
export const changeLogPas = baseUrl + '/pluto/loginuser/loginpwd' //修改登陆密码
export const accountInfoApi = baseUrl + '/pluto/account/acct' //获取账户信息
export const getMsgCodeApi = baseUrl +'/pluto/sms'//获取验证码
export const changeLogMobApi = baseUrl +'/pluto/loginuser/mobile'//更改登录手机号
export const messageCodeApi = baseUrl + '/pluto/sms/validate'//短信验证码
export const changePayPas = baseUrl + '/pluto/account/paypwd' // 修改支付密码
export const changeMobile = baseUrl + '/pluto/loginuser/mobile' // 修改手机号
export const identificationApi =baseUrl + '/pluto/identity/verify' //广告签约
export const policyListApi = baseUrl + '/policy' //我的保单列表
export const policyDetailApi = baseUrl + '/policy/detail' //我的保单详情
export const goPayApi = baseUrl + '/policy/pay' //直接支付
export const addBankCardApi = baseUrl + '/bill/bankCard'//添加银行卡
export const BankCardListApi = baseUrl + '/bill/bankCard'//银行卡列表
export const remainDetailApi = baseUrl + '/bill/fundsRecord'//账户流水记录
export const goCashApi = baseUrl +'/bill/cash'//账户提现
export const trialInitialApi = '/getTrialInitial' // 试算页面初始化
export const policySignApi = baseUrl + '/policy/signature' // 试算页面初始化
export const invitefriendsApi = baseUrl + '/pluto/loginuser/inviter/qrcode/' //个人中心邀请好友二维码

export const planApi = baseUrl +'/policy/planProduct/detail/' // 计划书
export const planListApi = baseUrl +'/policy/planProduct/' // 计划书列表
export const deletePlanApi = baseUrl +'/policy/planProduct/deleteProposal' // 删除计划书
export const authApi = baseUrl +'/pluto/loginuser/user/authentication' // 身份认证
export const authFaceApi = baseUrl +'/authface' // 人脸识别
export const authSuccApi = baseUrl +'/authsucc' // 认证成功
export const trialApi = baseUrl +'/policy/premiumRate/calculatePremiums' // 试算


export const convertPlanApi = baseUrl +'/policy/planProduct' // 生成计划书
export const tansformIdcardApi = baseUrl +'/pluto/oss/putbase64'
export const insuranceApi = baseUrl +'/policy/insurance/images'

export const getRegionApi = baseUrl +'/policy/region'
// export const getDebitCardListApi = baseUrl +'/bill/bankUnit'//银行卡列表
export const getDebitCardListApi = baseUrl +'/policy/insurance/BankList/'// 银行卡列表
//
export const getCardBinApi = baseUrl +'/pluto/openapi/bankcard/info/'// 银行卡卡bin信息

export const getProductInfo = baseUrl +'/policy/product/'// 保险产品基本信息
export const checkOrder = baseUrl +'/policy'//  投保
export const savePolicyApi = baseUrl +'/policy/savePolicy'//  暂存保单录入信息

// ocr
export const getIdcardInfo = baseUrl +'/pluto/orc/orc'// 身份证信息orc

// dictionary
export const getProfessionApi = baseUrl +'/policy/Profession'//职业查询
export const wechatSignApi = baseUrl +'/promotion/signature' // 微信验签

export const messageListApi = baseUrl + '/pluto/message/list' // 消息列表

export const headUploadApi = baseUrl + '/pluto/loginuser/headimage/upload' // 头像上传
