import koaRouter from 'koa-router'
import * as projectsCtrl from '../controllers/projectsCtrl'


const router = koaRouter()

router.get('/', projectsCtrl.getProjects)

router.post('/create', projectsCtrl.createProject)

export default router