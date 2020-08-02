import { createSlice } from "@reduxjs/toolkit";
import {
  checkSession,
  myLogout,
  myLogin,
  myRegister,
} from "../api/authenticate";
import { setIdUser } from "./dashboardSlice";

export const authenticateSlice = createSlice({
  name: "authenticate",
  initialState: {
    name: "",
    email: "",
    password: "",
    isEmailValid: false,
    isPasswordValid: false,
    isSubmit: false,
    gotAccount: true,
    isAuthenticated: false,
    errorLogin: false,
    isLoading: true,
    userIdentifier: "",
    userName: "",
  },
  reducers: {
    // Flag Toogle: hay session o no?
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorLogin: (state, action) => {
      state.errorLogin = action.payload;
    },
    setFormInput: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    setIsPasswordValid: (state, action) => {
      state.isPasswordValid = action.payload.value;
    },
    toggleGotAccount: (state, action) => {
      state.gotAccount = !state.gotAccount;
    },
    setEmptyForm: (state, action) => {
      state.name = "";
      state.password = "";
      state.email = "";
      state.isEmailValid = false;
      state.isPasswordValid = false;
      state.isSubmit = false;
      state.gotAccount = true;
      state.isAuthenticated = false;
      state.errorLogin = false;
    },
    setIsSubmit: (state, action) => {
      state.isSubmit = action.payload;
    },
    setUserIdentifier: (state, action) => {
      state.userIdentifier = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },

    // checkmysession:(state, action)=>{

    // }
  },
});

export const {
  setIsLoading,
  setIsAuthenticated,
  setErrorLogin,
  setFormInput,
  setIsSubmit,
  setIsPasswordValid,
  toggleGotAccount,
  setEmptyForm,
  setUserIdentifier,
  setUserName,
} = authenticateSlice.actions;

//thunks
export const checkmysession = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  checkSession()
    .then((data) => {
      dispatch(setIsAuthenticated(true));
      dispatch(setUserIdentifier(data._id));
      dispatch(setIdUser(data._id));
      dispatch(setUserName(data.username));
    })
    .catch((err) => {
      dispatch(setIsAuthenticated(false));
      console.log(err.message);
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};

export const loginout = () => async (dispatch) => {
  myLogout()
    .then((data) => {
      // Si funciona el cierre de sesión, ponemos el usuario como NO autenticado
      dispatch(setIsAuthenticated(false));
      dispatch(setUserIdentifier(""));
      dispatch(setIdUser(""));
      dispatch(setUserName(""));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const doLogin = (body) => async (dispatch) => {
  myLogin(body)
    .then((data) => {
      console.log(data);
      dispatch(setIsAuthenticated(true));
      // console.log("debug-->", data._id)
      dispatch(setUserIdentifier(data._id));
      dispatch(setIdUser(data._id));
      dispatch(setUserName(data.username));
    })
    .catch((err) => {
      dispatch(setIsAuthenticated(false));
      dispatch(setErrorLogin(true));
      console.log(err.message);
    });
};

export const doRegister = (body) => async (dispatch) => {
  myRegister(body)
    .then((data) => {
      console.log(data);
      dispatch(setIsAuthenticated(true));
      dispatch(setUserIdentifier(data._id));
      dispatch(setUserName(data.username));
    })
    .catch((err) => {
      dispatch(setIsAuthenticated(false));
      dispatch(setErrorLogin(true));
      console.log(err.message);
    });
};

// Selectors

export const selectName = (state) => state.authenticate.name;
export const selectUserName = (state) => state.authenticate.userName;
export const selectEmail = (state) => state.authenticate.email;
export const selectPassword = (state) => state.authenticate.password;

export const selectIsLoading = (state) => state.authenticate.isLoading;
export const selectIsEmailValid = (state) => state.authenticate.isEmailValid;
export const selectIsPasswordValid = (state) =>
  state.authenticate.isPasswordValid;
export const selectUserIdentifier = (state) =>
  state.authenticate.userIdentifier;
export const selectIsSubmit = (state) => state.authenticate.isSubmit;
export const selectGotAccount = (state) => state.authenticate.gotAccount;
export const selectErrorLogin = (state) => state.authenticate.errorLogin;
export const selectIsAuthenticated = (state) =>
  state.authenticate.isAuthenticated;

export default authenticateSlice.reducer;
