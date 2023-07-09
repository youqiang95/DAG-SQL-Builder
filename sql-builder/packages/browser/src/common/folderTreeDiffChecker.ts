import molecule from '@dtinsight/molecule'
import crypto from 'crypto'

const stringToMd5 = (value: string)=>{
    const md5 = crypto.createHash('md5')
    return md5.update(value).digest('hex')
}

type FolderTreeDataType = molecule.model.IFolderTreeNodeProps

export interface IFolderTreeNodeSyncData {
    name: string;
    isLeaf: boolean;
    md5?: string;
    children?: IFolderTreeNodeSyncData[],
}

export interface IFolderTreeDiffInfo {
    key: 'update' | 'remove';
    data: FolderTreeDataType;
    prefix: string[]
}

const searchChild = (tree: FolderTreeDataType | IFolderTreeNodeSyncData, name:string) => {
    if(tree.children && tree.children.length>0){
        for(let child of tree.children){
            if(child.name === name) return {...child}
        }
        return null 
    }
    else 
        return null 
}

export const diffCheck = (frontData:FolderTreeDataType | null, backendSyncData: IFolderTreeNodeSyncData| null, prefix=[]) => {
    if(!frontData) return []
    if(!backendSyncData) return [{
        key: 'update',
        data: frontData,
        prefix: prefix
    }]
    if(frontData.isLeaf !== backendSyncData.isLeaf) return [{
        key: 'update',
        data: frontData,
        prefix: prefix
    }]

    // file
    if(frontData.isLeaf){
        const frontMd5 = stringToMd5(frontData.data.value || '')
        if(frontMd5 === backendSyncData.md5) return []
        else return [{
            key: 'update',
            data: frontData,
            prefix: prefix
        }]
    }
    // folder
    else {
        let retValue = []
        // remove backend unnecessary data
        if(backendSyncData.children && backendSyncData.children.length>0){
            for(let childBack of backendSyncData.children){
                const childFront = searchChild(frontData, childBack.name)
                if(!childFront)
                    retValue = [...retValue, {
                        key: 'remove',
                        name: backendSyncData.name,
                        prefix: prefix
                    }]
            }
        }
        if(frontData.children && frontData.children.length>0){
            for(let childFront of frontData.children){
                const childBack = searchChild(backendSyncData, childFront.name) as IFolderTreeNodeSyncData | null
                retValue = [...retValue, ...diffCheck(childFront, childBack, [...prefix, frontData.name])]
            }
        }
        return retValue
    }
}