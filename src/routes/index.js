import koaRouter from 'koa-router'
import Project from '../models/project'


const router = koaRouter()

router.get('/', function*() {
  this.state = {
    title: 'Homepage',
    desc: 'This is awesome node boilerplate!'
  }

  yield this.render('index')
})

export default router
