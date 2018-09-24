const keystone = require('keystone')
const { Types } = keystone.Field

const Enquiry = new keystone.List('Enquiry', {
  nocreate: true,
  noedit: true,
  authorize: {
    create: user => !user || !user.isAdmin,
    read: user => user && user.isAdmin,
    update: false,
    delete: user => user && user.isAdmin,
  },
})

Enquiry.add({
  name: { type: Types.Name, required: true },
  email: { type: Types.Email, required: true },
  phone: { type: String },
  enquiryType: {
    type: Types.Select,
    options: [
      { value: 'message', label: 'Just leaving a message' },
      { value: 'question', label: "I've got a question" },
      { value: 'other', label: 'Something else...' },
    ],
  },
  message: { type: Types.Markdown, required: true },
  createdAt: { type: Date, default: Date.now },
})

Enquiry.defaultSort = '-createdAt'
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt'
Enquiry.register()
