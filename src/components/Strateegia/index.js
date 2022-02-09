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
import { ReactComponent as HexPoint } from '../../assets/hexPoint.svg'


import "./styles.scss";

const Strateegia = () => {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [mapsData, setMapsData] = useState([]);
  const [conversationPoints, setConversationPoints] = useState([]);
  const [futurePoints, setFuturePoints] = useState([]);
  const auth = useContext(AuthContext);


  useEffect(() => {
    fetchUserData(auth.apiToken).then((data) => {
      setUser(data);
    });
    fetchUserProjects(auth.apiToken).then((data) => {
      setProjects(data.map(proj => proj.projects));
    });
  }, [auth.apiToken]);

  useEffect(() => {
    fetchProjectById(auth.apiToken, projectId)
      .then(data => {
        if (projectId) data.maps.map( mapInfo => {
          setMapsData([]);
          fetchMapById(auth.apiToken, mapInfo.id)
            .then( mapData => {
              setMapsData(mapsData => [...mapsData, mapData] );
            })
        })
      })
  }, [projectId]);

  useEffect(() => {
    if (mapsData.length > 0) {
      setConversationPoints([]);
      mapsData.forEach( singleMap => {
        const convPoints = singleMap.points.filter(point => point.point_type === 'CONVERSATION');
        const addSplitDate = convPoints.map( point => point = ({ splitDate: point.opening_date.split('T'), ...point}));
        setConversationPoints( conversationPoints => [...conversationPoints, addSplitDate] );
      });
    };
  }, [mapsData]);

  useEffect(() => {
    setFuturePoints([]);
    conversationPoints.forEach( singleGroup => {
      setFuturePoints(futurePoints => [...futurePoints, singleGroup.filter(isInTheFuture)]);
    });
  }, [conversationPoints]);

  const isInTheFuture = value => {
    const date = new Date();
    const today = date.toISOString().split('T')[0];
    const year = parseInt(value.splitDate[0].slice(0, 4));
    const month = parseInt(value.splitDate[0].slice(5, 7));
    const day = parseInt(value.splitDate[0].slice(8, 10));
    if (year >= parseInt(today.slice(0, 4)) && month > parseInt(today.slice(5, 7)) || (year >= parseInt(today.slice(0, 4)) && month === parseInt(today.slice(5, 7)) && day >= parseInt(today.slice(8, 10)))) return true;
  }  

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
              <ul className='button-menu-items'>

                {futurePoints ? futurePoints.map(arr => (
                  arr.map( point => (
                    
                    // <div key={point.id}>
                    //   <p>{point.description}</p>
                    //   <a href={point.meeting_place}>{point.meeting_place}</a>
                    //   <span>{point.opening_date}</span>
                    // </div>
                  <li key={point.id} className='hexa'>
                      <div className="kitHexagon">
                        {/* <img className="hexaImg" alt="A Black Hexagon" src="hexagon.png"/> */}
                        <HexPoint />
                        <div className="textStyle">
                          <span className='point-date'>{`${point.splitDate[0].slice(8, 10)}/${point.splitDate[0].slice(5, 7)}/${point.splitDate[0].slice(0, 4)}`}</span>
                          <span className='point-hour'> {point.splitDate[1].slice(0, 5)} </span>
                        </div>
                      </div>
                  </li>

                ))
                )) : ''}
              </ul>
            </div>
          </div>
          <img className="image1" src="datep.svg" />
           
              </div>
              {/* <Encontros /> */}
      </div>
            
    
        

    
  );
};

export default Strateegia;
