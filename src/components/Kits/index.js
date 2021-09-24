import React,{ useContext, useState } from "react";
import { AuthContext } from "../providers/auth";
import { useHistory } from "react-router";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {EncontrosData} from './EncontrosData.js';
import {Link} from "react-router-dom";
import "./encontros.css";


const Encontros = ({ username }) => {
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
      <div className="wrapper">
        <Link to="#" className='button-menu-bars'>
        <button onClick={showEncontros} className="buttonTogle">Criando meu canal de comunicação</button>
        </Link>
        </div>
       
      
      <nav className={encontros ? 'button-menu active' : 'button-menu'}>
          <ul className='button-menu-items' onClick={showEncontros}>
              
              
              {EncontrosData.map((item, index, click) =>{
                  return(
                      <li key={index} className={item.cName}>
                          <Link to={item.path}>
                           <img className="hexaImg" onClick={click} src="hexagon.png"/>
                           <span onClick={click} className={item.cName+'1'}>{item.dia}</span> 
                           <span onClick={click} className={item.cName+'2'} > {item.hour} </span>
                          </Link>
                      </li>
                  )
              })}
            
              
          </ul>
      </nav>
    </>
  );
};

export default Encontros;