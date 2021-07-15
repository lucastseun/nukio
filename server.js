import { http } from './deps.js'
import { useRouter } from './router.js'

const createApp = () => {
    const app = {}
    app.request = {
        headers: '',
        method: '',
        url: '',

    }
    app.useContext = (req, res) => {
        
        app.fn({req, res})
    }
    
    const server = http.createServer(app.useContext)

    const listen = (listenOpts = {}) => {
        const { host='localhost', port=3000 } = listenOpts
        
        server.listen(port, host, () => {
            console.log(`server run at http://${host}:${port}`);
        })
    }

    const use = (fn) => {
        app.fn = fn
    }

    return {
        use: use,
        listen: listen
    }
}

const app = createApp()
const router = useRouter()
router.get('/', (ctx) => {
    ctx.res.statusCode = 200
    ctx.res.setHeader('Content-Type', 'application/json;charset=utf-8')
    ctx.res.end(JSON.stringify({name:'lyooooly'}))
})
router.get('/userlist', (ctx) => {
    ctx.res.statusCode = 200
    ctx.res.setHeader('Content-Type', 'application/json;charset=utf-8')
    ctx.res.end(JSON.stringify({host:ctx.req.url}))
})

app.use(router.routes)
app.listen()