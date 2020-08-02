import { createSlice } from "@reduxjs/toolkit";
import { getPseudoPuzzle } from "../api/organizer";

export const pseudocodeSlice = createSlice({
  name: "pseudocode",
  initialState: {
    value: 0,
    isLoading: true,
    puzzle: [],
    errorLayout: false,
    startPlay: false,
    done: [false, false, false],
    scores: [100, 100, 100],
    numberOfTime: 3,
    currentIndex: -1,
  },
  reducers: {
    setValue: (state, action) => {
      state.value = 1;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPuzzle: (state, action) => {
      state.puzzle = action.payload;
    },
    setErrorLayout: (state, action) => {
      state.errorLayout = action.payload;
    },
    setStartPlay: (state, action) => {
      state.startPlay = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setScores: (state, action) => {
      state.scores[action.payload.index] = action.payload.value;
    },
  },
});

//Actions
export const {
  setScores,
  setCurrentIndex,
  setStartPlay,
  setValue,
  setIsLoading,
  setErrorLayout,
  setPuzzle,
} = pseudocodeSlice.actions;

//thunks
export const doGetPseudoPuzzle = () => async (dispatch) => {
  getPseudoPuzzle()
    .then((data) => {
      dispatch(setPuzzle(data));
    })
    .catch((err) => {
      // dispatch(setErrorLayout(true));
      console.log(err.message);
    });
};

// Selectors

export const selectValue = (state) => state.pseudocode.value;
export const selectIsLoading = (state) => state.pseudocode.isLoading;
export const selectPuzzle = (state) => state.pseudocode.puzzle;
export const selectErrorLayout = (state) => state.pseudocode.errorLayout;
export const selectStartPlay = (state) => state.pseudocode.startPlay;
export const selectCurrentIndex = (state) => state.pseudocode.currentIndex;
export const selectScores = (state) => state.pseudocode.scores;

export default pseudocodeSlice.reducer;
