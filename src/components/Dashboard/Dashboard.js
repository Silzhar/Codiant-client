import React from 'react'

import { useSelector } from "react-redux";

import './style.scss'

import {
    selectMyDashboard,
    selectTotalScores, selectPseudoDone, selectJsgamesDone, selectSbsDone
    } from "../../features/dashboardSlice";

function Dashboard() {
  const myMyDashboard = useSelector(selectMyDashboard)
  const myTotalScores = useSelector(selectTotalScores)
  const myPseudoDone = useSelector(selectPseudoDone)
  const jsgamesDone = useSelector(selectJsgamesDone)
  const mySbsDone = useSelector(selectSbsDone)



    return (
        <div className="Dashboard">
          <p className="Dashboard__title"><span>🔵</span> : SOLVED | <span>🔴</span> : NOT SOLVED</p>
            <h2 className="Dashboard__h2">Total Scores: {myTotalScores}</h2>
          <p className="Dashboard__title">Pseudocode Game SOLVED</p>
          <p className="Dashboard__p" >{!myPseudoDone[0] ? <span>🔴</span>:<span>🔵</span>} Selection Sort</p>
          <p className="Dashboard__p">{!myPseudoDone[1] ? <span>🔴</span>:<span>🔵</span>} Insertion Sort</p>
          <p className="Dashboard__p">{!myPseudoDone[2] ? <span>🔴</span>:<span>🔵</span>} Bubble Sort</p>

          <p className="Dashboard__title">HTML Game SOLVED</p>
          <p className="Dashboard__p" >{!mySbsDone[0] ? <span>🔴</span>:<span>🔵</span>} Inline Elelment or not?</p>
          <p className="Dashboard__p">{!mySbsDone[1] ? <span>🔴</span>:<span>🔵</span>} Inline Elelment or not 2?</p>

          <p className="Dashboard__jsgame">{!jsgamesDone ? <span>🔴</span>:<span>🔵</span>} Exercises Javascript completed</p>


        </div>
    )
}

export default Dashboard