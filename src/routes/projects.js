import koaRouter from 'koa-router'
import R from 'ramda'
import db from 'config/db'
import { transaction } from 'utils/db'
import User from '../models/user'
import Project from '../models/project'
import Assignee from '../models/assignee'


const router = koaRouter()

router.get('/', function*() {
 const projects = yield Project.fetchAll({withRelated: ['users']}).then(function(projects) {
                          return JSON.stringify(projects)
                        })
                        .catch(function(err) {
                          console.error(err)
                        })

  this.state = { projects: JSON.parse(projects) }

  yield this.render('projects')
})

router.post('/create', function*() {
  const { username, project, projectManager } = this.request.body

  const is_project_manager = !!(projectManager)


  let users       = yield new User({ name: username })
                                .save()
                                .then(model => model.fetchAll()
                                                    .then((users) => users.toJSON())
                                      )

  let projects    = yield new Project({ title: project })
                                .save()
                                .then(model => model.fetchAll()
                                                    .then((projects) => projects.toJSON())
                                     )

  const assignees = yield new Assignee({ project_id: R.last(projects).id, user_id: R.last(users).id, is_project_manager })
                                .save()
                                .then(model => model.fetchAll()
                                                    .then((assignees) => assignees.toJSON())
                                     )


  const output    = yield Project
                            .fetchAll({withRelated: ['users']})
                            .then(function(projects) {
                              return projects.toJSON()
                            })
                            .catch(function(err) {
                              console.error(err)
                            })

  this.state = { projects: output }

  yield this.render('projects')
})

export default router