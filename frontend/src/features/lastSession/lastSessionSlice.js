import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

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
        return await lastService.getLastSession(token)
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
    name: 'last',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLast.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getLast.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.last = action.payload
            })
            .addCase(getLast.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = lastSessionSlice.actions
export default lastSessionSlice.reducer