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
  const [mapsData, setMapsData] = useState("");
  const [conversationPoints, setConversationPoints] = useState([]);
  const auth = useContext(AuthContext);

  

  useEffect(() => {
    fetchUserData(auth.apiToken).then((data) => {
      console.log(data);
      setUser(data);
    });
    fetchUserProjects(auth.apiToken).then((data) => {
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
      .then(data => setConversationPoints(checkPoints(data))));
      
  }, [projectId])

  const getAllMaps = projectData => {
    setMapsData([]);
    if (projectId) projectData.maps.map( mapInfo => {
      setMapsData(mapsData => [...mapsData, mapInfo])}
      );
  };

  const checkPoints = data => {
    var today = new Date();
    console.log(today)
    const points = [...data.points];
    const convPoints = points.filter(point => point.point_type === 'CONVERSATION')
      // .filter(point => point.opening_date === today);
    console.log(convPoints)
    return convPoints;
  }


  
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
                  <option onSelect={() => {
                    setProjectId(pr.id)
                    console.log(pr.id)
                  }} value={pr.id} key={pr.id}>{pr.title}</option>
                  
                )))}

              </Select>
              {conversationPoints ? conversationPoints.map(point => (
                <div key={point.id}>
                  <p>{point.description}</p>
                  <a href={point.meeting_place}>{point.meeting_place}</a>
                  <span>{point.opening_date}</span>
                </div>
              )) : ''}
            </div>
          </div>
          <img className="image1" src="datep.svg" />
           
              </div>
              <Encontros />
      </div>
            
    
        

    
  );
};

export default Strateegia;
