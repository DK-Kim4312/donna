"use server";
import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authActions'


// TODO: need backend first initialize userToken from local storage
const userToken = //localStorage.getItem('userToken')
    //? localStorage.getItem('userToken')
   // : null
   null

const initialState = {
    loading: false,
    userInfo: {}, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            // ...logout reducer
          },
          setCredentials: (state, { payload }) => {
            state.userInfo = payload
          },
    },
    extraReducers: {
        // login user
        [userLogin.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.userToken
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        // register user
        [registerUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    },
})

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer