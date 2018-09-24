const { GraphQLString } = require('graphql')
// const Select = require('./Select')

function getKeystoneTypes(keystone) {
  const { Types } = keystone.Field
  return new Map([
    [Types.Select, GraphQLString],
    [Types.Text, GraphQLString],
    [Types.Html, GraphQLString],
    [Types.Email, GraphQLString],
    [Types.Date, GraphQLString],
  ])
}

module.exports = getKeystoneTypes
