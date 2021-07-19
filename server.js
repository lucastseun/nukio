import { createApp, createRouter } from './lib/mod.js'

const app = createApp()
const router = createRouter()


app.use(router.routes())
router.get('/user', ctx=>{
    console.log(1111);
})
router.get('/title', ctx=>{
    console.log(2222);
})

app.listen({port: 3000}, () => {
    console.log('server run at: http://localhost:3000');
})