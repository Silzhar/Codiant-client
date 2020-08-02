import { createSlice } from "@reduxjs/toolkit";

import { selectUserPoints } from "./JsGameSlice";
import { useSelector } from "react-redux";
import {
  getDashboard,
  putPseudoDashboard,
  putSbsDashboard,
} from "../api/dashboard";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    idUser: "",
    totalScores: 0,
    pseudoWin: false,
    pseudoDone: [false, false, false],
    myDashboard: null,
    sbsDone: [false, false],
    sbsScores: [0, 0],
    scoresJsGames: 0,
    jsgamesDone: false,
  },
  reducers: {
    setIdUser: (state, action) => {
      state.idUser = action.payload;
    },
    setTotalScores: (state, action) => {
      state.value = 1;
    },
    setPseudoWin: (state, action) => {
      state.pseudoWin = action.payload;
    },
    setPseudoDone: (state, action) => {
      state.pseudoDone[action.payload.index] = action.payload.value;
    },
    setMyDashboard: (state, action) => {
      const data = action.payload;
      state.myDashboard = data;
      state.idUser = data._id;
      state.totalScores = data.scores;
      state.sbsDone = data.sbsDone;
      state.pseudoDone = data.pseudoDone;
    },
    emptyAllWithLogout: (state, action) => {
      state.totalScores = 0;
      state.pseudoWin = false;
      state.pseudoDone = [false, false, false];
      state.myDashboard = null;
    },
    addSbsScores: (state, action) => {
      state.sbsScores[action.payload.index] =
        state.sbsScores[action.payload.index] + action.payload.value;
    },
    totalScoresJsGames: (state, action) => {
      console.log('valor de action en totalScoresJsGames',action);
      const score = action.payload;
      state.scoresJsGames = score;
      state.jsgamesDone = true;
    },
    setSbsDone: (state, action) => {
      state.sbsDone[action.payload.index] = true;
    },
  },
});

//Actions
export const {
  setIdUser,
  addSbsScores,
  setSbsDone,
  emptyAllWithLogout,
  setMyDashboard,
  setValue,
  setPseudoDone,
  setPseudoWin,
  changeJsGameEnd,
  totalScoresJsGames,
} = dashboardSlice.actions;

export const doGetDashboard = (myUserIdentifier) => async (dispatch) => {
  getDashboard(myUserIdentifier)
    .then((data) => {
      // console.log("DATAINSLICEDASHBOARD", data)
      dispatch(setMyDashboard(data));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const doPutPseudoDashboard = (myUserIdentifier, body) => async (
  dispatch
) => {
  putPseudoDashboard(myUserIdentifier, body)
    .then((data) => {
      //dispatch(setPseudoDone({index: myCurrentIndex, value: myScores[myCurrentIndex]}))
      dispatch(setPseudoDone(body));
    })
    .catch((err) => {
      // dispatch(setErrorLayout(true));
      console.log(err.message);
    });
};

export const doPutSbsDashboard = (myUserIdentifier, body) => async (
  dispatch
) => {
  console.log("doPutSbsDashboard el body---------->");
  putSbsDashboard(myUserIdentifier, body)
    .then((data) => {
      //dispatch(setPseudoDone({index: myCurrentIndex, value: myScores[myCurrentIndex]}))
      dispatch(setSbsDone(body));
    })
    .catch((err) => {
      // dispatch(setErrorLayout(true));
      console.log(err.message);
    });
};

// Selectors

export const selectTotalScores = (state) => state.dashboard.totalScores;
export const selectPseudoWin = (state) => state.dashboard.pseudoWin;
export const selectPseudoDone = (state) => state.dashboard.pseudoDone;
export const selectMyDashboard = (state) => state.dashboard.myDashboard;
// export const select = (state) => state.dashboard.myDashboard;
// export const selectMyDashboard = (state) => state.dashboard.myDashboard;
export const selectSbsScores = (state) => state.dashboard.sbsScores;
export const selectIdUser = (state) => state.dashboard.idUser;
export const selectSbsDone = (state) => state.dashboard.sbsDone;
export const selectJsgamesDone = (state) =>
  state.dashboard.myDashboard ? state.dashboard.myDashboard.jsgamesDone : false;

export default dashboardSlice.reducer;
