import React from 'react'
import { Link } from 'react-router-dom';
import './style.scss'


const myH1 = "Start Your Coding Journey"
const mySubtitle = "There's'nothing better than a quality game to improve your coding skills"

function Homepage() {
    return (
        <div className="Homepage">
            <h1 className="Homepage__h1">{myH1}</h1>
    <p className="Homepage__subtitle">{mySubtitle}</p>
            <div className="Homepage__link"><Link to="/user">START FOR FREE</Link></div>
        </div>
    )
}

export default Homepage
