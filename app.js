const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-body')
const Config = require("./config")
const mongoose = require('mongoose')

const app = new Koa()
const router = new Router()
const koaBody = new KoaBody()

mongoose.Promise = global.Promise
mongoose.connect(Config.db)

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.on('open', () => {

    let Tool = require('./schema/tool.schema')

    router.get('/tools', async (ctx) => {
        ctx.body = await Tool.find()
    })

    router.get('/tools/:id', async (ctx) => {
        ctx.body = await Tool.find({_id: ctx.params.id})
    })

    router.post('/tool', koaBody, async (ctx) => {
        let tool = new Tool(ctx.request.body)
        ctx.body = await tool.save()
    })

    router.put('/tool', async (ctx, next) => {})

    console.log(`connection ${Config.db} success`)
    app.use(router.routes()).use(router.allowedMethods())
    app.listen(Config.serverPort)
    console.log(`listen on ${Config.serverPort} port`)
})
