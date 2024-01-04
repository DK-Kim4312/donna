import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        PUSH_EVENT: (state, { payload }) => {
            return [...state, payload];
        },
        UPDATE_EVENT: (state, { payload }) => {
            return state.map((evt) =>
                evt.id === payload.id ? payload : evt
            );
        },
        DELETE_EVENT: (state, { payload }) => {
            return state.filter((evt) => evt.id !== payload.id);
        }
    },
    extraReducers: {

    },
})

export const { PUSH_EVENT, UPDATE_EVENT, DELETE_EVENT } = eventSlice.actions
export const { eventReducer } = eventSlice.reducer