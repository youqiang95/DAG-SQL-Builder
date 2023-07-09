export const serverLogType = 'EasySqlServer'

export const DataWarehouseRunnerUrl = process.env.DATA_WARE_HOUSE_RUNNER_URL

export const processUrlOnLog = (url:string)=>{
    const normalizedUrl = url.replace(/\/+$/g, '/');
    if (normalizedUrl.charAt(normalizedUrl.length - 1) !== '/') {
        return normalizedUrl + '/';
    }
    return normalizedUrl
} 