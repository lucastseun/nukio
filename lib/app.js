import { http } from './deps.js'
import { compose } from './utils.js'

const createApp = (options = {}) => {
    const middleware = []

    const listen = (...args) => {
        const server = http.createServer(callback())
        return server.listen(...args)
    }

    const use = (fn) => {
        if (typeof fn !== 'function') {
            throw new TypeError('middleware must be a function!')
        }
        middleware.push(fn)
        return app
    }

    const callback = () => {
        const fn = compose(middleware)
        return (req, res) => {
            const ctx = createContext(req, res)
            return handleRequest(ctx, fn)
        }
    }

    const handleRequest = (ctx, fn) => {
        return fn(ctx).then(() => handleResponse(ctx)).catch(err=>err)
    }

    const handleResponse = (ctx) => {
        const res = ctx.res
        if (res.writableEnded) {
            return
        }
        // 默认返回json格式数据
        res.setHeader('Content-type', 'application/json;charset=utf-8')
    }

    const createContext = (req, res) => {
        const context = Object.create(null)
        context.app = app
        context.req = req
        context.res = res
        context.body = ''
        context.send = (data) => {
            return res.end(data)
        }
        return context
    }

    const app = Object.create(null)
    app.listen = listen
    app.use = use

    return app
}

export default createApp