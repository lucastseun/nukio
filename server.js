import { createApp, createRouter } from './lib/app.js'
import logger from './src/logger/logger.js'
import api from './src/api/index.js'
console.log(api);

const app = createApp()

app.use(logger())

const router = createRouter()

app.use(router.routes())

app.listen({port: 3000}, () => {
    console.log('server run at: http://localhost:3000');
})