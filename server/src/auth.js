export const login = async (_, { credentials }, { db }) => {
}

export const logoutUser = async () => ({ success: true })

export const logout = db => logoutUser
