require('dotenv').config()

const keystone = require('keystone')

keystone.init({
  name: 'Graphstone Demo',
  brand: 'Graphstone Demo',
  'auto update': true,
  session: true,
  'session store': 'mongo',
  auth: true,
  'user model': 'User',
  mongo: process.env.MONGO_URI,
})

keystone.import('models')

keystone.set('routes', app => {})

keystone.set('nav', {
  posts: ['posts', 'post-categories'],
  enquiries: 'enquiries',
  users: 'users',
})

keystone.start()
