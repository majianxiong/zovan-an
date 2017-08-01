import {
  Validator
} from 'vee-validate'
const validator = new Validator()
const msgFormatError = '格式错误'

let trimStr = function (str) {
  return str ? str.replace(/(^\s*)|(\s*$)/g, "") : ''
}

export const checker = {
  messages: {
    cn: (field, args) => {
      // field is data-vv-name
      return '请勾选' + field
    }
  },
  validate: (value, args) => {
    const ret = value == 'checked'
    return ret
  }
}

Validator.extend('checkbox', checker)

export const isMobile = {
  messages: {
    cn: (field, args) => field + '必须是11位手机号码'
  },
  validate: (value, args) => {
    return trimStr(value).length === 11 && /^1[345789]\d{9}$/.test(value)
  }
}

Validator.extend('mobile', isMobile)

export const isIdCard = {
  messages: {
    cn: (field, args) => field + msgFormatError
  },
  validate: (value, args) => {
    let num = trimStr(value)
    let ret = false
    //  身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(num))) {
      return ret
    }

    //  校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //  下面分别分析出生日期和校验位
    let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    let nTemp = 0
    let i = null
    let len = num.length
    let re = null
    let arrSplit = null
    let dtmBirth = null
    if (len === 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/i)
      arrSplit = num.match(re)
      //  检查生日日期是否正确
      dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      if (dtmBirth != 'Invalid Date') {
        //  将15位身份证转成18位
        //  校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }

        num += arrCh[nTemp % 11]
      }
    } else if (len === 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/i)
      arrSplit = num.match(re)
      // 检查生日日期是否正确
      dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4])
      if (dtmBirth != 'Invalid Date') {
        // 检验18位身份证的校验码是否正确。
        // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        let valnum
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        valnum = arrCh[nTemp % 11]
        if (valnum === num.substr(17, 1).toUpperCase()) {
          ret = true
        }
      }
    }
    return ret
  }
}

Validator.extend('idcard', isIdCard)

export const isBankCard = {
  messages: {
    cn: (field, args) => field + msgFormatError
  },
  validate: (value, args) => {
    return /^\d{16}|\d{19}$/.test(trimStr(value))
  }
}

Validator.extend('bankcard', isBankCard)

export const isTelephoneNo = {
  messages: {
    cn: (field, args) => field + msgFormatError
  },
  validate: (value, args) => {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(trimStr(value))
  }
}

Validator.extend('tel', isTelephoneNo)

export const isPassword = {
  messages: {
    cn: (field, args) => field + msgFormatError
  },
  validate: (value, args) => {
    let len = trimStr(value).length
    if (len < 6 || len > 20) {
      return false
    }
    return /^(?![^a-zA-Z]+$)(?!\D+$)/.test(trimStr(value))
  }
}

Validator.extend('password', isPassword)

export const isCNname = {
  messages: {
    cn: (field, args) => field + msgFormatError
  },
  validate: (value, args) => {
    return /^[\u4e00-\u9fa5]{2,10}$/.test(trimStr(value))
  }
}

Validator.extend('cnname', isCNname)

//  idcard info getters
export const getBirthday = (idcard) => {
  // if (!validator.validate('idcard', idcard)) {
  //   return false
  // }
  let birthday = ''
  let code = trimStr(idcard) || ''
  if (code.length === 15) {
    birthday = '19' + code.substr(6, 6)
  } else if (code.length === 18) {
    birthday = code.substr(6, 8)
  } else {
    return false
  }
  if (birthday) {
    birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
  }
  return birthday
}

export const getAge = (date) => {
  let returnAge
  let strBirthdayArr = date.split("-")
  let birthYear = strBirthdayArr[0]
  let birthMonth = strBirthdayArr[1]
  let birthDay = strBirthdayArr[2]

  let d = new Date()
  let nowYear = d.getFullYear()
  let nowMonth = d.getMonth() + 1
  let nowDay = d.getDate()
  console.log(nowYear)
  console.log(birthYear)
  if( nowYear == birthYear ) {
     returnAge = 0//同年 则为0岁
  } else {
     let ageDiff = nowYear - birthYear  //年之差
     if(ageDiff > 0) {
         if(nowMonth == birthMonth) {
             let dayDiff = nowDay - birthDay//日之差
             if(dayDiff < 0) {
                 returnAge = ageDiff - 1
             }
             else {
                 returnAge = ageDiff
             }
         }
         else {
             let monthDiff = nowMonth - birthMonth//月之差
             if(monthDiff < 0) {
                 returnAge = ageDiff - 1
             }
             else {
                 returnAge = ageDiff
             }
         }
     } else {
       returnAge = -1// 返回-1 表示出生日期输入错误 晚于今天
     }
  }
  console.log(returnAge)
  return returnAge//  返回周岁年龄
}

export const getGender = (code) => {
  // if (!validator.validate('idcard', code)) {
  //   return false
  // }
  return parseInt(code.substr(-2, 1)) % 2 === 1 ? '男' : '女'
}
