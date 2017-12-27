import { maxLength, maxLengthMsg, minLength, minLengthMsg, validator } from './validation'

export const all = db => () => db('users')
export const create = db => userInput => db('users').insert(userInput)
export const remove = db => userId => db('users').where('id', userId).del()
export const update = db => userInput => db('users').update(userInput).where('id', userInput.id)
export const withId = db => userId => db('users').where('id', userId)
export const withName = db => name => db('users').where('name', name)

const MAX_NAME_LENGTH = 30
const MIN_NAME_LENGTH = 3

const MAX_PASSWORD_LENGTH = 256
const MIN_PASSWORD_LENGTH = 8

export const spec = {
  name: [
    [ maxLength(MAX_NAME_LENGTH), maxLengthMsg('Name', MAX_NAME_LENGTH) ],
    [ minLength(MIN_NAME_LENGTH), minLengthMsg('Name', MIN_NAME_LENGTH) ]
  ],
  password: [
    [ maxLength(MAX_PASSWORD_LENGTH), maxLengthMsg('Password', MAX_PASSWORD_LENGTH) ],
    [ minLength(MIN_PASSWORD_LENGTH), minLengthMsg('Password', MIN_PASSWORD_LENGTH) ]
  ]
}

export const validateUser = validator(spec, 'credentials')

export const mutations = {
  createUser: (_, { user }, { db }) => create(db)(user),
  deleteUser: (_, { userId }, { db }) => remove(db)(userId),
  updateUser: (_, { user }, { db }) => update(db)(user)
}

export const queries = {
  user: (_, { userId }, { db }) => withId(db)(userId),
  users: (_, __, { db }) => all(db)()
}

const User = 'type User { id: ID, name: String }'
const UserInput = 'input UserInput { id: ID, name: String, password: String }'

export default [ User, UserInput ]
