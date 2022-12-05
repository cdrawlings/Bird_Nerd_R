import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import watchService from './watchService'


const initialState = {
    watch: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}


// create a bird watching session
export const updateWatch = createAsyncThunk('session/update', async (id, updateData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await watchService.updateWatch(id, updateData, token)
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
export const getWatch = createAsyncThunk('watch/getWatch', async (id, thunkAPI) => { //updateData
    try {
        const token = thunkAPI.getState().auth.user.token
        return await sessionService.getWatch(id, token)
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


export const watchSlice = createSlice({
    name: 'watch',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateWatch.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateWatch.fulfilled, (state) => {
                state.sessionLoading = false
                state.sessionSuccess = true
            })
            .addCase(updateWatch.rejected, (state, action) => {
                state.sessionLoading = true
                state.sessionError = true
                state.message = action.payload
            })
            .addCase(getWatch.pending, (state) => {
                state.sessionLoading = true
            })
            .addCase(getWatch.fulfilled, (state, action) => {
                state.sessionLoading = false
                state.sessionSuccess = true
                state.session = action.payload
            })
            .addCase(getSession.rejected, (state, action) => {
                state.sessionLoading = true
                state.sessionError = true
                state.message = action.payload
            })
    }
})

export const {reset} = watchSlice.actions
export default watchSlice.reducer