import React from 'react'

import { Redirect } from 'react-router'
import { useSelector} from "react-redux";
import { Link } from "react-router-dom";

import { selectIsAuthenticated } from "../../features/authenticateSlice";

import './style.scss'

const html = "https://res.cloudinary.com/uyscuty/image/upload/v1594845519/002_ts7ifk.png"
const java = "https://res.cloudinary.com/uyscuty/image/upload/v1594845519/003_dwurrn.png"
const pseudo = "https://res.cloudinary.com/uyscuty/image/upload/v1594845539/001_mvllwl.png"

function Course() {
    const myIsAuthenticated = useSelector(selectIsAuthenticated);
    if (!myIsAuthenticated) {
        return <Redirect to='/'/>;
      }
 
    return (
        <div className="Course">
            <h1 className="Course__h1">Let's Start a Game!</h1>
            <div className="Course__all">
            <div className="Course__container grow">
            <img className="Course__image" src={pseudo} alt="PseudoCode"/>
            <Link to="/pseudocode">Pseudocode</Link></div>
            <div className="Course__container grow">
            <img className="Course__image" src={html} alt="html"/>
            <Link to="/html">Html</Link></div>
            <div className="Course__container grow">
            <img className="Course__image" src={java} alt="java"/>
            <Link to="/javascript">Javascript</Link></div>
            </div>
        </div>
    )
}

export default Course