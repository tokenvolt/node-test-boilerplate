import db from 'config/db'
import Assignee from './assignee'
import Project from './project'


const User = db.Model.extend({
  tableName: 'users',

  projects: function() {
    return this.hasMany(Project)
  }
})

export default User
