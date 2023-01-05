import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toggleService from './toggleService'


const initialState = {
    toggle: {},
    toggles: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}


// create a bird watching session
// add-bird
export const postSeen = createAsyncThunk('count/toggle', async (sessionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await toggleService.postSeen(sessionData, token)
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


// create a bird watching session
export const getSeen = createAsyncThunk('count/seen',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await toggleService.getSeen(id, token)
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


export const toggleSlice = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(postSeen.pending, (state) => {
                state.isLoading = true
                state.postSuccess = false
            })
            .addCase(postSeen.fulfilled, (state) => {
                state.isLoading = false
                state.postSuccess = true
            })
            .addCase(postSeen.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })
            .addCase(getSeen.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSeen.fulfilled, (state, action) => {
                state.isLoading = false
                state.getSuccess = true
                state.toggles = action.payload
            })
            .addCase(getSeen.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })

    }
})

export const {reset} = toggleSlice.actions
export default toggleSlice.reducer