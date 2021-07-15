const context = {
    url: '',
    fn: (ctx) => {
        ctx.req.url += this.url 
    }
}

// the get request
const get = (url, fn) => {
    context.url = url
    context.fn = fn
}

// the post request
const post = (url, fn) => {
    context.url = url
    context.fn = fn
}

const routes = (ctx) => {
    context.fn(ctx)
}

const useRouter = () => {
    return {
        get,
        post,
        routes
    }
}

export { useRouter }