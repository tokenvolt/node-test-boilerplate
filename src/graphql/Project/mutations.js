import ProjectModel from '../../models/project'
import { async, await } from 'asyncawait'


export const mutationText = `
  addProject(title: String!): Project
`

export const mutations = {
  addProject(root, data) {
    return ProjectModel.fetchAll().then(function(projects) {
      return projects.toJSON()
    })
  }
}