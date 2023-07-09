
// Reduce the number of requests to the server
const UPDATE_FILE_DELAY = 500
export class UpdateFileAntiSharkService {
    private runTimerMap: Map<string, NodeJS.Timeout>
    constructor(){
        this.runTimerMap = new Map<string, NodeJS.Timeout>()
    }
    public run = (runTimerUniqId:string, func:()=>Promise<boolean>)=>{
        return new Promise<boolean>((resolve, reject)=>{
            if(this.runTimerMap.has(runTimerUniqId)){
                clearTimeout(this.runTimerMap.get(runTimerUniqId))
            }
            const runTimer = setTimeout(()=>{
                func().then((data)=>{
                    resolve(data)
                    this.runTimerMap.delete(runTimerUniqId)
                })
            }, UPDATE_FILE_DELAY)
            this.runTimerMap.set(runTimerUniqId, runTimer)
        })
    }
}



export const updateFileAntiSharkService = new UpdateFileAntiSharkService()