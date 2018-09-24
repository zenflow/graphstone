const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
} = require('graphql')
const getKeystoneTypes = require('./keystoneTypes')

function graphstone({ keystone }) {
  const keystoneTypes = getKeystoneTypes(keystone)
  const listTypes = getListTypes(keystone, keystoneTypes)
  const query = getRootQueryType(keystone, listTypes)
  return new GraphQLSchema({ query })
}

function getListTypes(keystone, keystoneTypes) {
  const listTypes = {}
  for (const list of Object.values(keystone.lists)) {
    listTypes[list.key] = new GraphQLObjectType({
      name: list.key,
      fields() {
        const result = {
          id: { type: GraphQLID },
        }
        for (const listField of list.fieldsArray) {
          if (listField.path.includes('.')) continue // TODO: handle nested fields
          const type = keystoneTypes.get(listField.options.type)
          if (!type) continue // keystone type not supported yet - print warning?
          result[listField.path] = { type }
        }
        return result
      },
    })
  }
  return listTypes
}

function getRootQueryType(keystone, listTypes) {
  const { downcase } = keystone.utils
  return new GraphQLObjectType({
    name: 'Query',
    fields() {
      const result = {}
      for (const list of Object.values(keystone.lists)) {
        // TODO: better alorithm to determine field names
        result[downcase(list.plural).replace(/ /g, '')] = {
          type: new GraphQLList(listTypes[list.key]),
          resolve(parent, args, context, info) {
            return list.model.find().exec()
          },
        }
        result[downcase(list.singular).replace(/ /g, '')] = {
          type: listTypes[list.key],
          args: {
            id: { type: GraphQLID },
          },
          resolve(parent, args, context, info) {
            return list.model.findById(args.id).exec()
          },
        }
      }
      return result
    },
  })
}

module.exports = graphstone
