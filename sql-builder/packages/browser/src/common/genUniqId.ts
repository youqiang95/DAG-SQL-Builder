import 'reflect-metadata';
import { singleton, container } from 'tsyringe';

@singleton()
class UniqIdGenerator {
    private lastTimeStampStr: string;
    private lastCount: number 
    constructor(){
        this.lastTimeStampStr = new Date().getTime().toString()
        this.lastCount = 0
    }

    public genUniqId = ()=>{
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
              v = c === 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        })
        const ts = new Date().getTime().toString()
        if(ts === this.lastTimeStampStr){
            this.lastCount += 1
        }
        else{
            this.lastTimeStampStr = ts 
            this.lastCount = 0
        }
        return uuid + '-' + ts + '-' + this.lastCount.toString()
    }
  
}

export const genUniqId = () => {
    const uniqIdGenerator = container.resolve(UniqIdGenerator)
    return uniqIdGenerator.genUniqId()
}

