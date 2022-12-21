import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import sessionService from './sessionService'


const initialState = {
    sessions: [],
    session: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}


// create a bird watching session
// add-bird
export const createSession = createAsyncThunk('session/create', async (sessionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await sessionService.createSession(sessionData, token)
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

// Get all bird watching sessions
export const getSessions = createAsyncThunk('session/getSessions', async (sessionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await sessionService.getSessions(token)
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

// Get Last bird watching session
export const getSession = createAsyncThunk('session/getSession', async (sessionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await sessionService.getSession(token)
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


export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSession.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createSession.fulfilled, (state) => {
                state.sessionLoading = false
                state.sessionSuccess = true
            })
            .addCase(createSession.rejected, (state, action) => {
                state.sessionLoading = true
                state.sessionError = true
                state.sessionMessage = action.payload
            })
            .addCase(getSessions.pending, (state) => {
                state.sessionLoading = true
            })
            .addCase(getSessions.fulfilled, (state, action) => {
                state.sessionLoading = false
                state.sessionSuccess = true
                state.session = action.payload
            })
            .addCase(getSessions.rejected, (state, action) => {
                state.sessionLoading = true
                state.sessionError = true
                state.sessionMessage = action.payload
            })
            .addCase(getSession.pending, (state) => {
                state.sessionLoading = true
            })
            .addCase(getSession.fulfilled, (state, action) => {
                state.sessionLoading = false
                state.sessionSuccess = true
                state.session = action.payload
            })
            .addCase(getSession.rejected, (state, action) => {
                state.sessionLoading = true
                state.sessionError = true
                state.sessionMessage = action.payload
            })
    }
})

export const {reset} = sessionSlice.actions
export default sessionSlice.reducer