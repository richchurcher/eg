import { validateCredentials } from './users'
import { ValidationError } from './validation'

export const loginUser = async credentials => {
  const validationResult = validateCredentials(credentials)
  if (!validationResult.valid) {
    throw new ValidationError(validationResult, 'Credentials validation failed.')
  }

  return { success: true }
}

export const logoutUser = async () => ({ success: true })

export const login = db => loginUser
export const logout = db => logoutUser
