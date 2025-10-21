import { createSlice } from "@reduxjs/toolkit";

const addTra = createSlice({
    name: 'toggle',
    initialState: {
        isActive: false
    },
    reducers: {
        toggle: (state) => {
        state.isActive = !state.isActive;
        }
    }
})

export const { toggle } = toggleSlice.actions;
export default toggleSlice.reducer;