/*****************************************************
 * vue router config
 *
 *****************************************************/
import Vue from 'vue'
import Router from 'vue-router'
import Gallery from 'src/application/Gallery'
import UiGallery from 'src/components/base/UiGallery'
import ServiceGallery from 'src/components/service/serviceGallery'
import Appbridge from 'src/widget/jsBridge/jsApp'
import Cnofound from 'src/application/base/nofound'
Vue.use(Router)

const routerConf = [
  {// 页面 汇总
    path: '/Appbridge',
    name: 'Appbridge',
    components: {
      default: Appbridge
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: 'jsbridge调试'
      },
      exclude: {
        default: 'Appbridge'
      }
    }
  },
  {// 页面 汇总
    path: '/gallery',
    name: 'Gallery',
    components: {
      default: Gallery
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'Gallery'
      }
    }
  },
  {// base ui 组件 汇总
    path: '/uigallery',
    name: 'uigallery',
    components: {
      default: UiGallery
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'uiGallery'
      }
    }
  },
  {// 秘一下举报页
    path: '/report',
    name: 'report',
    components: {
      default: resolve => require(['src/application/miyixia/report'], resolve),
    },
    meta: {
      requireAuth: false,
      exclude:{
        default:'report'
      },
      header: {
        type: 'normal',
        title: '举报'
      }
    }
  },
  {// 秘一下h5分享页
    path: '/comdetail',
    name: 'comdetail',
    components: {
      default: resolve => require(['src/application/miyixia/comdetail'], resolve),
    },
    meta: {
      requireAuth: false,
      exclude:{
        default:'comdetail'
      },
      header: {
        type: 'normal',
        title: '评论'
      }
    }
  },
  {// 团战活动团队页
    path: '/teamdetail',
    name: 'TeamDetail',
    components: {
      default: resolve => require(['src/application/teamact/teamdetail'], resolve),
    },
    meta: {
      requireAuth: false,
      exclude:{
        default:'TeamDetail'
      },
      header: {
        type: 'normal',
        title: '团战'
      }
    }
  },
  {// 团战活动页面
    path: '/teamactivity',
    name: 'teamactivity',
    components: {
      default: resolve => require(['src/application/teamact/teamactivity'], resolve),
    },
    meta: {
      requireAuth: false,
      exclude:{
        default:'teamactivity'
      },
      header: {
        type: 'normal',
        title: '7.7团战活动'
      }
    }
  },
  {// pk详情页面
    path: '/pkdetail',
    name: 'PkDetail',
    components: {
      default: resolve => require(['src/application/pk/pkdetail'], resolve),
    },
    meta: {
      requireAuth: false,
      exclude:{
         default:'PkDetail'
      },
      header: {
        type: 'normal',
        title: '团战活动'
      }
    }
  },
  {// pk活动页面
    path: '/pkact',
    name: 'pkact',
    components: {
      default: resolve => require(['src/application/pk/pkact'], resolve),
    },
    meta: {
      requireAuth: false,
      exclude:{
        default:'pkact'
      },
      header: {
        type: 'normal',
        title: 'PK对战活动'
      }
    }
  },
  {// 邀请注册
    path: '/inviteregister',
    name: 'InviteRegister',
    components: {
      default: resolve => require(['src/application/passport/inviteRegister'], resolve),
    },
    meta: {
      requireAuth: true,
      header: {
        type: 'normal',
        title: '注册保啊'
      }
    }
  },
  {// 用户 中心
    path: '/usercenter',
    name: 'UserCenter',
    components: {
      default: resolve => require(['src/application/usercenter/userCenter'], resolve),
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'home',
        title: '用户中心'
      }
    }
  },
  {// 我的福利
    path: '/myweal',
    name: 'MyWeal',
    components: {
      default: resolve => require(['src/application/usercenter/myWeal'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'MyWeal'
      },
      header: {
        type: 'normal',
        title: '我的福利'
      }
    }
  },
  {// 我的好友
    path: '/myfriend',
    name: 'MyFriend',
    components: {
      default: resolve => require(['src/application/usercenter/myFriend'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'MyFriend'
      },
      header: {
        type: 'normal',
        title: '我的好友'
      }
    }
  },
  {// 我的好友
    path: '/mytask',
    name: 'MyTask',
    components: {
      default: resolve => require(['src/application/usercenter/mytask'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'MyTask'
      },
      header: {
        type: 'normal',
        title: '我的任务'
      }
    }
  },
  {// 个人中心常见问题
    path: '/commonquestion',
    name: 'commonQuestion',
    components: {
      default: resolve => require(['src/application/usercenter/commonquestion'], resolve),
    },
    meta: {
      requireAuth: false,
      exclude:{
        default:'commonquestion'
      },
      header: {
        type: 'normal',
        title: '常见问题'
      }
    }
  },
  {// 个人中心邀请好友
    path: '/invitefriends',
    name: 'inviteFriends',
    components: {
      default: resolve => require(['src/application/usercenter/inviteFriends'], resolve),
    },
    meta: {
      requireAuth: false,
      exclude:{
        default:'inviteFriends'
      },
      header: {
        type: 'normal',
        title: '邀请好友'
      }
    }
  },
  {// 用户注册协议
    path: '/useragree',
    name: 'UserAgree',
    components: {
      default: resolve => require(['src/application/notice/userAgree'], resolve),
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '注册协议'
      }
    }
  },
  {// 我的 账户
    path: '/myaccount',
    name: 'MyAccount',
    components: {
      default: resolve => require(['src/application/myaccount/myAccount'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'MyAccount'
      },
      header: {
        type: 'normal',
        title: '我的账户',
        rightMenu: {text:'余额明细',cbname:'goAccontDetail',show:true}
      }
    }
  },
  {// 指纹登陆
    path: '/fingerlogin',
    name: 'FingerLogin',
    components: {
      default: resolve => require(['src/application/usercenter/fingerLogin'], resolve),
    },
    meta: {
      requireAuth: true,
      header: {
        type: 'normal',
        title: '指纹登陆'
      }
    }
  },
  {// 银行卡列表
    path: '/cardlist',
    name: 'CardList',
    components: {
      default: resolve => require(['src/application/usercenter/cardList'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'CardList'
      },
      header: {
        type: 'normal',
        title: '我的银行卡'
      }
    }
  },
  {// 余额明细
    path: '/remaindetail',
    name: 'RemainDetail',
    components: {
      default: resolve => require(['src/application/myaccount/remainDetail'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'RemainDetail'
      },
      header: {
        type: 'normal',
        title: '余额明细'
      }
    }
  },
  {// 提现
    path: '/gocash',
    name: 'GoCash',
    components: {
      default: resolve => require(['src/application/myaccount/goCash'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'GoCash'
      },
      header: {
        type: 'normal',
        title: '提现',

      }
    }
  },
  {// 提现成功
    path: '/gocashsuc',
    name: 'GoCashSuc',
    components: {
      default: resolve => require(['src/application/myaccount/goCashSuc'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'GoCashSuc'
      },
      header: {
        type: 'normal',
        title: '提先成功'
      }
    }
  },
  {// 添加银行卡
    path: '/addbankcard',
    name: 'AddBankCard',
    components: {
      default: resolve => require(['src/application/myaccount/addBankCard'], resolve),
    },

    meta: {
      requireAuth: true,
      header: {
        type: 'normal',
        title: '添加银行卡'
      }
    }
  },
  {// 常见问题页
    path: '/quespage',
    name: 'QuesPage',
    components: {
      default: resolve => require(['src/application/myaccount/quesPage'], resolve),
    },
    meta: {
      requireAuth: true,
      header: {
        type: 'normal',
        title: '常见问题'
      }
    }
  },
  {// 添加银行卡卡号
    path: '/cardnum',
    name: 'CardNum',
    components: {
      default: resolve => require(['src/application/usercenter/cardNum'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'CardNum'
      },
      header: {
        type: 'normal',
        title: '银行卡卡号'
      }
    }
  },
  {// 添加银行卡卡号，手机号
    path: '/cardphone',
    name: 'CardPhone',
    components: {
      default: resolve => require(['src/application/usercenter/cardPhone'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'CardPhone'
      },
      header: {
        type: 'normal',
        title: '手机号'
      }
    }
  },
  {// 添加银行卡后短信验证码
    path: '/cardidentify',
    name: 'CardIdentify',
    components: {
      default: resolve => require(['src/application/usercenter/cardIdentify'], resolve),
    },
    meta: {
      requireAuth: true,
      header: {
        type: 'normal',
        title: '短信验证码'
      }
    }
  },
  {// 设置
    path: '/settingpage',
    name: 'SettingPage',
    components: {
      default: resolve => require(['src/application/usercenter/settingPage'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'SettingPage'
      },
      header: {
        type: 'normal',
        title: '设置'
      }
    }
  },
  {// 修改登陆密码
    path: '/changepas',
    name: 'ChangePas',
    components: {
      default: resolve => require(['src/application/usercenter/changePas'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'ChangePas'
      },
      header: {
        type: 'normal',
        title: '修改登陆密码'
      }
    }
  },
  {// 修改绑定手机
    path: '/changephone',
    name: 'ChangePhone',
    components: {
      default: resolve => require(['src/application/usercenter/changePhone'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'ChangePhone'
      },
      header: {
        type: 'normal',
        title: '修改绑定手机号'
      }
    }
  },
  {// 设置支付密码
    path: '/setpaypas',
    name: 'SetPayPas',
    components: {
      default: resolve => require(['src/application/usercenter/setPayPas'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'setPayPas'
      },
      header: {
        type: 'normal',
        title: '设置支付密码'
      }
    }
  },
  {// app支付页面
    path: '/apppaypage',
    name: 'AppPayPage',
    components: {
      default: resolve => require(['src/application/paypage/appPayPage'], resolve),
    },
    meta: {
      requireAuth: true,
      header: {
        type: 'normal',
        title: '支付'
      }
    }
  },
  {// h5支付页面
    path: '/h5paypage',
    name: 'H5PayPage',
    components: {
      default: resolve => require(['src/application/paypage/h5PayPage'], resolve),
    },
    meta: {
      requireAuth: true,
      header: {
        type: 'normal',
        title: '支付'
      }
    }
  },
  {// h5直接支付
    path: '/h5gopay',
    name: 'H5GoPay',
    components: {
      default: resolve => require(['src/application/paypage/h5GoPay'], resolve),
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '支付'
      },

    }
  },
  {// 关注微信号
    path: '/subsucc',
    name: 'SubSucc',
    components: {
      default: resolve => require(['src/application/insure/subSucc'], resolve),
    },
    exclude: {
        default: 'SubSucc'
      },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '提交成功',
        leftMenu: {show:false}
      }
    }
  },
  {// 银行卡支付页面
    path: '/bankpay',
    name: 'BankPay',
    components: {
      default: resolve => require(['src/application/paypage/bankPay'], resolve),
    },
    meta: {
      requireAuth: true,
      header: {
        type: 'normal',
        title: '支付'
      }
    }
  },
  {// 保单信息
    path: '/policyinfo',
    name: 'PolicyInfo',
    components: {
      default: resolve => require(['src/application/insurancepolicy/policyInfo'], resolve),
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '保单信息'
      }
    }
  },
  {// 保单签名
    path: '/policysign',
    name: 'PolicySign',
    components: {
      default: resolve => require(['src/application/insurancepolicy/policySign'], resolve),
    },
    meta: {
      requireAuth: false,
      exclude: {
        default: 'PolicySign'
      },
      header: {
        type: 'normal',
        title: '签名'
      }
    }
  },
  {// 保单列表
    path: '/policylist',
    name: 'PolicyList',
    components: {
      default: resolve => require(['src/application/insurancepolicy/policyList'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'PolicyList'
      },
      header: {
        type: 'normal',
        title: '我的保单'
      }
    }
  },
  {// 保单详情
    path: '/policydetail',
    name: 'PolicyDetail',
    components: {
      default: resolve => require(['src/application/insurancepolicy/policyDetail'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'PolicyDetail'
      },
      header: {
        type: 'normal',
        title: '详情'
      }
    }
  },
  {// 订单列表
    path: '/orderlist',
    name: 'OrderList',
    components: {
      default: resolve => require(['src/application/orders/orderList'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'OrderList'
      },
      header: {
        type: 'normal',
        title: '我的投保单',
        rightMenu: {image:'icon_search',cbname:'goSearch',show:true}
      }
    }
  },
  {// 订单详情
    path: '/orderdetail',
    name: 'OrderDetail',
    components: {
      default: resolve => require(['src/application/orders/detail'], resolve),
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'OrderDetail'
      },
      header: {
        type: 'normal',
        title: '保单详情'
      }
    }
  },
  {// 搜索保单
    path: '/searchpolicy',
    name: 'SearchPolicy',
    components: {
      default: resolve => require(['src/application/orders/searchPolicy'], resolve),
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '搜索订单',
        rightMenu: ""
      }
    }
  },
  {// 电子签约
    path: '/electronicsign',
    name: 'ElectronicSign',
    components: {
      default: resolve => require(['src/application/advertisement/electronicSign'], resolve),
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '电子签约'
      }
    }
  },
  {// 实名认证。身份信息
    path: '/identification',
    name: 'Identification',
    components: {
      default: resolve => require(['src/application/advertisement/identification'], resolve),
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '身份认证'
      }
    }
  },
  {// 业务 组件 汇总
    path: '/servicegallery',
    name: 'servicegallery',
    components: {
      default: ServiceGallery
    },
    meta: {
      requireAuth: true,
      exclude: {
        default: 'serviceGallery'
      }
    }
  },
  {// 默认首页
    path: '/',
    name: 'home',
    components: {
      default: resolve => require(['src/application/home'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'index',
        title: '首页'
      },
      exclude: {
        default: 'home'
      }
    }
  },
  // {
  //   path: '/login', //用户登录
  //   name: 'login',
  //   components: {
  //     default: resolve => require(['src/application/passport/Login'], resolve),
  //     // nav: Navigation
  //   },
  //   meta: {
  //     title: '登录'
  //   }
  // },
  // {
  //   path: '/signup', //注册用户
  //   name: 'signup',
  //   components: {
  //     default: resolve => require(['src/application/passport/Signup'], resolve),
  //     // nav: Navigation
  //   },
  //   meta: {
  //     title: '注册'
  //   }
  // },
  // {
  //   path: '/forgetPwd', //忘记密码
  //   name: 'forgetPwd',
  //   components: {
  //     default: resolve => require(['src/application/passport/ForgetPwd'], resolve),
  //     // nav: Navigation
  //   },
  //   meta: {
  //     title: '忘记密码'
  //   }
  // },
  {
    path: '/trial/:productcode', // 投保试算
    name: 'trial',
    components: {
      default: resolve => require(['src/application/insure/trial'], resolve)
      // nav: navigation
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '产品信息填写'
      },
      exclude: {
        default: 'trial'
      }
    }
  },
  {
    path: '/convertPlan/:productcode', // 生成计划书
    name: 'convertPlan',
    components: {
      default: resolve => require(['src/application/insure/convertPlan'], resolve)
      // nav: navigation
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '生成计划书'
      },
      exclude: {
        default: 'convertPlan'
      }
    }
  },
  {
    path: '/order/:productcode', // 订单
    name: 'order',
    components: {
      default: resolve => require(['src/application/insure/order'], resolve)
      // nav: navigation
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '填写投保信息',
        rightMenu: {text:'暂存',cbname:'savePolicy',show:true}
      },
      exclude: {
        default: 'order'
      }
    }
  },
  {
    // 产品条款003
    path: '/atZA0003',
    name: 'atZA0003',
    components: {
      default: resolve => require(['src/application/notice/at_za0003'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '产品条款'
      },
      exclude: {
        default: 'atZA0003'
      }
    }
  },
  {
    // 代扣协议za0002
    path: '/transferZA0002',
    name: 'transferZA0002',
    components: {
      default: resolve => require(['src/application/notice/transfer_za0002'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '银行代扣协议'
      },
      exclude: {
        default: 'transferZA0002'
      }
    }
  },
  {
    // 代扣协议za0003
    path: '/transferZA0003',
    name: 'transferZA0003',
    components: {
      default: resolve => require(['src/application/notice/transfer_za0003'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '银行代扣协议'
      },
      exclude: {
        default: 'transferZA0003'
      }
    }
  },
  {
    //  长城条款0002
    path: '/atZA0002',
    name: 'atZA0002',
    components: {
      default: resolve => require(['src/application/notice/at_za0002'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '产品条款'
      },
      exclude: {
        default: 'atZA0002'
      }
    }
  },
  {
    // 主险产品条款0002
    path: '/mainatZA0002',
    name: 'mainatZA0002',
    components: {
      default: resolve => require(['src/application/notice/main_at_za0002'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '主险产品条款'
      },
      exclude: {
        default: 'mainatZA0002'
      }
    }
  },
  {
    // 附加险产品条款0002
    path: '/fjatZA0002',
    name: 'fjatZA0002',
    components: {
      default: resolve => require(['src/application/notice/fj_at_za0002'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '附加险产品条款'
      },
      exclude: {
        default: 'fjatZA0002'
      }
    }
  },
  {
    // 豁免险产品条款0002
    path: '/hmatZA0002',
    name: 'hmatZA0002',
    components: {
      default: resolve => require(['src/application/notice/hm_at_za0002'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '豁免险产品条款'
      },
      exclude: {
        default: 'hmatZA0002'
      }
    }
  },
  {
    // 投保须知
    path: '/noticeZA0003',
    name: 'noticeZA003',
    components: {
      default: resolve => require(['src/application/notice/notice_za0003'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '投保须知'
      },
      exclude: {
        default: 'noticeZA003'
      }
    }
  },
  {
    path: '/uploadIdentity', // 上传银行卡和身份证 ORC识别
    name: 'uploadIdentity',
    components: {
      default: resolve => require(['src/application/insure/uploadIdentity'], resolve)
      // nav: navigation
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '上传证件和银行卡'
      },
      exclude: {
        default: 'uploadIdentity'
      }
    }
  },
  {// 字典查询 选择职业
    path: '/selectjob',
    name: 'selectjob',
    components: {
      default: resolve => require(['src/application/dictionary/selectjob'],resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '职业选择'
      },
      exclude: {
        // default: 'selectjob'
      }
    }
  },
  {// 字典查询 查询职业
    path: '/findjob',
    name: 'findjob',
    components: {
      default: resolve => require(['src/application/dictionary/findjob'],resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '职业查询类别'
      },
      exclude: {
        default: 'findjob'
      }
    }
  },
  {// 订单结果
    path: '/orderResult',
    name: 'orderResult',
    components: {
      default: resolve => require(['src/application/insure/result'],resolve)
    },
    meta: {
      requireAuth: false,
      exclude: {
        default: 'orderResult'
      },
      header: {
        type: 'normal',
        title: '订单结果'
      }
    }
  },
  {//系统消息
    path: '/messages',
    name: 'messages',
    components: {
      default: resolve => require(['src/application/message'],resolve)
    },
    meta: {
      requireAuth: true,
      header: {
        type: 'normal',
        title: '系统消息'
      },
      exclude: {
        default: 'messages'
      }
    }
  },
  {//消息中心 (活动)
    path: '/messagecenter',
    name: 'messagecenter',
    components: {
      default: resolve => require(['src/application/message/messagecenter'],resolve)
    },
    meta: {
      requireAuth: true,
      header: {
        type: 'normal',
        title: '消息中心'
      },
      exclude: {
        default: 'messagecenter'
      }
    }
  },
  {//精选活动 (活动)
    path: '/highselectactivity',
    name: 'highselectactivity',
    components: {
      default: resolve => require(['src/application/message/highselectactivity'],resolve)
    },
    meta: {
      requireAuth: true,
      header: {
        type: 'normal',
        title: '精选活动'
      },
      exclude: {
        default: 'highselectactivity'
      }
    }
  },
  {//消息中心详情
    path: '/detailsmessage',
    name: 'detailsmessage',
    components: {
      default: resolve => require(['src/application/message/detailsmessage'],resolve)
    },
    meta: {
      requireAuth: true,
      header: {
        type: 'normal',
        title: '消息详情'
      },
      exclude: {
        default: 'detailsmessage'
      }
    }
  },
  {//秘一下举报 处理说明
    path: '/reportresult',
    name: 'reportresult',
    components: {
      default: resolve => require(['src/application/message/reportResult'],resolve)
    },
    meta: {
      requireAuth: true,
      header: {
        type: 'normal',
        title: '处理说明'
      },
      exclude: {
        default: 'reportresult'
      }
    }
  },
  {// 投保结果成功页
    path: '/resultsucc',
    name: 'resultSucc',
    components: {
      default: resolve => require(['src/application/result/resultsucc'], resolve)
    },
    meta: {
      requireAuth: true,
      title: '查看投保结果',
      exclude: {
        default: 'resultsucc'
      }
    }
  },
  {// 投保结果支付失败页
    path: '/resultfail',
    name: 'resultfail',
    components: {
      default: resolve => require(['src/application/result/resultfail'], resolve)
    },
    meta: {
      requireAuth: true,
      title: '查看投保结果',
      exclude: {
        default: 'resultfail'
      }
    }
  },
  {// 投保结果人工核保页
    path: '/resultmanual',
    name: 'resultmanual',
    components: {
      default: resolve => require(['src/application/result/resultmanual'], resolve)
    },
    meta: {
      requireAuth: true,
      title: '查看投保结果',
      exclude: {
        default: 'resultmanual'
      }
    }
  },
  {// 投保结果自核失败页
    path: '/resultfailself',
    name: 'resultfailself',
    components: {
      default: resolve => require(['src/application/result/resultfailself'], resolve)
    },
    meta: {
      requireAuth: true,
      title: '查看投保结果',
      exclude: {
        default: 'resultfailself'
      }
    }
  },
  {
    // 产品详情
    path: '/detail1',
    name: 'detail1',
    components: {
      default: resolve => require(['src/application/product/detail1'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '产品详情'
      },
      exclude: {
        default: 'detail1'
      }
    }
  },
  {
    // 产品详情
    path: '/detail2',
    name: 'detail2',
    components: {
      default: resolve => require(['src/application/product/detail2'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '产品详情'
      },
      exclude: {
        default: 'detail2'
      }
    }
  },
  {
    // 产品详情
    path: '/detail/ZA0003',
    name: 'detail3',
    components: {
      default: resolve => require(['src/application/product/detail3'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '产品详情',
        rightMenu: {text:'分享',cbname:'detailShare3',show:true}
      },
      exclude: {
        default: 'detail3'
      }
    }
  },
  {
    // 产品详情
    path: '/detail4',
    name: 'detail4',
    components: {
      default: resolve => require(['src/application/product/detail4'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '产品详情'
      },
      exclude: {
        default: 'detail4'
      }
    }
  },
  {
    // 产品详情
    path: '/detail/ZA0002',
    name: 'detail5',
    components: {
      default: resolve => require(['src/application/product/detail5'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '产品详情',
        rightMenu: {text:'分享',cbname:'detailShare5',show:true}
      },
      exclude: {
        default: 'detail5'
      }
    }
  },
  {
    // 产品详情g
    path: '/detail6',
    name: 'detail6',
    components: {
      default: resolve => require(['src/application/product/detail6'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '产品详情'
      },
      exclude: {
        default: 'detail6'
      }
    }
  },
  {
    // 计划书
    path: '/plan',
    name: 'plan',
    components: {
      default: resolve => require(['src/application/plan'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '计划书'
      },
      exclude: {
        default: 'plan'
      }
    }
  },
  {
    // 去下载保啊
    path: '/godownload',
    name: 'GoDownload',
    components: {
      default: resolve => require(['src/application/base/goDownload'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '注册保啊'
      }
    }
  },
  {
    // 计划书列表
    path: '/planlist',
    name: 'planlist',
    components: {
      default: resolve => require(['src/application/plan/list'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '计划书列表'
      },
      exclude: {
        default: 'list'
      }
    }
  },
  {
    // 身份认证 - 身份证拍摄
    path: '/auth',
    name: 'authidcard',
    components: {
      default: resolve => require(['src/application/advertisement'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '身份证拍摄'
      },
      exclude: {
        default: 'advertisement'
      }
    }
  },
  {
    // 身份认证 - 人脸识别
    path: '/authface',
    name: 'authface',
    components: {
      default: resolve => require(['src/application/advertisement/faceproc'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '人脸识别'
      },
      exclude: {
        default: 'faceproc'
      }
    }
  },
  {
    // 身份认证 - 认证成功
    path: '/authsucc',
    name: 'authsucc',
    components: {
      default: resolve => require(['src/application/advertisement/succ'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '认证成功'
      },
      exclude: {
        default: 'succ'
      }
    }
  },
  {
    // 健康告知 长城0002
    path: '/health/ZA0002',
    name: 'healthZA0002',
    components: {
      default: resolve => require(['src/application/notice/health_za0002'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '健康告知'
      },
      exclude: {
        default: 'healthZA0002'
      }
    }
  },
  {
    // 健康告知 国泰0003
    path: '/health/ZA0003',
    name: 'healthZA0003',
    components: {
      default: resolve => require(['src/application/notice/health_za0003'], resolve)
    },
    meta: {
      requireAuth: false,
      header: {
        type: 'normal',
        title: '健康告知'
      },
      exclude: {
        default: 'healthZA0003'
      }
    }
  },
  {
    path: '*/*',
    name: 'nofound',
    components: {
      default: Cnofound
    },
    meta: {
      requireAuth: false
    }
  }
// {// login 登陆 页面
//   path: '/login',
//   name: 'login',
//   components: {
//     default: Gallery,
//     sidebar: Hello
//   },
//   meta: {
//     requireAuth: false,
//     exclude: {
//       default: 'Gallery',
//       sidebar: 'Hello'
//     }
//   }
// }
]
const router = new Router({
  routes: routerConf,
  mode: 'hash',
  base: __dirname,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

/**************************************
 * 路由跳转前
 **************************************/
let vueinstance = new Vue()
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(process.env.NODE_ENV !== 'development'){
      // alert(cookie.get('ZATECH1000100'))
      if(cookie.get('http_ostype')) {
        if(!cookie.get('token')) {
          // alert('show login')
          jsBridge.callLogin()
          next()
        } else {
          // alert('has login')
        }
      } else {
        // alert('not app')
        // 非App访问, 拦截逻辑
      }
    }
    next()
  } else {
    next() // 确保一定要调用 next()
  }
})


export default router
