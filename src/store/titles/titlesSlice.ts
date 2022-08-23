import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface TitleUpdateAction {
  id: number;
  event: { target: HTMLInputElement };
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
      const { event, id } = action.payload;
      const newArr = state.map((title, index) => {
        if (index === id) {
          return (title = event.target.value);
        }
        return title;
      });
      state = newArr;
      localStorage.setItem("titles", JSON.stringify(newArr));
    },
  },
});

export const { titleUpdate } = titlesSlice.actions;
export default titlesSlice.reducer;
