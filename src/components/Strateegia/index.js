import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import { fetchUserData } from "../../services/requestFunctions";
import ConversationPoints from "../conversationPoints/index";
import Wellcome from "../Wellcome";
import Navbar2 from "../Navbarv2";
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

  

  /*<img className="bgImage" src="Calendar_SVG 1.svg"/>  Imagem para adicionar na tela de logado*/

  return (
    
    <div className="Wrapper">
      <div className="WrapperNav">
          <Navbar2 />
      </div>
      
      <div className="introTxt">
          <div className="firstLine">
            <Wellcome username={user.name}/>
            <h3 className="textoo">Aqui estão todos os seus projetos na plataforma Strateegia. Selecione o projeto para agendar seus pontos de conversação em sua Google Agenda.</h3>
            <ConversationPoints/>
          </div>
          <img className="image1" src="datep.svg" />
           
      </div>
        
    </div>
  
  );
};

export default Strateegia;
