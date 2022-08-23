import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = JSON.parse(localStorage.getItem("titles") || "");

// const initialState = {

// };

const titlesSlice = createSlice({
	name: "titles",
	initialState,
	reducers: {},
});

export default titlesSlice.reducer;
