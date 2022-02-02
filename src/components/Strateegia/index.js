import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import {
  fetchUserData, fetchProjectById, fetchUserEncouters,fetchMapById, fetchEncounterByMaps, fetchUserGetProjectById, fetchUserProjects,
} from "../../services/requestFunctions";
import { Select } from '@chakra-ui/react'
import Navbar from "../Navbar";
import Kits from "../Kits";
import Button from "../pontosDeEncontro";
import Wellcome from "../Wellcome";
import Navbar2 from "../Navbarv2";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Encontros from "../Kits";


import "./styles.scss";

const Strateegia = () => {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState('');
  //Aqui está a chamada do valor de id para a função seguinte
  const [idKitData, setIdKitData] = useState("");
  //Aqui estão os dados do mapa em si, é daqui que se resgata os kits (linha 51) \/
  const [kitData, setKitData] = useState("");
  //Retorno da linha 62 (aqui estão os pontos de encontro) \/
  const [mapsData, setMapsData] = useState("");
  const auth = useContext(AuthContext);

  

  useEffect(() => {
    fetchUserData(auth.apiToken).then((data) => {
      console.log(data);
      setUser(data);
    });
    fetchUserProjects(auth.apiToken).then((data) => {
      // data.map(proj => {
      //   console.log(proj.projects)
      //   setProjects(data)
      // })
      setProjects(data.map(proj => proj.projects));
    });
  }, [auth.apiToken]);

  useEffect(() => {
    fetchProjectById(auth.apiToken, projectId)
      .then(data => {
        getAllMaps(data);
        console.log(mapsData);
      });
    if (mapsData) mapsData.map( mapInfo => fetchMapById(auth.apiToken, mapInfo.id)
      .then(data => console.log(data)));
  }, [projectId])

  const getAllMaps = projectData => {
    setMapsData([]);
    if (projectId) projectData.maps.map( mapInfo => {
      setMapsData(mapsData => [...mapsData, mapInfo])}
      );
  };


  
  //Aqui estão os dados do mapa em si, é daqui que se resgata os kits (linha 51)
  // useEffect(() => {
  //   fetchMapById(auth.apiToken ).then((data) => {
  //     console.log(data);
  //     setKitData(data);
  //   });
  //   // fetchUserProjects(auth.apiToken).then((data) => {
  //   //   setProjects(data);
  //   // });
  // }, [auth.apiToken]);


  //Retorno da linha 62 (aqui estão os pontos de encontro)
  // useEffect(() => {
  //   fetchEncounterByMaps(auth.apiToken).then((data) => {
  //     console.log(data);
  //     setMapsData(data);
  //   });
  //   // fetchUserProjects(auth.apiToken).then((data) => {
  //   //   setProjects(data);
  //   // });
  // }, [auth.apiToken]);

  // useEffect(() => {
  //   console.log(projects)
  //   // projects.map((project) => console.log(project.length));
  //   projects.forEach((value) => value.map(project => console.log(project.title)));
  // }, [projects])

  

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
            <div className="projects">
              <Select placeholder="Projetos" onChange={(e) => setProjectId(e.target.value)}>
                {projects.map(value => value.map(pr => (
                  // <div key={pr.id} className='hexaProj'>
                  //   <div className="kitHexagon">
                  //     <img className="hexaImg" alt="A Black Hexagon" src="hexagon.png"/>
                  //     <div className="textStyle" onClick={() => setProjectId(pr.id)}>
                  //       <span className='hexaProj'>{pr.title.slice(0, 19)}</span>
                  //     </div>
                  //   </div>
                  // </div>
                  <option onSelect={() => {
                    setProjectId(pr.id)
                    console.log(pr.id)
                  }} value={pr.id} key={pr.id}>{pr.title}</option>
                  
                )))}

              </Select>
            </div>
          </div>
          <img className="image1" src="datep.svg" />
           
              </div>
              <Encontros />
      </div>
            
    
        

    
  );
};

export default Strateegia;
