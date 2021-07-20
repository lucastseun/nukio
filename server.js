import { createApp, createRouter } from './lib/mod.js'

const app = createApp()
const router = createRouter()

app.use(router.routes())

router.post('/user', ctx => {
    const body = ctx.body
    ctx.send(JSON.stringify(body))
})

app.listen({port: 3000}, () => {
    console.log('server run at: http://localhost:3000');
})