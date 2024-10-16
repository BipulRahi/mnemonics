import React from 'react'

import eth from "../assets/eth.svg"
import sola from "../assets/sol.svg"
import lion from "../assets/lion2.png"
import ToggleTheme from '@/components/Theme_provider'
import "../components/com/The.css"
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate()
    const  location=useLocation().pathname;
  
  return (
    <div className="w-full z-20 fixed top-0 left-0 right-0   mb-4 justify-between">
        <button onClick={() => navigate("/")}>
          <img
            src={location =='/'  ? lion : location == '/solana' ? sola : eth}
            className={`${location == "/" ? " h-20 w-20" : "h-12 w-12"} absolute  top-2 left-3 z-20`}
          ></img>
        </button>
        <ToggleTheme />
      </div>
  )
}

export default Navbar