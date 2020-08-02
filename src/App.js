import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router'
import { JsGame } from './components/JsGame';

import SwipeBothSide from './components/SwipeBothSide'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Footer from './components/Footer'
import Authenticate from './components/Authenticate'
import Course from './components/Course'
import Organizer from './components/Organizer'
import SortList from './components/SortList'
import MenuMobile from './components/MenuMobile'

import {
  selectIsAuthenticated,
  selectIsLoading,
  checkmysession,

} from "./features/authenticateSlice";


import './App.css';

function App() {
 const dispatch = useDispatch()
 const myIsLoading = useSelector(selectIsLoading);
 

  useEffect(() => {
    dispatch(checkmysession());
  }, []);

// if(myIsLoading){
//   return <h1>Is loading...</h1>
// }


  return (
    <div className="App">
      <Router>
      <Navbar/>
      {/* <MenuMobile/> */}
        <Switch>
          <React.Fragment>
          
          <Route exact path="/user" render={() => <Authenticate />} />  
          <Route exact path="/courses" render={() => <Course />} />   
          <Route exact path="/pseudocode" render={() => <Organizer organizer="pseudocode"/>} />   
          <Route exact path="/pseudocode/sortlist" render={() => <SortList/>} /> 
          <Route exact path="/html/sbs" render={()=> <SwipeBothSide />}  />
          <Route path="/html" exact render={() => <Organizer organizer="html"/>} />
          <Route exact path="/javascript" render={() => <JsGame />} />
          <Route exact path="/" render={() => <Homepage />} />
          </React.Fragment>
        </Switch>
        <Footer/>
      </Router>

    </div>
  );
}

export default App;
