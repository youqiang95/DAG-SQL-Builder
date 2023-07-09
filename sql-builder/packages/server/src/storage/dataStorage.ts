import nodejsPath  from "path"
import fs from 'fs'

export class DataStorage {
    isExist: (path:string)=>boolean
    isDirectory: (path:string)=>boolean
    createDir: (path:string)=>void
    createFile: (path:string, value:string)=>void
    rename: (oldPath:string, newPath:string)=>void 
    remove: (path:string)=>void 
    copy: (sourcePath:string, targetPath:string)=>void
    readFile: (path:string)=>string
    updateFile: (path:string, value:string)=>void
    listDir: (dirPath:string)=>string[]

    constructor(){}
}

export class FileSystemDataStorage extends DataStorage {
    constructor(){
        super()
    }

    isExist = (path:string)=>{
        return fs.existsSync(path)
    }

    isDirectory = (path:string)=>{
        const stat = fs.lstatSync(path)
        return stat.isDirectory()
    }

    createDir = (path:string)=>{
        fs.mkdirSync(path, { recursive: true })
    }

    createFile = (path:string, value:string)=>{ 
        const dirName = nodejsPath.dirname(path)
        if(!this.isExist(dirName)){
            fs.mkdirSync(dirName, { recursive: true })
        } 
        fs.writeFileSync(path, value)
    }

    rename = (oldPath:string, newPath:string)=>{
        fs.renameSync(oldPath, newPath)
    }

    remove = (path:string)=>{
        if(this.isExist(path)){
            fs.rmSync(path, { recursive: true })
        }
    }

    copy = (sourcePath:string, targetPath:string)=>{
        if(!this.isExist(targetPath)){
            fs.mkdirSync(targetPath, { recursive: true })
        }
        fs.readdirSync(sourcePath).forEach(file => {
            const srcPath = nodejsPath.join(sourcePath, file);
            const destPath = nodejsPath.join(targetPath, file);
            const stat = fs.statSync(srcPath);
            if (stat.isFile()) {
                fs.copyFileSync(srcPath, destPath);
            } else if (stat.isDirectory()) {
                this.copy(srcPath, destPath);
            }
        })
    }

    readFile = (path:string)=>{
        return fs.readFileSync(path).toString()
    }

    updateFile = (path:string, value:string)=>{
        if(!this.isExist(path)){
            this.createFile(path, value)
        }
        else {
            fs.writeFileSync(path, value)
        }
    }

    listDir = (dirPath:string)=>{
        return fs.readdirSync(dirPath)
    }
}