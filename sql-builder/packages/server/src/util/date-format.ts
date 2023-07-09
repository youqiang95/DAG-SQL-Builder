// 例子：
// dateFormat(new Date(),  'yyyy-MM-dd hh:mm:ss.SSS')  ==> 2022-11-04 01:47:56.733
export const dateFormat = (dt: Date, fmtParams:string) => {
    let fmt = fmtParams
    var o = {
      "M+": dt.getMonth() + 1, //月份
      "d+": dt.getDate(), //日
      "h+": dt.getHours(), //小时
      "m+": dt.getMinutes(), //分
      "s+": dt.getSeconds(), //秒
      "q+": Math.floor((dt.getMonth() + 3) / 3), //季度
      "S+": dt.getMilliseconds() //毫秒
    }

    const fitStr = (s:string, length:number) =>{
        if(s.length > length){
            return s.substr(-length)
        }
        else if(s.length < length){
            return '0'.repeat(length - s.length) + s
        }
        else{
            return s
        }
    }
    const yearRe = /(y+)/g
    if(yearRe.test(fmt)){
        const fmtYear = fmt.match(yearRe)[0]
        fmt = fmt.replace(fmtYear, fitStr(dt.getFullYear().toString(), fmtYear.length))
    }
    for (var k in o){
        let xRe = new RegExp("(" + k + ")", 'g')
        if(xRe.test(fmt)){
            let fmtX = fmt.match(xRe)[0]
            fmt = fmt.replace(fmtX, fitStr(o[k].toString(), fmtX.length))
        }
    }
    return fmt
}

// 时间戳转换为格式化的时间字符串
// dateTsFormat((new Date()).getTime(), 'yyyy-MM-dd hh:mm:ss.SSS')  ==> 2022-11-04 01:57:55.912
export const dateTsFormat = (ts:number, fmt:string) => {
    const dt = new Date(ts)
    return dateFormat(dt, fmt)

}

export const dateFormatUTC = (dt:Date, fmtParams:string) => {
    let fmt = fmtParams
    var o = {
      "M+": dt.getUTCMonth() + 1, //月份
      "d+": dt.getUTCDate(), //日
      "h+": dt.getUTCHours(), //小时
      "m+": dt.getUTCMinutes(), //分
      "s+": dt.getUTCSeconds(), //秒
      "q+": Math.floor((dt.getUTCMonth() + 3) / 3), //季度
      "S+": dt.getUTCMilliseconds() //毫秒
    }

    const fitStr = (s, length) =>{
        if(s.length > length){
            return s.substr(-length)
        }
        else if(s.length < length){
            return '0'.repeat(length - s.length) + s
        }
        else{
            return s
        }
    }
    const yearRe = /(y+)/g
    if(yearRe.test(fmt)){
        const fmtYear = fmt.match(yearRe)[0]
        fmt = fmt.replace(fmtYear, fitStr(dt.getFullYear().toString(), fmtYear.length))
    }
    for (var k in o){
        let xRe = new RegExp("(" + k + ")", 'g')
        if(xRe.test(fmt)){
            let fmtX = fmt.match(xRe)[0]
            fmt = fmt.replace(fmtX, fitStr(o[k].toString(), fmtX.length))
        }
    }
    return fmt
}

export const dateTsFormatUTC = (ts:number, fmt:string) => {
    const dt = new Date(ts)
    return dateFormatUTC(dt, fmt)

}