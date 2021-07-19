import { createApp, createRouter } from './lib/mod.js'

const app = createApp()
const router = createRouter()


app.use(router.routes())

router.get('/user', ctx=>{
    ctx.res.end(JSON.stringify({name:'Joe',age:19}))
})

router.post('/userbyid', ctx => {
    
})

app.listen({port: 3000}, () => {
    console.log('server run at: http://localhost:3000');
})