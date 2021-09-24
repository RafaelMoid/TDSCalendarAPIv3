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

  //Google Calendar variables
  var gapi = window.gapi;
  var CLIENT_ID = "207024536115-rks4d3inm4brold6q3gba4feqf8jfjfe.apps.googleusercontent.com";
  var API_KEY = "AIzaSyBRbKpQQ0fFyvy1iuLVOP29mCchyq4r6dg";
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  const calendarEvent = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client');

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('Bam!'))

      gapi.auth2.getAuthInstance().signIn();
    })
  }

  const showEncontros = () => setEncontros(!encontros);
  if ( showEncontros == false) {
    const btnIcon = "FaChevronRight";
  } else {
    const btnIcon = "FaChevronDown";
  };


  const handleLogout = () => {
    auth.setApiToken("");
    auth.setIsAuthenticated(!auth.isAuthenticated);
    history.push("/login");
  };

  return (
    <>
      <div className="wrapper">
        <Link to="#" className='button-menu-bars'>
        <button onClick={showEncontros} className={encontros? 'buttonTogle active' : 'buttonTogle'}>Criando meu canal de comunicação</button>
        </Link>
        </div>
       
      
      <nav className={encontros ? 'button-menu active' : 'button-menu'}>
          <ul className='button-menu-items' onClick={showEncontros}>
              
              
              {EncontrosData.map((item, index) =>{
                  return(
                      <li key={index} className={item.cName}>
                          <div className="kitHexagon">
                           <img className="hexaImg" onClick={calendarEvent} src="hexagon.png"/>
                           <span onClick={calendarEvent} className={item.cName+'1'}>{item.dia}</span> 
                           <span onClick={calendarEvent} className={item.cName+'2'} > {item.hour} </span>
                          </div>
                      </li>
                  )
              })}
            
              
          </ul>
      </nav>
    </>
  );
};

export default Encontros;