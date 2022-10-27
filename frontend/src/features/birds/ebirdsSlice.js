import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    ebirds: [],
    isLoading: true,
}

const ebirdsSlice = createSlice({
    name: "ebirds",
    initialState,
    reducers: {
        geteBirds: (state, action) => {
            state.ebirds = action.payload
        }
    }
})

export const { geteBirds } = ebirdsSlice.actions
export default ebirdsSlice.reducer