/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import clamp from 'lodash-es/clamp';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import {
  // selectors.
  selectIsStarted,
  selectGameNumber,
  selectUserPoints,
  selectFailSphere,
  // Actions
  startAndStop,
  isFinishGames,
  pushGames,
  selectGames,
  substractPoints,
  winGame,
  completAllGames,
  selectFinishGames
} from '../../features/JsGameSlice';

import { totalScoresJsGames, selectJsgamesDone } from '../../features/dashboardSlice';
import { selectUserIdentifier } from "../../features/authenticateSlice";

import './JsGame.scss';

const BASE_URL = "https://codiant.herokuapp.com/api"
//  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000/api';

export function JsGame() {
  const dispatch = useDispatch();

  const games = useSelector(selectGames);
  const gameNumber = useSelector(selectGameNumber);
  const userPoints = useSelector(selectUserPoints);
  const isStarted = useSelector(selectIsStarted);
  const finishGames = useSelector(selectFinishGames);
  const myUserIdentifier = useSelector(selectUserIdentifier);
  const failSphere = useSelector(selectFailSphere);
  const jsgamesDone = useSelector(selectJsgamesDone);


  const currentGame = games[gameNumber];

  const [position, setPosition] = useState([0, 0]);

  const completedImg = 'https://res.cloudinary.com/dfxmz0ida/image/upload/v1595504156/samples/Codiant/completed-png-2-Transparent-Images_gnjnj7.png';

  useEffect(() => {
    fetch(BASE_URL + '/javascript/all', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(pushGames(data.data));
      });
  }, []);

 

  useEffect(() => {
    const jsGame = document.querySelector('.JsGame');
    if (jsGame) {
      const board = jsGame.getBoundingClientRect();
      const ballSize = 120;
      const [x, y] = position;

      const isLeft = x < -0.5 * board.width + ballSize;
      const isRight = x > 0.5 * board.width - ballSize;
      const isUp = y < -0.5 * board.height + ballSize;
      const isDown = y > 0.5 * board.height - ballSize;


      if (isLeft && isUp) {
        if (currentGame.solution === 'a') {
          dispatch(winGame());

          if (gameNumber === 2) {
            dispatch(totalScoresJsGames(userPoints));
            dispatch(completAllGames());
          }
        } else {
          dispatch(substractPoints());
        }
      } else if (isRight && isUp) {
        if (currentGame.solution === 'b') {
          dispatch(winGame());

          if (gameNumber === 2) {
            dispatch(totalScoresJsGames(userPoints));
            dispatch(completAllGames());
          }
        } else {
          dispatch(substractPoints());
        }
      } else if (isLeft && isDown) {
        if (currentGame.solution === 'c') {
          dispatch(winGame());

          if (gameNumber === 2) {
            dispatch(totalScoresJsGames(userPoints));
            dispatch(completAllGames());
          }
        } else {
          dispatch(substractPoints());
        }
      } else if (isRight && isDown) {
        if (currentGame.solution === 'd') {
          dispatch(winGame());

          if (gameNumber === 2) {
            dispatch(totalScoresJsGames(userPoints));
            dispatch(completAllGames());

          }
        } else {
          dispatch(substractPoints());
        }
      }
    }
  }, [position]);

  async function pushScore() {
    console.log('userpoints ! 111', userPoints)
    if(true) {
      const settings = {
        method: "PUT",
        body: JSON.stringify({
          value: userPoints
        }), 
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        //const baseUrl = "http://localhost:4000";
        const baseUrl = "https://codiant.herokuapp.com";

        const url = baseUrl + '/api/dashboard/jsgamesvalidate/'+ myUserIdentifier
        const fetchResponse = await fetch(url, settings);
        const data = await fetchResponse.json();

        dispatch(totalScoresJsGames(userPoints));


        if (!fetchResponse.ok) throw new Error(data.message)
        
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  useEffect(() => {pushScore()}, [userPoints])

  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
  const bind = useGesture(({ down, delta, velocity }) => {
    if (!down) {
      setPosition(delta);
    }
    velocity = clamp(velocity, 1, 8);
    set({
      xy: down ? delta : [0, 0],
      config: { mass: velocity, tension: 500 * velocity, friction: 50 },
    });
  });
  return (
    <div className="superBox">
      <div className="JsGame__description">
        <button
          onClick={() => dispatch(startAndStop())}
          className="JsGame__playStop"
        >
          {!isStarted ? 'START' : 'STOP'}
        </button>
        {!isStarted ? (
          <img
            src={currentGame ? currentGame.image : ''}
            alt="exercise JS"
            className="JsGame__img"
          ></img>
        ) : (
          <div className="JsGame">
            <div className="JsGame__aux">
              <animated.div
                {...bind()}
                style={{
                  transform: xy.interpolate(
                    (x, y) => `translate3d(${x}px,${y}px,0)`
                  ),
                }}
              />
            </div>
            <div className="JsGame__A">A</div>
            <div className="JsGame__B">B</div>
            <div className="JsGame__C">C</div>
            <div className="JsGame__D">D</div>
          </div>
        )}
        {finishGames || jsgamesDone ?  (
          <div>
            <img src={ completedImg } alt="" srcset="" className="superBox__finisher"/>
          </div>
          ) : null}

        {failSphere ? ( 
          <div className="superBox__failSphere">
            ERROR! inténtalo de nuevo
          </div>
         ): null}

      </div>
    </div>
  );
}
