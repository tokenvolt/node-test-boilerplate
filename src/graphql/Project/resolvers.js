import ProjectModel from '../../models/project'


export default {
  Projects: {
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
}