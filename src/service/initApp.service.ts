import mongoose from 'mongoose'
import { Application } from 'express'
import { logger, errorLog } from './logger.service'
import dotenv from 'dotenv'

dotenv.config()

const initApp = (PORT: any, app: Application) => {

    logger.info('Connecting to Database')

    mongoose.connect(process.env.MONGO_URL || '',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
        .then(() => {
            logger.info('Database Connected')
            logger.info('Initializing Server...')
            const server = app.listen(PORT, () => {
                logger.info(`Server up at PORT ${PORT}`)
            })

            server.on('error', error => {
                errorLog.error(error)
            })
        })
        .catch(err => errorLog.error(err))
}


export default initApp