import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import addBirdService from './addBirdService'


const initialState = {
    addBird: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}


// Add a new bird to spotted list - U
export const addBird = createAsyncThunk('count/create', async (birdData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await addBirdService.addBird(birdData, token)
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


export const addBirdSlice = createSlice({
    name: 'addBird',
    initialState,
    reducers: {
        resetAddBird: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBird.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addBird.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(addBird.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {resetAddBird} = addBirdSlice.actions
export default addBirdSlice.reducer