import React,{ useContext, useState } from "react";
import { AuthContext } from "../providers/auth";
import { useHistory } from "react-router";
import {Link} from "react-router-dom";
import { ReactComponent as WhiteLogo } from "../../assets/AllWhiteLogo.svg";
import { ReactComponent as Logout } from "../../assets/logoutIcon.svg";
import "./style.scss";


const Navbar2 = ({ username }) => {
  const auth = useContext(AuthContext);
  const history = useHistory();


  const handleLogout = () => {
    auth.setApiToken("");
    auth.setIsAuthenticated(!auth.isAuthenticated);
    history.push("/login");
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <WhiteLogo />
          <h1>strateegia.calendar</h1>
        </div>
        <div className="logout" onClick={handleLogout}>
          <span>sair</span>
          <Logout />
        </div>
      </div>
       
      
      
    </>
  );
};

export default Navbar2;