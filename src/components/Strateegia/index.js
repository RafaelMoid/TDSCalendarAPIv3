import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import { fetchUserData } from "../../services/requestFunctions";
import ConversationPoints from "../conversationPoints/index";
import Welcome from "../Welcome";
import Navbar from "../Navbar";
import { GoogleLogin } from "react-google-login";


import "./styles.scss";

const Strateegia = () => {
  const [user, setUser] = useState({});
  const auth = useContext(AuthContext);


  useEffect(() => {
    fetchUserData(auth.apiToken).then((data) => {
      setUser(data);
    });
  
  }, [auth.apiToken]);



  return (
    
    <div className="Wrapper">
      <div className="WrapperNav">
          <Navbar />
      </div>
      
      <main>
          <div className="firstLine">
            <Welcome username={user.name}/>
            <p className="texto">Selecione um projeto para adicionar seus pontos de conversação em sua Google Agenda.</p>
            <ConversationPoints placeHolder={'Projeto 1'}/>
            <ConversationPoints placeHolder={'Projeto 2'}/>
            <ConversationPoints placeHolder={'Projeto 3'}/>
            <ConversationPoints placeHolder={'Projeto 4'}/>
            <ConversationPoints placeHolder={'Projeto 5'}/>
          </div>
      </main>
        
    </div>
  
  );
};

export default Strateegia;
