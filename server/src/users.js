import { maxLength, maxLengthMsg, minLength, minLengthMsg, validator } from './validation'

export const all = db => () => db('users')
export const create = db => userInput => db('users').insert(userInput)
export const remove = db => userId => db('users').where('id', userId).del()
export const update = db => userInput => db('users').update(userInput).where('id', userInput.id)
export const withId = db => userId => db('users').where('id', userId)
export const withName = db => name => db('users').where('name', name)

const MAX_NAME_LENGTH = 30
const MIN_NAME_LENGTH = 3

const credentialsSpec = {
  name: [
    [ maxLength(MAX_NAME_LENGTH), maxLengthMsg('Name', MAX_NAME_LENGTH) ],
    [ minLength(MIN_NAME_LENGTH), minLengthMsg('Name', MIN_NAME_LENGTH) ]
  ],
  password: [
    [ maxLength(MAX_NAME_LENGTH), maxLengthMsg('Name', MAX_NAME_LENGTH) ],
    [ minLength(MIN_NAME_LENGTH), minLengthMsg('Name', MIN_NAME_LENGTH) ]
  ]
}

export const validateCredentials = validator(credentialsSpec, 'credentials')
