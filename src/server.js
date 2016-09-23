import "babel-core/register"
import "babel-polyfill"

import koa from 'koa'
import koaRouter from 'koa-router'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import error from 'koa-error'
import views from 'koa-views'

import db from 'config/db'
import co from 'co'

import * as env from 'config/env'
import { transaction } from 'utils/db'

import index from './routes/index'
import users from './routes/users'
import projects from './routes/projects'
import hey from './routes/hey'

const app = koa()
const router = koaRouter()

app
  .use(bodyParser())
  .use(logger())
  .use(views(__dirname + '/views/pages', { extension: 'jade' }))
  .use(error({
    engine: 'jade',
    template: __dirname + '/views/pages/error.jade'
  }))


// Routes
router.use('/', index.routes(), index.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())
router.use('/projects', projects.routes(), projects.allowedMethods())
router.use('/hey', hey.routes(), hey.allowedMethods())

app.use(router.routes(), router.allowedMethods())

app.listen(env.PORT)
