import React, { useEffect } from 'react'

import Loader from 'react-loaders'
import { Redirect } from 'react-router'
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";

import { selectIsAuthenticated , 
  setIsAuthenticated,
//thunks
  checkmysession
} from "../../features/authenticateSlice";
import { 
    selectIsLoading, 
    setIsLoading,

    setPuzzle,
    selectPuzzle,

    setErrorLayout,
    selectErrorLayout,

    setStartPlay,
    selectStartPlay,

    selectCurrentIndex,
    setCurrentIndex,

    //thunks
    doGetPseudoPuzzle,
} from "../../features/pseudocodeSlice";


import { 
  setSbsPuzzle,selectSbsPuzzle,
  setSbsIndex, selectSbsIndex,
  setSbsIsStarting, selectSbsIsStarting,
  setBackToMain,

  //thunks
  doGetSbsPuzzle,
} from "../../features/sbsSlice";

import './style.scss'
const baseUrl = "http://localhost:4000"


function Organizer({organizer}) {
    const myIsLoading = useSelector(selectIsLoading)
    const myPuzzle = useSelector(selectPuzzle)
    const mySelectCurrentIndex = useSelector(selectCurrentIndex)
    const myStartPlay = useSelector(selectStartPlay)
    const dispatch = useDispatch();
    const myIsAuthenticated = useSelector(selectIsAuthenticated);
    const mySbsPuzzle = useSelector(selectSbsPuzzle)
    const mySbsIsStarting = useSelector(selectSbsIsStarting)
    let loader = <Loader type="pacman" />
    console.log("organizer variable-->", organizer)
  
    useEffect(() => {
      dispatch(setBackToMain(false))
    },[])
  //     // Efecto para comprobar si hay sesión al recargar
  // useEffect(() => {
  //   dispatch(setIsLoading(true));
  //   fetch( baseUrl + '/api/user/check-session', {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         // 🚀 Si hay datos, el usuario estará autenticado
  //         console.log("datas checksession", data)
  //         console.log("antes de checksession setsetIsAuthenticated linea 82")
  //         dispatch(setIsAuthenticated(true));
  //       }
  //     })
  //     .catch((err) => {
  //       dispatch(setIsAuthenticated(false));
  //       console.log(err.message);
  //     })
  //     .finally(() => {
  //       dispatch(setIsLoading(false));
  //     });
  // }, []);


  useEffect(() => {
    // dispatch(setIsLoading(true));
    // fetch( baseUrl + '/api/pseudocode/all', {
    //   method: 'GET',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data) {
    //       dispatch(setPuzzle(data.data));
    //     }
    //   })
    //   .catch((err) => {
    //     dispatch(setErrorLayout(true));
    //     console.log(err.message);
    //   })
    //   .finally(() => {
    //     dispatch(setIsLoading(false));
    //   });
    
    dispatch(setIsLoading(true));
    console.log("setIsLoading 5555 true")
    dispatch(doGetPseudoPuzzle())
    dispatch(doGetSbsPuzzle())
    dispatch(setIsLoading(false));
    console.log("setIsLoading 5555 false")


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




  }, []);


  // useEffect(() => {
  //   dispatch(setIsLoading(true));
  //   fetch( baseUrl + '/api/sbs/all', {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         console.log("mi sbs--->", data.data)
  //         dispatch(setSbsPuzzle(data.data));
  //       }
  //     })
  //     .catch((err) => {
  //       dispatch(setErrorLayout(true));
  //       console.log(err.message);
  //     })
  //     .finally(() => {
  //       dispatch(setIsLoading(false));
  //     });
  // }, []);

  // console.log("myisauth aqui 333",myIsAuthenticated )
    if (!myIsAuthenticated) {

        return <Redirect to='/'/>;
      }

    if (myIsLoading) {
        //return <h1>Loading...</h1>;
        return <div className="myloader"><Loader type="pacman" /></div>
      }
    
      function handleOnClick(e){
        console.log("holiiiiiii")
        const index = Number(e) -1;
        dispatch(setStartPlay(true))
        dispatch(setCurrentIndex(index))
      }

      function handleOnClickSbs(e){
        console.log("holi noum --->", e)
        const index = Number(e) -1;
        dispatch(setSbsIsStarting(true))
        dispatch(setSbsIndex(index))
      }


      if(myStartPlay){
        return <Redirect to='/pseudocode/sortlist'/>;
      }

      if(mySbsIsStarting){
        return <Redirect to='/html/sbs'/>;
      }

    if (!myIsAuthenticated) {
        return <Redirect to='/'/>;
      }

    return (

      <div className="cont">
        
        <div className="Organizer">
        { organizer === "pseudocode" ?
        <div className="Organizer__div">
                  {myPuzzle.map((element)=>
                  <div key={element.reference} className="Organizer__card grow">
                    <p className="Organizer__title">{element.title}</p>
                    <p  className="Organizer__subtitle">{element.subtitle}</p>
                    <p  className="Organizer__desc">{element.description}</p>
                    <button  className="Organizer__button" onClick={()=>{ handleOnClick(element.reference) }}>PLAY PUZZLE</button>
            </div>
                    
                    
                  )}
           
        </div>
        : null}

{ organizer === "html" ?    
           <div className="Organizer__div">
          {mySbsPuzzle.map((element)=>
          <div key={element.reference} className="Organizer__card grow">
            <p className="Organizer__title">{element.title}</p>
            <p  className="Organizer__subtitle">{element.subtitle}</p>
            <p  className="Organizer__desc">{element.description}</p>
            <button  className="Organizer__button" onClick={()=>{ handleOnClickSbs(element.reference) }}>PLAY PUZZLE</button>
    </div>
            
            
          )}
           
           </div>
            : null}




        </div></div>
    )
}

export default Organizer