import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import lastSessionService from './lastSessionService'

const initialState = {
    lastSession: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}


// Get the last bird added to DB
export const getLastSession = createAsyncThunk('session/last', async (birdData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await lastSessionService.getLastSession(token)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const lastSessionSlice = createSlice({
    name: 'lastSession',
    initialState,
    reducers: {
        resetSession: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLastSession.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getLastSession.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.lastSession = action.payload
            })
            .addCase(getLastSession.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {resetSession} = lastSessionSlice.actions
export default lastSessionSlice.reducer