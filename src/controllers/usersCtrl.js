import co from 'co'
import db from 'config/db'
import { transaction } from 'utils/db'

export const getUsers = co.wrap(function*(ctx, next) {
  const users = yield db.select().from('users')

  ctx.state = { users }

  yield ctx.render('index')
})

export const login = co.wrap(function*(ctx, next) {
  const users = yield db.select('name').from('users')

  ctx.state = { users }

  yield ctx.render('index')
})