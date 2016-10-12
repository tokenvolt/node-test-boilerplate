import ProjectModel from '../../models/project'


export const queryText = `
  projects: [Project]
  project(id: ID): Project
`

export const queries = {
  projects() {
    return ProjectModel.fetchAll().then(function(projects) {
      return projects.toJSON()
    })
  },
  project(root, { id }) {
    return ProjectModel.where('id', id).fetch().then(function(project) {
      return project.toJSON()
    })
  }
}