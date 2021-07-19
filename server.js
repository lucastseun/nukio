import { createApp, createRouter } from './lib/mod.js'
import logger from './src/logger/logger.js'

const app = createApp()
const router = createRouter()

app.use(logger())

app.use(router.routes())

app.listen({port: 3000}, () => {
    console.log('server run at: http://localhost:3000');
})