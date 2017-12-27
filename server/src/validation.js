import { __, compose, isEmpty, gte, length, not, lte } from 'ramda'
import { validate } from 'spected'

export class ValidationError extends Error {
  constructor (validation, ...params) {
    super(...params)
    // Anything in extensions will be added to the list of errors by GraphQLError
    this.extensions = { validationErrors: validation }
  }
}

export const maxLength = len => compose(lte(__, len), length)
export const maxLengthMsg = (field, len) => `${field} must not be more than ${len} characters.`

export const minLength = len => compose(gte(__, len), length)
export const minLengthMsg = (field, len) => `${field} must be at least ${len} characters.`

export const notEmpty = compose(not, isEmpty)
export const notEmptyMsg = field => `${field} is required.`

// See https://github.com/25th-floor/spected/issues/90#issuecomment-320293347
// and surrounding discussion
export const isValid = spec => input => {
  let valid = true

  const failFunc = message => {
    valid = false
    return message
  }

  const validation = validate(() => true, failFunc, spec, input)

  return {
    valid,
    validation
  }
}

// For example:
//   export const validateUser = validator(spec, 'user')
//   export const mutations = {
//     updateUser: validateUser(updateUser)
//   }
export const validator = (spec, inputKey) => next => (...args) => {
  const input = args[1]
  const validator = isValid(spec)
  const validationResult = validator(input[inputKey])
  if (!validationResult.valid) {
    throw new ValidationError(validationResult, `${inputKey} validation failed.`)
  }

  next(...args)
}
