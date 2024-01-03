/* Instruments */
import { authReducer } from './auth/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/authService'

export const reducer = {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
}
