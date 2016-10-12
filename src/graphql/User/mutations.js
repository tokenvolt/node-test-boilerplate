import UserModel from '../../models/project'
import { async, await } from 'asyncawait'


export const mutationText = `
  addUser(name: String!): User
`

export const mutations = {
  addUser(root, data) {
    return UserModel.fetchAll().then(function(users) {
      return users.toJSON()
    })
  }
}