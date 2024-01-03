"use server";
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://localhost:' // TODO: set backend

/**
 * @param {Object} param0 - user's credentials
 * @param {string} param0.email - user's email
 * @param {string} param0.password - user's password
 */
export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${backendURL}/api/user/login`,
                { email, password },
                config
            )
            // store user's token in local storage
            localStorage.setItem('userToken', data.userToken)
            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
/**
 * @param {Object} param0 - user's credentials
 * @param {string} param0.firstName - user's first name
 * @param {string} param0.lastName - user's last name
 * @param {string} param0.email - user's email
 * @param {string} param0.password - user's password
 */
export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(
                `${backendURL}/api/user/register`,
                { firstName, lastName, email, password },
                config
            )
        } catch (error) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)