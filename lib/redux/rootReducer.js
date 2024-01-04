import {eventReducer} from './event/eventSlice'
import {authReducer} from './auth/authSlice'
import {authApi} from './auth/authService'

export const reducer = {
    auth: authReducer,
    event: eventReducer,
    [authApi.reducerPath]: authApi.reducer,

}
