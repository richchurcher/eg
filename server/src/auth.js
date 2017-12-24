export const loginUser = ({ name, password }) => Promise.resolve({ success: true, message: `${name}, ${password}` })

export const logoutUser = () => Promise.resolve({ success: true })

export const login = db => loginUser
export const logout = db => logoutUser
