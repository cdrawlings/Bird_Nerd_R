import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toggleService from './toggleService'


const initialState = {
    toggle: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}


// create a bird watching session
// add-bird
export const toggleSeen = createAsyncThunk('session/toggle', async (sessionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await toggleService.toggleSeen(sessionData, token)
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
    name: 'session',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(toggleSeen.pending, (state) => {
                state.isLoading = true
            })
            .addCase(toggleSeen.fulfilled, (state) => {
                state.sessionLoading = false
                state.sessionSuccess = true
            })
            .addCase(toggleSeen.rejected, (state, action) => {
                state.sessionLoading = true
                state.sessionError = true
                state.sessionMessage = action.payload
            })

    }
})

export const {reset} = toggleSlice.actions
export default toggleSlice.reducer