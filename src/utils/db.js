import db from 'config/db'
import co from 'co'

export function transaction(fn) {
  return db.transaction(co.wrap(fn))
    .then(result => ({ data: result, success: true }))
    .catch(error => ({ data: error, success: false }))
}
