import winston from 'winston';

class ConsoleLogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
        transports: [
            new winston.transports.Console(),
        ],
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss' // 指定时间格式
            }),
            winston.format.printf((info) => {
                return `${info.timestamp} - ${info.level}: ${info.message}`;
            })
        ),
    });
  }

  log(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }
}

export const getConsoleLogger = ()=>{
    return new ConsoleLogger()
}