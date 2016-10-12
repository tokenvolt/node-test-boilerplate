import "babel-core/register"
import "babel-polyfill"

import * as env from 'config/env'

import Koa from 'koa'
import KoaRouter from 'koa-router'
import mount from 'koa-mount'
import convert from 'koa-convert'
import graphqlHTTP from 'koa-graphql'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import error from 'koa-error'
import views from 'koa-views'
import { apolloKoa, graphiqlKoa } from 'apollo-server'

import GrpahQLShema from './graphql'

import index from './routes/index'
import users from './routes/users'
import projects from './routes/projects'
import hey from './routes/hey'


const app = new Koa()
const router = new KoaRouter()

// Middlewares
app
  .use(logger())
  .use(bodyParser())
  .use(views(__dirname + '/views/pages', { extension: 'jade' }))
  .use(convert(error({
    engine: 'jade',
    template: __dirname + '/views/pages/error.jade'
  })))


// Routes
router.use('/', index.routes(), index.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())
router.use('/projects', projects.routes(), projects.allowedMethods())
router.use('/hey', hey.routes(), hey.allowedMethods())

router.post('/graphql', apolloKoa({ schema: GrpahQLShema }))
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))


app.use(router.routes())
   .use(router.allowedMethods())

app.listen(env.PORT)
