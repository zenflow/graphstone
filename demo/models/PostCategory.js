const keystone = require('keystone')

const PostCategory = new keystone.List('PostCategory', {
  autokey: { from: 'name', path: 'key', unique: true },
  authorize: {
    crud: user => user && user.isAdmin,
    read: true,
  },
})

PostCategory.add({
  name: { type: String, required: true },
})

PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'categories' })

PostCategory.register()
