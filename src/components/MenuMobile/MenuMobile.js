import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { selectIsAuthenticated } from "../../features/authenticateSlice";
import { useSelector } from "react-redux";
import './style.scss'


function MenuMobile() {
    const myIsAuthenticated = useSelector(selectIsAuthenticated)
    const [open, setOpen] = useState(false);
    let varCssA, varCssB
    {!open ? varCssA = "cRfcOb" : varCssA = "hvzne"}
    {open ? varCssB = "MenuMobile__container" : varCssB = "MenuMobile__container2"}

    function handleClick(){

        setOpen(!open)
        // document.getElementsByTagName("body").
        // document.getElementsByTagName("body")[0].classList.toggle("bodyfix");
    }
    return (
        <div className="MenuMobile escondido">
<button class={varCssA}
            onClick={()=>{ setOpen(!open)}}
            ><div></div><div></div><div></div></button>

            {myIsAuthenticated ?
            <div className={varCssB}>
            <div className="MenuMobile__link" onClick={handleClick}>
              <Link to="/courses">Courses</Link>
            </div>
            <div className="MenuMobile__link" onClick={handleClick}>
              <Link to="/user">My Area</Link>
            </div>
            </div>
            :
            <div className={varCssB}>
            <div className="MenuMobile__link" onClick={handleClick}>
              <Link to="/user">Login</Link>
            </div>
            </div>
}
            
        </div>
    )
}
export default MenuMobile