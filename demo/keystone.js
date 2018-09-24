require('dotenv').config()

const keystone = require('keystone')
const graphstone = require('graphstone')
const expressGraphql = require('express-graphql')

keystone.init({
  name: 'Graphstone Demo',
  brand: 'Graphstone Demo',
  'auto update': true,
  session: true,
  'session store': 'mongo',
  auth: true,
  'user model': 'User',
  mongo: process.env.MONGO_URI,
  static: 'public',
})

keystone.import('models')

keystone.set('routes', app => {
  const schema = graphstone({ keystone })
  app.use(
    '/graphql',
    expressGraphql({
      schema,
      graphiql: true,
    }),
  )
})

keystone.set('nav', {
  posts: ['posts', 'post-categories'],
  enquiries: 'enquiries',
  users: 'users',
})

keystone.start()
