const compose = (middleware) => {

    middleware = Array.isArray(middleware) ? middleware : [middleware]

    const isFunction = middleware.every(item => typeof item === 'function')

    if (!isFunction) {
        throw TypeError('Middleware must be composed of functions!')
    }

    return (ctx, next) => {
        let index = 0
        
        const dispatch = (i) => {
            if (i < index) {
                return Promise.reject(new Error('next() called mutiple times'))
            }

            index = i

            let fn = i === middleware.length ? next : middleware[i]

            if (!fn) {
                return Promise.resolve()
            }
            
            try {
                return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
            } catch (err) {
                return Promise.reject(err)
            }
        }

        return dispatch(0)
    }
}

export {
    compose
}