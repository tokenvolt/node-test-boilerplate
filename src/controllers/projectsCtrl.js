import co from 'co'
import R from 'ramda'
import db from 'config/db'
import User from '../models/user'
import Project from '../models/project'
import Assignee from '../models/assignee'


export const getProjects = co.wrap(function* (ctx, next) {
  const projects = yield Project.fetchAll({withRelated: ['users']}).then(function(projects) {
                           return JSON.stringify(projects)
                         })
                         .catch(function(err) {
                           console.error(err)
                         })

  ctx.state = { projects: JSON.parse(projects) }

  yield ctx.render('projects')
})


export const createProject = co.wrap(function* (ctx, next) {
  const { username, project, projectManager } = ctx.request.body

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

  ctx.state = { projects: output }

  yield ctx.render('projects')
})