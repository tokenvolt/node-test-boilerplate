export default function loadModules(modules) {
  let queries = ''
  let mutations = ''
  let resolvers = {
    RootQuery: {},
    RootMutation: {},
  }

  modules.forEach(module => {
    Object.assign(resolvers, module.resolvers)
    Object.assign(resolvers.RootQuery, module.queries)
    Object.assign(resolvers.RootMutation, module.mutations)
    queries += module.queryText
    mutations += module.mutationText
  })

  const schema = `
    type RootQuery {
      ${queries}
    }
    type RootMutation {
      ${mutations}
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `

  const typeDefs = [schema].concat(modules.map(m => m.schema))

  return { typeDefs, resolvers }
}