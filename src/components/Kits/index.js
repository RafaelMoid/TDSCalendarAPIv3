import React,{ useContext, useState } from "react";
import { AuthContext } from "../providers/auth";
import { useHistory } from "react-router";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {EncontrosData} from './EncontrosData.js';
import {Link} from "react-router-dom";
import "./style.css";
import {IconContext} from 'react-icons';


const Navbar2 = ({ username }) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [encontros,setEncontros] = useState(false);

  const showEncontros = () => setEncontros(!encontros);

  const handleLogout = () => {
    auth.setApiToken("");
    auth.setIsAuthenticated(!auth.isAuthenticated);
    history.push("/login");
  };

  return (
    <>
    <IconContext.Provider value={{color:'white'}}>
      <div className="navbar">
        <Link to="#" className='menu-bars'>
            <FaIcons.FaBars onClick={showEncontros}/>
        </Link>
        </div>
       
      
      <nav className={encontros ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showEncontros}>
              <li className="navbar-toogle">
                  <Link to="#" className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                  </Link>
              </li>
              
              {EncontrosData.map((item, index, click) =>{
                  return(
                      <li key={index} className={item.cName}>
                          <Link to={item.path}>
                           <img src="hexagon.svg"/>
                           <span onClick={click} >{item.date + <br/> + item.startTime}</span> 
                          </Link>
                      </li>
                  )
              })}
            
              
          </ul>
      </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar2;