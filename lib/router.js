import { http } from './deps.js'
import { bodyParser } from './utils.js'

const router = Object.create(null)

const methods = http.METHODS.map(method => method.toLowerCase())

for (let i = 0, l = methods.length; i < l; i++) {
    const method = methods[i];
    router[method] = (path, fn) => {
        if (typeof path !== 'string') {
            throw TypeError('The path must be a string')
        }
        if (typeof fn !== 'function') {
            throw TypeError('callback is not a function')
        }
        register(path, method, fn);
        return router
    }
}

// 注册路由
const register = (path, method, fn) => {
    // 判断router.stack是否包含对应的路由，没有则push进去
    const isHas = match(path, method)

    if (!isHas) {
        router.stack.push({
            path,
            method,
            fn
        })
    }
    
    return router
}


// 根据path和method匹配到相应的路由
const match = (path, method) => {
    return router.stack.find(item => item.path === path && item.method === method)
}

const routes = () => {
    return (ctx, next) => {
        const path = ctx.req.url
        const method = ctx.req.method.toLowerCase()
        // 根据请求路径和请求方法匹配对应的路由
        const matchRoute = match(path, method)
        
        ctx.router = router

        if (!matchRoute) {
            return next()
        }
        const req = ctx.req
        req.on('data', data => {
            ctx.body += data
            ctx.body = bodyParser(ctx.body)
        })
        req.on('end', () => {
            matchRoute.fn.call(null, ctx, next)
        })
    }
}

const all = (name, path, fn) =>{
    if (typeof path == 'function' && !fn) {
        fn = path
        path = name
        name = null
    }
    register(path, name, fn)
}

const createRouter = (opts = {}) => {
    router.stack = []
    router.routes = routes
    router.all = all
    return router
}

export default createRouter