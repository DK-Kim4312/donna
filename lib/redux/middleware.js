import { authApi } from './auth/authService'

const middleware = [
    authApi.middleware,
]

export { middleware }
