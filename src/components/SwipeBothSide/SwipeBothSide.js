import React, { useState , useEffect} from 'react'
import { useSprings, animated, interpolate } from 'react-spring'
import { useSelector, useDispatch} from "react-redux";
import { useGesture } from 'react-with-gesture'
import { Redirect } from 'react-router'
import './style.scss'

import {addSbsScores, selectSbsScores, setSbsDone, selectSbsDone,
  //thunks
  doPutSbsDashboard
} from "../../features/dashboardSlice"

import { 
  setSbsPuzzle,selectSbsPuzzle,
  setSbsIndex, selectSbsIndex,
  setSbsIsStarting, selectSbsIsStarting,
  setWinner,selectWinner,
  setBackToMain, selectBackToMain
} from "../../features/sbsSlice";

import { 
  setUserIdentifier,
  selectUserIdentifier,
  setIsAuthenticated


} from "../../features/authenticateSlice";


// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective() rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`
const baseUrl = "http://localhost:4000";
function SwipeBothSide() {
  const dispatch = useDispatch()

  const mySbsPuzzle = useSelector(selectSbsPuzzle)
  const mySbsIndex = useSelector(selectSbsIndex)
  const mySbsDone = useSelector(selectSbsDone)
  const mySbsIsStarting = useSelector(selectSbsIsStarting)
  const myback = useSelector(selectBackToMain)
  const myUserIdentifier = useSelector(selectUserIdentifier)
  const myWinner = useSelector(selectWinner)

  const cards = mySbsPuzzle[mySbsIndex].puzzle
  const solution = mySbsPuzzle[mySbsIndex].solution

  const myIndexD = mySbsIndex;
  const mySbsScores = useSelector(selectSbsScores)
  const [scores, setScores] = useState(0)
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, set] = useSprings(cards.length, i => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  
  //myWinner
  useEffect(() => {
    if(myWinner && !mySbsDone[myIndexD]){
      // dispatch();
      sendScoresToDashboard()
    }
    
  }, [myWinner]);
  
  const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right

// If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    

    if (!down && trigger) {
      gone.add(index) 
      checkWin(index, dir)
    }
    set(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })
    // if (!down && gone.size === cards.length) //
    // {
    //   console.log("sendScoresToDashboard")
    // const body = {
    //   index: myIndexD,
    //   value: mySbsScores[myIndexD]
    // }
    // console.log("mybody", body)
    // console.log("mySbsScores", mySbsScores)
    // dispatch(doPutSbsDashboard(myUserIdentifier, body))
    // dispatch(setSbsDone(body))
    // }
  })


  function sendScoresToDashboard(){

      console.log("sendScoresToDashboard")
    const body = {
      index: myIndexD,
      value: mySbsScores[myIndexD]
    }
    console.log("mybody", body)
    console.log("mySbsScores", mySbsScores)
    dispatch(doPutSbsDashboard(myUserIdentifier, body))
    dispatch(setSbsDone(body))
    dispatch(setWinner(false))


    // const settings = {
    //   method: "PUT",
    //   body: JSON.stringify({
    //     index: mySbsIndex,
    //     value: mySbsScores[mySbsIndex]
    //   }), 
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };


    // try {
      
    //   const url = baseUrl + '/api/dashboard/sbsvalidate/'+ myUserIdentifier
    //   console.log("url put -->",url)
    //   const fetchResponse = await fetch(url, settings);
    //   const data = await fetchResponse.json();

    //   if (!fetchResponse.ok) throw new Error(data.message)
    //   dispatch(setSbsDone(mySbsIndex))
    //   console.log("sbsvalidate--->",data)
    //   // dispatch(setPseudoWin(true))
    //   //return

      
    // } catch (error) {
    //   console.log(error.message);
    // }







  }


  // function addValues(){
  //   dispatch(addSbsScores({index: myIndexD, value: 20}))
  //   console.log("99999myIndexD mysbsscores", mySbsScores)
  // }

  function back2main(){
    console.log("aquiestoy ::::", mySbsIsStarting)
    dispatch(setBackToMain(true))
    dispatch(setSbsIsStarting(false))
    console.log("aquiestoy ::::", mySbsIsStarting)
   }


 function checkWin(index, dir){

  


  if( 
    (dir > 0  && solution[index] === true) ||
    (dir < 0  && solution[index] === false )
  ){ 
        
    console.log("correcto")
    dispatch(addSbsScores({index: myIndexD, value: 20}))
    console.log("99999myIndexD mysbsscores", mySbsScores)
   

  

}
else {
    console.log("Equivocado")  
  }
  
  
  if( gone.size === cards.length ) {
    console.log("terminado")
    dispatch(setWinner(true))
  }
 }


 if(myback){
   console.log("mySbsIsStarting")
  return <Redirect to='/html'/>
}


  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <React.Fragment>
  <div className="SwipeBothSide">
  {/* <div><p className="button" onClick={back2main} >BACK TO MAIN</p></div> */}
  {props.map(({ x, y, rot, scale }, i) => (
    <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
      {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
      <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${cards[i]})` }} />
    </animated.div>
  ))}
  {/* <div className="squared"><span className="squared__title">TRUE</span></div>
  <div className="squared1"><span className="squared__title">FALSE</span></div> */}
  </div>
  <div className="scorediv">
  {
    !mySbsDone[myIndexD] 
    ? <p className="scorediv__subtitle" >TOTAL SCORES: { mySbsScores[myIndexD] }</p>
    : <div><p className="scorediv__subtitle" >COMPLETED  </p>
    <p className="button" onClick={back2main} >BACK TO MAIN</p>
    </div>

  }
        {/* <p className="scorediv__subtitle" >¿TRUE or FALSE? You can win 20 points =) </p> */}
  </div>
  </React.Fragment> )
}


export default SwipeBothSide
