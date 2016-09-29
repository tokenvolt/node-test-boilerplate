import db from 'config/db'
import User from './user'
import Project from './project'


const Assignee = db.Model.extend({
  tableName: 'assignees',

  users: function() {
    return this.belongsToMany(User, 'id')
  }
})

export default Assignee
