import koaRouter from 'koa-router'
import * as usersCtrl from '../controllers/usersCtrl'


const router = koaRouter()

router.get('/', usersCtrl.getUsers)

router.post('/login', usersCtrl.login)

export default router