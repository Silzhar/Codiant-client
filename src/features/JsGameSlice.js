import { createSlice } from "@reduxjs/toolkit";


export const jsGameSlice = createSlice({
  name: "jsGame",
  initialState: {
    isStarted: false,
    gameNumber: 0,
    games: [],
    availablePoints: 100,
    userPoints: 0,
    finishGames: false,
    game: 0,
    failSphere: false,
  },
  reducers: {
    startAndStop: (state) => {
      state.isStarted = !state.isStarted;
      state.winner = null;
      state.failSphere = false;
    },
    isFinishGames: (state, action) => {
      if (state.game === 3) {
        state.finishGames = true;
      }
    },
    pushGames: (state, action) => {
      state.games = action.payload;
    },
    substractPoints: (state) => {
      if (state.availablePoints === 100) {
        state.availablePoints = 50;
        state.failSphere = true;
      } else if (state.availablePoints === 50) {
        state.availablePoints = 20;
        state.failSphere = true;
      }
      state.isStarted = false;
    },
    winGame: (state, action) => {
      state.gameNumber = state.gameNumber + 1; // Subimos uno el index de juegos
      state.userPoints = state.userPoints + state.availablePoints; // Sumamos a la puntuación
      state.availablePoints = 100; // Reseteamos los puntos disponibles
      state.isStarted = false; // Mostramos la imagen del juego al usuario
      state.game += 1;
    },
    completAllGames: (state, action) => {
      state.availablePoints = 100;
      state.isStarted = false;
      state.finishGames = true;
      state.gameNumber = 0;
      state.userPoints = 0;
    },
  },
});

// actions.
export const {
  startAndStop,
  isFinishGames,
  pushGames,
  substractPoints,
  winGame,
  completAllGames,
} = jsGameSlice.actions;

// Selectors.
export const selectIsStarted = (state) => state.jsGame.isStarted;
export const selectGameNumber = (state) => state.jsGame.gameNumber;
export const selectGames = (state) => state.jsGame.games;
export const selectUserPoints = (state) => state.jsGame.userPoints;
export const selectFinishGames = (state) => state.jsGame.finishGames;
export const selectFailSphere = (state) => state.jsGame.failSphere;

export default jsGameSlice.reducer;
