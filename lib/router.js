import { http } from './deps.js'
import { compose } from './utils.js'

const router = Object.create(null)

const methods = http.METHODS.map(method => method.toLowerCase())

for (let i = 0, l = methods.length; i < l; i++) {
    const method = methods[i];
    router[method] = (name, path, fn) => {
        if (!(typeof path === 'string' && typeof fn === 'function')) {
            path = name
            fn = path
            name = null
        }
        register(path, [method], middleware, {
            name: name
        });
        return router
    }
}

const register = (path, methods, middleware, opts = {}) => {
    const stack = router.stack;
    // support array of paths
    if (Array.isArray(path)) {
        for (let i = 0; i < path.length; i++) {
        const curPath = path[i];
        router.register.call(router, curPath, methods, middleware, opts);
        }

        return router;
    }

    return router
}

const match = (path, method) => {
    const matchRoute = {
        path: [],
        pathAndMethod: [],
        route: false
    }

    for (let i = 0, l = router.stack.length; i < l; i++) {
        let route = router.stack[i]
        if (route.match(path)) {
            matchRoute.push(path)

            if (route.methods.length === 0 || ~route.methods.indexOf(method)) {
                matchRoute.pathAndMethod.push(route)

                if (route.methods.length) {
                    matchRoute.route = true
                }
            }
        }
    }
    
    return matchRoute;
}

const routes = () => {
    const dispatch = (ctx, next) => {
        const path = ctx.req.path
        // 根据请求路径和请求方法匹配对应的路由
        const matchRoute = router.match(path, ctx.req.method)

        ctx.router = router

        if (!matchRoute.route) {
            return next()
        }

        
    }
    return dispatch
}

const all = (method, path, fn) =>{

}

const createRoute = (path, methods, middleware, opts = {}) => {

}

const createRouter = (opts = {}) => {
    router.methods = opts.methods || [
        'HEAD',
        'OPTIONS',
        'GET',
        'PUT',
        'PATCH',
        'POST',
        'DELETE'
    ]
    router.params = {}
    router.stack = []
    router.match = match
    router.routes = routes
    router.all = all
    return router
}

export default createRouter