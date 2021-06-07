const log4js = require('log4js')

log4js.configure({
    appenders: {
        error: {type: 'file', filename: './src/logs/error.log'},
        loggerConsole: {type: 'console'}
    },
    categories: {
        default: {appenders: ['loggerConsole'], level: 'info'},
        error: {appenders: ['error', 'loggerConsole'], level: 'error'}
    }
})

export const logger = log4js.getLogger()
export const errorLog = log4js.getLogger('error')