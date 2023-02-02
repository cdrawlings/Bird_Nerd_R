import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import lastService from './lastService'

const initialState = {
    last: {},
    isLoading: false,
    isError: false,
    gotLast: false,
    message: ''
}


// Get the last bird added to DB
export const getLast = createAsyncThunk('bird/last', async (birdData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await lastService.getLast(token)
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

export const lastSlice = createSlice({
    name: 'last',
    initialState,
    reducers: {
        resetLast: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLast.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getLast.fulfilled, (state, action) => {
                state.isLoading = false
                state.gotLast = true
                state.last = action.payload
            })
            .addCase(getLast.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {resetLast} = lastSlice.actions
export default lastSlice.reducer