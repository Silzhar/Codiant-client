import React from "react";
// import { Link } from 'react-router-dom';
import Loader from 'react-loaders'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Redirect } from 'react-router'
import Dashboard from "../Dashboard";

import "./style.scss";
import {
  setIsPasswordValid,
  setErrorLogin,

  // SET
  setIsSubmit,
  setFormInput,
  toggleGotAccount,
  setIsAuthenticated,
  setEmptyForm,
  setIsLoading,
  setUserName,
  selectUserName,
  setUserIdentifier,
  selectUserIdentifier,

  // SELECT
  selectIsLoading,
  selectEmail,
  selectName,
  selectPassword,
  selectIsPasswordValid,
  selectIsSubmit,
  selectGotAccount,
  selectIsAuthenticated,
  selectErrorLogin,

  //thunks
  checkmysession,
  loginout,
  doLogin,
  doRegister,

} from "../../features/authenticateSlice";

import {
setMyDashboard,
selectMyDashboard,
emptyAllWithLogout,

doGetDashboard,
// selectTotalScores, selectPseudoDone,
} from "../../features/dashboardSlice";

const baseUrl = "http://localhost:4000";

function Authenticate() {
  const myEmail = useSelector(selectEmail);
  const myName = useSelector(selectName);
  const myPassword = useSelector(selectPassword);
  const myIsLoading = useSelector(selectIsLoading);
  const myIsPasswordValid = useSelector(selectIsPasswordValid);
  const myUserIdentifier = useSelector(selectUserIdentifier);
  const myMyDashboard = useSelector(selectMyDashboard)
  const nam = useSelector(selectUserName)
  // const myTotalScores = useSelector(selectTotalScores)
  // const myPseudoDone = useSelector(selectPseudoDone)

  const [myAux, setMyAux] = useState(false);
  const [myRedirect, setMyRedirect] = useState(false);
  // Flag si el formulario está subido
  const myIsSubmit = useSelector(selectIsSubmit);
  // Hace el switch entre Login & Register
  const myGotAccount = useSelector(selectGotAccount);
  // Flag si hay un usuario autenticado
  const myIsAuthenticated = useSelector(selectIsAuthenticated);
  // Flag Error en el formulario de login
  const myErrorLogin = useSelector(selectErrorLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    const psw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
      myPassword
    );
    dispatch(setIsPasswordValid({ value: psw }));
  }, [myPassword]);


  useEffect(() => {
    dispatch(checkmysession());
    setMyAux(true)
  }, []);





  // // Efecto para comprobar si hay sesión al recargar
  // useEffect(() => {
  //   fetch(baseUrl + "/api/user/check-session", {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         // 🚀 Si hay datos, el usuario estará autenticado
  //         console.log("datas checksession", data);
  //         console.log("antes de checksession setsetIsAuthenticated linea 82");
  //         dispatch(setIsAuthenticated(true));
  //         console.log("data.data._id)-->", data.data._id);
  //         dispatch(setUserIdentifier(data.data._id))
  //         dispatch(setUserName(data.data.username))
  //         console.log("myUserIdentifier justo debajo", myUserIdentifier)
  //       }
  //     })
  //     .catch((err) => {
  //       dispatch(setIsAuthenticated(false));
  //       console.log(err.message);
  //     })
  //     .finally(() => {
  //       dispatch(setIsLoading(false));
  //       setMyAux(true)
  //     });
  // }, []);




useEffect(() => {

if(true){
  // console.log("myUserIdentifierwwww-->", myUserIdentifier)
  // const url = "/api/dashboard/mydashboard/" + myUserIdentifier
  dispatch(setIsLoading(true));
  // console.log("myurlgetdashboard--->",url)
  dispatch(doGetDashboard(myUserIdentifier))
  dispatch(setIsLoading(false));
  setMyAux(false)


}





//   console.log("myUserIdentifierwwww-->", myUserIdentifier)
// if(true)
//   {
//   const url = baseUrl + "/api/dashboard/mydashboard/" + myUserIdentifier
//   console.log("myurl-->", url)
//   console.log("myUserIdentifier-->", myUserIdentifier)
//   const config = {
//     method: "GET",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }

//   dispatch(setIsLoading(true));
//   fetch(url, config)
//     .then((res) => res.json())
//     .then((data) => {
//       if (data) {
//         console.log("datas check", data);
//         dispatch(setMyDashboard(data.data))
//       }
//     })
//     .catch((err) => {
//       console.log(err.message);
//     })
//     .finally(() => {
//       dispatch(setIsLoading(false));
//       setMyAux(false)
//     });


//   }

}, [myUserIdentifier]);





  function handleCloseSession() {

    dispatch(loginout());
    dispatch(emptyAllWithLogout())


    // fetch(baseUrl + "/api/user/logout", {
    //   method: "GET",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // Si funciona el cierre de sesión, ponemos el usuario como NO autenticado
    //     dispatch(setIsAuthenticated(false));
    //     dispatch(setUserIdentifier(""))
    //     dispatch(setUserName(""))
    //     dispatch(emptyAllWithLogout())
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }




  //   function handleAuth() {

  //     const url = myGotAccount
  //       ? baseUrl+'/api/user/login'
  //       : baseUrl+'/api/user/register';

  //     // Función FETCH para registrar un usuario
  //     fetch(url, {
  //       method: 'POST',
  //       body: JSON.stringify({
  //           username: myName,
  //           password: myPassword,
  //           email: myEmail

  //       }), // Mandamos el body hecho string en un fetch,
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         console.log("setIsAuthenticated linea 139 en post register")
  //         dispatch(setIsAuthenticated(true));
  //       })
  //       .catch((err) => {
  //         dispatch(setIsAuthenticated(false));
  //         console.log("myisauthenticated", myIsAuthenticated)
  //         dispatch(setErrorLogin(true))
  //         console.log(err.message);
  //       });
  //   }

  async function handleAuth() {
    const url = myGotAccount
      ? baseUrl + "/api/user/login"
      : baseUrl + "/api/user/register";

    // const settings = {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: myName,
    //     password: myPassword,
    //     email: myEmail,
    //   }), // Mandamos el body hecho string en un fetch,
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const body = {
      username: myName,
      password: myPassword,
      email: myEmail,
    }

    if(myGotAccount) {
            dispatch(doLogin(body))
            setMyRedirect(true)
          }
          else{
            dispatch(doRegister(body))
            setMyRedirect(true)
          }


    // try {
    //   const fetchResponse = await fetch(url, settings);
    //   const data = await fetchResponse.json();

    //   if (!fetchResponse.ok) {
    //     throw new Error(data.message);
    //   }
    //   setMyRedirect(true)
    //   console.log(data);
    //   console.log("setIsAuthenticated linea 139 en post register");
    //   dispatch(setIsAuthenticated(true));
    //   dispatch(setUserName(data.data.username))
      
    // } catch (error) {
    //   dispatch(setIsAuthenticated(false));
    //   console.log("myisauthenticated", myIsAuthenticated);
    //   dispatch(setErrorLogin(true));
    //   console.log(error.message);
    // }
  }

  /**
   * revisado
   */
  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(setIsSubmit(true));
    if (myIsPasswordValid) handleAuth();
  }

  async function handleChangeInput(e) {
    e.preventDefault();
    const { value, name } = e.target;
    await dispatch(setFormInput({ value: value, name: name }));
  }

  function handleNoAccount() {
    dispatch(toggleGotAccount());
  }
  function handleLogout() {
    handleCloseSession();
    dispatch(setEmptyForm());
  }
  /**
   * revisado
   */

  if (myIsLoading) {
    return <div className="myloader"><Loader type="pacman" /></div>
  }

  if(myRedirect){
    setMyRedirect(false)
    return <Redirect to='/courses'/>;
  }

  return (
    <div className="Authenticate">
      {/* <img className="Authenticate__image" alt="game hub" src=""/> */}

      {!myIsAuthenticated ? (
        <div className="Authenticate__container">
          <form onSubmit={handleOnSubmit} autoComplete="off">
            {myGotAccount ? (
              <div className="Authenticate__divtitle">Login</div>
            ) : (
              <div className="Authenticate__divtitle">Register</div>
            )}
            {myErrorLogin && myGotAccount ? (
              <p className="Authenticate__error">Error login</p>
            ) : null}
            {!myGotAccount ? (
              <div>
                <label className="Authenticate__label">
                  <input
                    autoComplete="off"
                    className="Authenticate__input"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={myName}
                    onChange={handleChangeInput}
                  />
                </label>
              </div>
            ) : null}

            <div>
              <label className="Authenticate__label">
                <input
                  className="Authenticate__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={myEmail}
                  onChange={handleChangeInput}
                />
              </label>
            </div>

            <div>
              <label className="Authenticate__label">
                {myIsSubmit && !myIsPasswordValid ? (
                  <p className="Authenticate__error">Error en la password</p>
                ) : null}
                <input
                  className="Authenticate__input"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={myPassword}
                  onChange={handleChangeInput}
                />
              </label>
            </div>
            {!myGotAccount ? (
              <p className="Authenticate__divtitle1">
                <input
                  type="checkbox"
                  name="checkbox"
                  value="check"
                  id="agree"
                  required
                />
                Estoy de acuerdo con la politica de privacidad
              </p>
            ) : null}

            <button
              className="Authenticate__button-add"
              disabled={!myIsPasswordValid || !myEmail}
              type="submit"
            >
              {myGotAccount ? "Iniciar sesión" : "Registrate"}
            </button>
            {myGotAccount ? (
              <p className="Authenticate__divtitle1" onClick={handleNoAccount}>
                {" "}
                ¿No tienes cuenta? Pincha aquí{" "}
              </p>
            ) : (
              <p className="Authenticate__divtitle1" onClick={handleNoAccount}>
                {" "}
                ¿Ya tienes cuenta? Logueate{" "}
              </p>
            )}
          </form>
        </div>
      ) : (
        <div className="Authenticate__logindiv">
          <h1 className="Authenticate__divtitle">Bienvenid@ {nam}</h1>
          <Dashboard />
          <div>
            <button onClick={handleLogout} className="Authenticate__button">
              LOGOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Authenticate;
