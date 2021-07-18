const logger = () => {
    return (ctx) => {
        console.log(`${ctx.req.method}---${ctx.req.url}---${ctx.res.statusCode}`);
    }
}

export default logger