import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    location: [],
    isLoading: true,
}

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        addLocation: (state, action) => {
            state.location = action.payload
        }
    }
})

export const { addLocation } = locationSlice.actions
export default locationSlice.reducer