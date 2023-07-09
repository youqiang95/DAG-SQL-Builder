import type {Request, Response} from 'express'
import {getConsoleLogger} from './consoleLogger'
import chalk from 'chalk';

const consoleLogger = getConsoleLogger()

export class HttpServerLogger {
  static logRequest(req: Request): void {
    const { method, url, body, cookies} = req;
    consoleLogger.log(chalk.green(`[REQUEST] Method: ${method} URL: ${url} Body: ${JSON.stringify(body)} Cookies: ${JSON.stringify(cookies)}`));
  }

  static logResponseResult(res: Response, result:object): void {
    consoleLogger.log(chalk.cyan(`[REPONSE_RESULT] Result: ${JSON.stringify(result)}`));
  }

  static logError(error: Error): void {
    consoleLogger.error(chalk.red(`[ERROR] error:${error}`));
  }
}

export default HttpServerLogger;