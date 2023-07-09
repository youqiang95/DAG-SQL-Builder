import {Md5Encryptor} from '../encryptor'
import nodejsPath from 'path'
import {FileSystemDataStorage} from './dataStorage'
import {UserStorageManager} from './userStorageManager'

const MOUNT_PREFIX = process.env.STORAGE_BASE_DIR || '/var/.dag-sql-builder'
const EXAMPLES_PATH = nodejsPath.join(MOUNT_PREFIX, 'examples') 

const genUserDirPath = (uid:string) => {
    const encryptor = new Md5Encryptor()
    const encryptDirName = encryptor.encrypt(uid)
    return nodejsPath.join(MOUNT_PREFIX, uid + '-' + encryptDirName)
}

const constructExampleDir = ()=>{
    return 'SQL画布示例' + '-' + new Date().getTime().toString().slice(0, -3)
}

const getUserStorageManager = (uid:string)=>{
    const storage = new FileSystemDataStorage()
    const rootPath = genUserDirPath(uid)
    const onFirstCreate = (dataManager: UserStorageManager)=>{
        const userExamplesDirName = constructExampleDir()
        if(dataManager.storage.isExist(EXAMPLES_PATH)){
            dataManager.storage.copy(EXAMPLES_PATH, dataManager.absPath(userExamplesDirName))
        }
    }
    return new UserStorageManager(rootPath, storage, onFirstCreate)
}

export const importExamplesData = (uid:string)=>{
    const dataManager = getUserStorageManager(uid)
    const userExamplesDirName = constructExampleDir()
    dataManager.storage.copy(EXAMPLES_PATH, dataManager.absPath(userExamplesDirName))
}

export const getUserRootFolderData = (uid:string)=>{
    const dataManager = getUserStorageManager(uid)
    return dataManager.generateTreeData('/')
}

export const userCreateDirOrFile = (uid:string, relativePath:string, is_dir:boolean, value:string)=>{
    const dataManager = getUserStorageManager(uid)
    if(is_dir){
        dataManager.createDir(relativePath)
    }
    else {
        dataManager.createFile(relativePath, value)
    }
}

export const userMoveDirOrFile = (uid:string, oldPath:string, newPath:string) => {
    const dataManager = getUserStorageManager(uid)
    dataManager.rename(oldPath, newPath)
}

export const userRemoveDirOrFile = (uid:string, relativePath:string) => {
    const dataManager = getUserStorageManager(uid)
    dataManager.remove(relativePath)
}

export const userUpdateFile = (uid:string, relativePath:string, value:string)=>{
    const dataManager = getUserStorageManager(uid)
    dataManager.updateFile(relativePath, value)
}

export const getUserConfigData = (uid:string)=>{
    const dataManager = getUserStorageManager(uid)
    return dataManager.getConfigData()
}

export const updateUSerConfigData = (uid:string, value:string) => {
    const dataManager = getUserStorageManager(uid)
    dataManager.updateConfigData(value)
}

export const getUserDataWarehouseConfigData = (uid:string)=>{
    const dataManager = getUserStorageManager(uid)
    return dataManager.getDataWarehouseConfigData()
}

export const updateUSerDataWarehouseConfigData = (uid:string, value:string) => {
    const dataManager = getUserStorageManager(uid)
    dataManager.updateDataWarehouseConfigData(value)
}