import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import type {Express} from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import {handlerList} from './handlers'
import http from 'http'
import {getConsoleLogger} from './logger/consoleLogger'
import chalk from 'chalk';

const consoleLogger = getConsoleLogger()

const PORT = 9000

const registerHandler = (app:Express) =>{
    for (let handler of handlerList){
        handler.registerHandler(app)
    }
}

const main = async () => {
    try {
        const app = express()
        app.use(express.static('static'))
        app.use(bodyParser.json())
        app.use(cookieParser('sqlGeneratorServer'))
        app.set('trust proxy', true)
        registerHandler(app)
        app.get('*', (req,res) =>{
            res.sendFile(process.cwd() + '/static/index.html');
        })
        const server = http.createServer(app);
        server.listen(PORT, '0.0.0.0', async ()=>{
            consoleLogger.log(chalk.green(`[SERVER START] port: ${PORT}`))
        })
    } catch (error){
        consoleLogger.error(chalk.red(`[SERVER START ERROR] error: ${error}`))
    }
}

main()
