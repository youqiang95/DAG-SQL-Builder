

export interface IParentNodeInfo {
    columns: string[],
    label: string
}

export class SQLTemplate {
    private parentNodeInfoArray: IParentNodeInfo[];
  
    constructor(pInfoArray: IParentNodeInfo[]) {
      this.parentNodeInfoArray = pInfoArray
    }

    public getParentNodeInfo(){
        return this.parentNodeInfoArray
    }

    public generate(options: any){
        return ''
    }
}