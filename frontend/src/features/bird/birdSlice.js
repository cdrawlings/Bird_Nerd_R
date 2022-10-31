import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import birdService from './birdService'


const initialState = {
    birds: [],
    bird: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}


// Add a new bird to spotted list
export const createBird = createAsyncThunk('bird/create', async (birdData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await birdService.createBird(birdData, token)
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


// Get the last bird added to DB
export const getBird = createAsyncThunk('bird/create', async (birdData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await birdService.getBird(birdData, token)
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

// Get all the users spotted birds from DB
export const getAllBird = createAsyncThunk('bird/getAll', async (birdData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await birdService.getAllBird(token)
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



export const birdSlice = createSlice({
    name: 'bird',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
builder
    .addCase(createBird.pending, (state) => {
        state.isLoading = true
    })
    .addCase(createBird.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
    })
    .addCase(createBird.rejected, (state, action) => {
        state.isLoading = true
        state.isError = true
        state.message = action.payload
    })
    .addCase(getAllBird.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getAllBird.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.birds = action.payload
    })
    .addCase(getAllBird.rejected, (state, action) => {
        state.isLoading = true
        state.isError = true
        state.message = action.payload
    })
    }
})

export const {reset} = birdSlice.actions
export default birdSlice.reducer