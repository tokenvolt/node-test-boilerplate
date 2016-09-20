import "babel-core/register"
import "babel-polyfill"
import koa from 'koa'
import route from 'koa-route'
import db from 'config/db'
import co from 'co'
import * as env from 'config/env'
import { transaction } from 'utils/db'

const app = koa()

app.use(route.get('/hey', function*() {
  const name = 'Alex'
  const title = 'Blah'
  const is_project_manager = false

  const resp = yield transaction(function* (tx) {
    const users     = yield tx.returning('*').insert({ name: name }).into('users')
    const projects  = yield tx.returning('*').insert({ title: title }).into('projects')
    const assignees = yield tx.returning('*').insert({ project_id: projects[0].id, user_id: users[0].id, is_project_manager })
                              .into('assignees')

    return assignees
  })

  if (resp.success) {
    this.body = 'OK'
  } else {
    this.body = 'Error'
  }
}))

app.listen(env.PORT)
