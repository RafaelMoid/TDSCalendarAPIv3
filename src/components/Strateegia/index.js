import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import {
  fetchUserData,fetchUserEncouters,fetchMapById, fetchEncounterByMaps, fetchUserGetProjectById
  // fetchUserProjects,
} from "../../services/requestFunctions";
import Navbar from "../Navbar";
import Kits from "../Kits";
import Button from "../pontosDeEncontro";

import "./styles.scss";

const Strateegia = () => {
  const [user, setUser] = useState({});
  //Aqui está a chamada do valor de id para a função seguinte
  const [idKitData, setIdKitData] = useState("");
  //Aqui estão os dados do mapa em si, é daqui que se resgata os kits (linha 51) \/
  const [kitData, setKitData] = useState("");
  //Retorno da linha 62 (aqui estão os pontos de encontro) \/
  const [MapsData, setMapsData] = useState("");
  // const [projects, setProjects] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchUserData(auth.apiToken).then((data) => {
      setUser(data);
    });
    // fetchUserProjects(auth.apiToken).then((data) => {
    //   setProjects(data);
    // });
  }, [auth.apiToken]);


  //Aqui estão os dados do mapa em si, é daqui que se resgata os kits (linha 51)
  useEffect(() => {
    fetchMapById(auth.apiToken).then((data) => {
      console.log(data);
      setKitData(data);
    });
    // fetchUserProjects(auth.apiToken).then((data) => {
    //   setProjects(data);
    // });
  }, [auth.apiToken]);


  //Retorno da linha 62 (aqui estão os pontos de encontro)
  useEffect(() => {
    fetchEncounterByMaps(auth.apiToken).then((data) => {
      console.log(data);
      setMapsData(data);
    });
    // fetchUserProjects(auth.apiToken).then((data) => {
    //   setProjects(data);
    // });
  }, [auth.apiToken]);


  

  /*<img className="bgImage" src="Calendar_SVG 1.svg"/>  Imagem para adicionar na tela de logado*/

  return (
    
    <div className="Wrapper">
      <Navbar username={user.name} />
      <img className="image1" src="Calendar_SVG 1.svg" />
            <div className="pontosDeEncontroTemplate">
                <Kits nomeMapa={kitData?.title} dataEncontro={MapsData?.id} mapData={MapsData?.points}/>
                
            </div>
    
      <footer className="footer">
      Criadores: <a href="https://www.linkedin.com/in/rafaelvarelati/" target="_blank">Rafael Varela (Desenvolvedor fullstack)</a>, <a href="https://www.linkedin.com/in/diego-santos-ab17011b8/" target="_blank">Diego Santos (Ui/Ux Designer)</a> e <a href="https://www.linkedin.com/in/caroules/" target="_blank">Carolina Aguiar (Designer)</a>
      </footer>    

    </div>
  );
};

export default Strateegia;
