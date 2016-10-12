import KoaRouter from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import co from 'co'


const router = KoaRouter()

router.get('/', co.wrap(indexCtrl))

export default router
