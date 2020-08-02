import { render } from 'react-dom'
import React, { useRef, useState } from 'react'
import clamp from 'lodash-es/clamp'
import swap from 'lodash-move'
import { Redirect } from 'react-router'
import { useEffect } from "react";
import { useGesture } from 'react-with-gesture'
import { useSelector, useDispatch} from "react-redux";
import { useSprings, animated, interpolate } from 'react-spring'

// PSEUDOCODE SLICE
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

  selectScores,
  setScores,
  


} from "../../features/pseudocodeSlice";




// AUTHENTICATE SLICE
import { 
  setUserIdentifier,
  selectUserIdentifier,
  setIsAuthenticated,
  selectIsAuthenticated,

  //thunks
  checkmysession,


} from "../../features/authenticateSlice";


// DASHBOARD SLICE
import { 
  selectPseudoWin,
  setPseudoWin,
  setPseudoDone,
  selectPseudoDone,

  //thunks
  doPutPseudoDashboard,

} from "../../features/dashboardSlice";

import './style.scss'


// WHEN dragging, this function will be fed with all arguments.
// OTHERWISE, only the list order is relevant.
const fn = (order, down, originalIndex, curIndex, y) => index =>
  down && index === originalIndex
    ? /*
      No need to transition the following properties:
      - z-index, the elevation of the item related to the root of the view; it should pop straight up to 1, from 0.
      - y, the translated distance from the top; it's already being updated dinamically, smoothly, from react-gesture.
      Thus immediate returns `true` for both.
    */
    { y: curIndex * 45 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex' }
    : { y: order.indexOf(index) * 45, scale: 1, zIndex: '0', shadow: 1, immediate: false }


    const baseUrl = "http://localhost:4000";
function SortList() {
  const dispatch = useDispatch();
  const myStartPlay = useSelector(selectStartPlay)
  const myPuzzle = useSelector(selectPuzzle)
  const myCurrentIndex = useSelector(selectCurrentIndex)
  const myScores = useSelector(selectScores)
  const myPseudoWin = useSelector(selectPseudoWin)
  const myUserIdentifier = useSelector(selectUserIdentifier)
  const myPseudoDone = useSelector(selectPseudoDone)
  const myIsAuthenticated = useSelector(selectIsAuthenticated);






  const items = myPuzzle[myCurrentIndex].puzzle
  const solution = myPuzzle[myCurrentIndex].solution
  // console.log("items aux --->", items)
  // console.log("solution aux --->", solution)
  const url = baseUrl + "/api/dashboard/pseudovalidate"
  // Set the items initial value as listItems state 🔥
  const [listItems, setListItems] = useState(items);
  // const items = 'Lorem ipsum dolor sit'.split(' ')
  const order = useRef(listItems.map((_, index) => index)) // Store indices as a local ref, this represents the item order
  /*
  try {
      const fetchResponse = await fetch(url, settings);
      const data = await fetchResponse.json();

      if (!fetchResponse.ok) {
        throw new Error(data.message);
      }
      
      console.log(data);
      console.log("setIsAuthenticated linea 139 en post register");
      dispatch(setIsAuthenticated(true));
    } catch (error) {
      dispatch(setIsAuthenticated(false));
      console.log("myisauthenticated", myIsAuthenticated);
      dispatch(setErrorLogin(true));
      console.log(error.message);
    }
  */ 




 useEffect(() => {


  dispatch(checkmysession())
  // dispatch(setIsLoading(true));
  // fetch( baseUrl + '/api/user/check-session', {
  //   method: 'GET',
  //   credentials: 'include',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (data) {
  //       // 🚀 Si hay datos, el usuario estará autenticado
  //       console.log("datas checksession", data)
  //       console.log("antes de checksession setsetIsAuthenticated linea 82")
  //       console.log("myid aiaiai ", data.data._id)
  //       dispatch(setIsAuthenticated(true));
  //       dispatch(setUserIdentifier(data.data._id))
  //       console.log("my identifier  aiaiai", myUserIdentifier)
  //     }
  //   })
  //   .catch((err) => {
  //     dispatch(setIsAuthenticated(false));
  //     console.log(err.message);
  //   })
  //   .finally(() => {
  //     dispatch(setIsLoading(false));
  //   });
}, []);






  async function validatingWin(){
    if(myPseudoWin)
  {

      const body = {
            index: myCurrentIndex,
            value: myScores[myCurrentIndex]
          }

      
    dispatch(doPutPseudoDashboard(myUserIdentifier, body))
        // const settings = {
        //   method: "PUT",
        //   body: JSON.stringify({
        //     index: myCurrentIndex,
        //     value: myScores[myCurrentIndex]
        //   }), 
        //   credentials: "include",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // };


        // try {
          
        //   const url = baseUrl + '/api/dashboard/pseudovalidate/'+ myUserIdentifier
        //   console.log("url put -->",url)
        //   const fetchResponse = await fetch(url, settings);
        //   const data = await fetchResponse.json();

        //   if (!fetchResponse.ok) throw new Error(data.message)
        //   dispatch(setPseudoDone({index: myCurrentIndex, value: myScores[myCurrentIndex]}))
        //   dispatch(setPseudoWin(true))
        //   //return

          
        // } catch (error) {
        //   console.log(error.message);
        // }
  
  
  }

  }
  
  useEffect( () => {validatingWin()} , [myPseudoWin]);
  
  
  
  
  /*
    Curries the default order for the initial, "rested" list state.
    Only the order array is relevant when the items aren't being dragged, thus
    the other arguments from fn don't need to be supplied initially.
  */
  const [springs, setSprings] = useSprings(listItems.length, fn(order.current))
  const bind = useGesture(({ args: [originalIndex], down, delta: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, listItems.length - 1)
    const newOrder = swap(order.current, curIndex, curRow)
    /*
      Curry all variables needed for the truthy clause of the ternary expression from fn,
      so that new objects are fed to the springs without triggering a re-render.
    */
    setSprings(fn(newOrder, down, originalIndex, curIndex, y))
    //  Set the new listItems after reordering 🔥
    const newListItems = newOrder.map(i => listItems[i])
    setListItems(newListItems)
    // Settles the new order on the end of the drag gesture (when down is false)
    if (!down) order.current = newOrder
  })


  function backToMain(){
    dispatch(setStartPlay(false))
  }

  function handleStartAgain(){

  }

  function handleValidate(){

    if (JSON.stringify(listItems) === JSON.stringify(solution)) {
      dispatch(setPseudoWin(true))
      console.log("Orden Correcto")
    }
        else{
            if(!myPseudoDone[myCurrentIndex] && myScores[myCurrentIndex] === 100) dispatch(setScores({ index: myCurrentIndex, value: 50}))
            if(!myPseudoDone[myCurrentIndex] && myScores[myCurrentIndex] === 50) dispatch(setScores({ index: myCurrentIndex, value: 20}))
        }

  }

  if(!myStartPlay){
    dispatch(setPseudoWin(false))
    return <Redirect to='/pseudocode'/>
  }

  if (!myIsAuthenticated) {

    return <Redirect to='/'/>;
  }

  return (
    <>
      <div className="content" style={{ height: items.length * 45 }}>

  {myPseudoWin
  ? <p className="titulo">You WIN {myScores[myCurrentIndex]} points!</p>
  : <p className="titulo">Try to solve the puzzle! Available points: {myScores[myCurrentIndex]}</p> }
        {springs.map(({ zIndex, shadow, y, scale }, i) => (
          <animated.div
            {...bind(i)}
            key={i}
            style={{
              zIndex,
              boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
              transform: interpolate([y, scale], (y, s) => `translate3d(0,${y}px,0) scale(${s})`)
            }}
            children={items[i]}
          />
        ))}
      </div>
      {/* <button onClick={() => {
        console.log('listItems', listItems)
      }}>Check order</button> */}
      <div className="SortList__buttondiv">
      { !myPseudoWin 
      ? <button className="SortList__button" onClick={handleValidate}>VALIDATE</button>
      : <button className="SortList__button" onClick={handleStartAgain}>START AGAIN</button> }

      <button className="SortList__button" onClick={backToMain}>BACK</button>
      </div>
    </>
  )
}
export default SortList