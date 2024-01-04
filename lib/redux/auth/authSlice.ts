"use strict";
import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authActions'
import { LoginResponse } from '@/pages/api/user/login'


const initialState: Partial<LoginResponse> = {};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = null
            state.userToken = null
            state.error = null
            state.loading = false
            state.success = false
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
export const { authReducer } = authSlice.reducer