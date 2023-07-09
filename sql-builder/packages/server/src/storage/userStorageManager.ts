import type {DataStorage} from './dataStorage'
import nodejsPath from "path"
import {genUniqId} from '../common/genUniqId'

const CONFIG_DIR_NAME = '.metadata'
const USER_CONFIG_FILE_NAME = 'config.json'
const USER_DATA_WAREHOUSE_CONFIG_FILE_NAME = 'data-warehouse-config.json'

export class UserStorageManager {
    storage:DataStorage
    rootPath:string
    constructor(rootPath:string, storage: DataStorage, onFirstCreate?: (dataManager: UserStorageManager)=>void){
        this.rootPath = rootPath
        this.storage = storage
        if(!this.storage.isExist(this.rootPath)){
            this.createRootDir()
            if(onFirstCreate){
                onFirstCreate(this)
            }
        }
    }

    absPath = (relativePath:string)=>{
        return nodejsPath.join(this.rootPath, relativePath)
    }
    
    createRootDir = ()=>{
        this.storage.createDir(this.rootPath)
    }

    generateTreeData = (relativePath:string)=>{
        const rootPath = this.rootPath 
        const absPath = nodejsPath.resolve(this.absPath(relativePath))
        const isRoot = nodejsPath.resolve(rootPath) === absPath
        if(!this.storage.isExist(absPath)){
            return null 
        }
        const name = isRoot ? '我的项目' : nodejsPath.basename(absPath)
        // file
        if(!this.storage.isDirectory(absPath)){
            const suffix = name.indexOf('.') > -1 ? name.split('.').pop() : ''
            let language: string = 'textile'
            switch(suffix){
                case 'sg':
                    language = 'sqlgraph'
                    break
                case 'css':
                    language = 'css'
                    break 
                case 'sql':
                    language = 'sql'
                    break
                case 'js':
                    language = 'javascript'
                    break
                case 'py':
                    language = 'python'
                    break
            }
            const value = this.storage.readFile(absPath)
            return {
                id: genUniqId(),
                name: name,
                fileType: 'File',
                location: nodejsPath.join('我的项目', relativePath),
                isLeaf: true,
                data: {language: language, value:value},
            }
        }
        else {
            const ls = this.storage.listDir(absPath).filter((item)=>{
                return CONFIG_DIR_NAME !== item
            })
            const children = ls.map((item)=>{
                const newRelativePath = nodejsPath.join(relativePath, item)
                return this.generateTreeData(newRelativePath)
            })
            return {
                id: genUniqId(),
                name: isRoot ? '我的项目': name,
                fileType: isRoot? 'RootFolder' : 'Folder',
                location: isRoot ? '我的项目' : nodejsPath.join('我的项目', relativePath),
                isLeaf: false,
                children: children
            }
        }
    }

    isExist = (relativePath:string)=>{
        return this.storage.isExist(this.absPath(relativePath))
    }

    isDirectory = (relativePath:string)=>{
        return this.storage.isDirectory(this.absPath(relativePath))
    }

    createDir = (relativePath:string)=>{
        this.storage.createDir(this.absPath(relativePath))
    }

    createFile = (relativePath:string, value:string)=>{
        this.storage.createFile(this.absPath(relativePath), value)
    }

    rename = (oldRelativePath:string, newRelativePath:string)=>{
        this.storage.rename(this.absPath(oldRelativePath), this.absPath(newRelativePath))
    } 

    remove = (relativePath:string)=>{
        this.storage.remove(this.absPath(relativePath))
    }

    copy = (sourceRelativePath:string, targetRelativePath:string)=>{
        this.storage.copy(this.absPath(sourceRelativePath), this.absPath(targetRelativePath))
    }

    readFile = (relativePath:string)=>{
        return this.storage.readFile(this.absPath(relativePath))
    }

    updateFile = (relativePath:string, value:string)=>{
        this.storage.updateFile(this.absPath(relativePath), value)
    }

    listDir = (relativePath:string)=>{
        return this.storage.listDir(this.absPath(relativePath))
    }

    readJsonDataFileWithCreate = (relativePath:string)=>{
        if(this.isExist(relativePath)){
            try {
                return  JSON.parse(this.readFile(relativePath))
            } catch (error) {
                return {}
            }
        }
        else {
            this.createFile(relativePath, JSON.stringify({}))
            return {}
        }
    }

    getConfigRelativePath = ()=>{
        return nodejsPath.join(CONFIG_DIR_NAME, USER_CONFIG_FILE_NAME)
    }

    getConfigData = ()=>{
        const configRelativePath = this.getConfigRelativePath()
        return this.readJsonDataFileWithCreate(configRelativePath)
    }

    updateConfigData = (value:string)=>{
        const configRelativePath = this.getConfigRelativePath()
        this.updateFile(configRelativePath, value)
    }

    getDataWarehouseConfigRelativePath = ()=>{
        return nodejsPath.join(CONFIG_DIR_NAME, USER_DATA_WAREHOUSE_CONFIG_FILE_NAME)
    }

    getDataWarehouseConfigData = ()=>{
        const relativePath = this.getDataWarehouseConfigRelativePath()
        return this.readJsonDataFileWithCreate(relativePath)
    }

    updateDataWarehouseConfigData = (value:string)=>{
        const relativePath = this.getDataWarehouseConfigRelativePath()
        this.updateFile(relativePath, value)
    }
}