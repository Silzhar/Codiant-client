import { createSlice } from "@reduxjs/toolkit";
import { getSbsPuzzle } from "../api/organizer";

export const sbsSlice = createSlice({
  name: "sbs",
  initialState: {
    value: 0,
    sbsPuzzle: [],
    sbsIsStarting: false,
    sbsIndex: -1,
    winner: false,
    backtomain: false
  },
  reducers: {
    setValue: (state, action) => {
      state.value = 1;
    },
    setSbsIndex: (state, action) => {
      state.sbsIndex = action.payload;
    },
    setSbsPuzzle: (state, action) => {
      state.sbsPuzzle = action.payload;
    },
    setSbsIsStarting: (state, action) => {
      state.sbsIsStarting = action.payload;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
    setBackToMain: (state, action) => {
      state.backtomain = action.payload;
    },
  },
});

//Actions
export const {
  setWinner,
  setSbsIsStarting,
  setSbsPuzzle,
  setSbsIndex,
  setValue,
  setBackToMain,
} = sbsSlice.actions;

//thunks
export const doGetSbsPuzzle = () => async (dispatch) => {
  getSbsPuzzle()
    .then((data) => {
      dispatch(setSbsPuzzle(data));
    })
    .catch((err) => {
      // dispatch(setErrorLayout(true));
      console.log(err.message);
    });
};

// dispatch(setIsLoading(true));
// fetch( baseUrl + '/api/sbs/all', {
//   method: 'GET',
//   credentials: 'include',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })
//   .then((res) => res.json())
//   .then((data) => {
//     if (data) {
//       console.log("mi sbs--->", data.data)
//       dispatch(setSbsPuzzle(data.data));
//     }
//   })
//   .catch((err) => {
//     dispatch(setErrorLayout(true));
//     console.log(err.message);
//   })
//   .finally(() => {
//     dispatch(setIsLoading(false));
//   });

// Selectors

export const selectValue = (state) => state.sbs.value;
export const selectWinner = (state) => state.sbs.winner;
export const selectSbsIndex = (state) => state.sbs.sbsIndex;
export const selectSbsPuzzle = (state) => state.sbs.sbsPuzzle;
export const selectSbsIsStarting = (state) => state.sbs.sbsIsStarting;
export const selectBackToMain = (state) => state.sbs.backtomain;

export default sbsSlice.reducer;
