import db from 'config/db'
import Assignee from './assignee'
import User from './user'


const Project = db.Model.extend({
  tableName: 'projects',

  users: function() {
    return this.belongsToMany(User, 'id').through(Assignee, 'user_id')
  }
})

export default Project
