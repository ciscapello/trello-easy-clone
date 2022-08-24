import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface TitleUpdateAction {
  id: number;
  newTitle: string;
}

let initialState: string[];

if (localStorage.getItem("titles")) {
  initialState = JSON.parse(localStorage.getItem("titles") || "");
} else {
  initialState = ["TODO", "In Progress", "Testing", "Done"];
}

const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    titleUpdate: (state, action: PayloadAction<TitleUpdateAction>) => {
      const { newTitle, id } = action.payload;
      state[id] = newTitle;
      localStorage.setItem("titles", JSON.stringify(state));
    },
  },
});

export const { titleUpdate } = titlesSlice.actions;
export default titlesSlice.reducer;
