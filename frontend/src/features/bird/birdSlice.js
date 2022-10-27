import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import birdService from './birdService'
import authService from "../auth/authService";

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

export const birdSlice = createSlice({
    name: 'bird',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {

    }
})

export const {reset} = birdSlice.actions
export default birdSlice.reducer