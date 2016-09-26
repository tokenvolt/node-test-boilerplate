import koaRouter from 'koa-router'
import db from 'config/db'
import { transaction } from 'utils/db'


const router = koaRouter()

router.get('/', function*() {
  const users = yield db.select().from('users')

  this.state = { users }

  yield this.render('index')
})

router.post('/login', function*() {
  const users = yield db.select('name').from('users')

  this.state = { users }

  yield this.render('index')
})

export default router