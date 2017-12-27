import { pick } from 'ramda'

import { spec } from './users'
import { validator } from './validation'

export const login = async (_, { credentials }, { db }) => {
}

export const logoutUser = async () => ({ success: true })

export const logout = db => logoutUser

const credentialsSpec = pick([ 'name', 'password' ], spec)
export const validateCredentials = validator(credentialsSpec, 'credentials')

export const mutations = {
  login: validateCredentials(login),
  logout: (_, __, { db }) => logout(db)()
}

const AuthResult = 'type AuthResult { success: Boolean, message: String }'
const CredentialsInput = 'input CredentialsInput { name: String!, password: String! }'

export default [ AuthResult, CredentialsInput ]
