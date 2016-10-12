import UserModel from '../../models/project'


export default {
  Users: {
    users() {
      return UserModel.fetchAll().then(function(users) {
        return users.toJSON()
      })
    },
    user(root, { id }) {
      return UserModel.where('id', id).fetch().then(function(user) {
        return user.toJSON()
      })
    }
  }
}