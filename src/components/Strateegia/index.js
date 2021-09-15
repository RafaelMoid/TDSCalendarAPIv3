import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import {
  fetchUserData,fetchUserEncouters
  // fetchUserProjects,
} from "../../services/requestFunctions";
import Navbar from "../Navbar";

import "./styles.scss";

const Strateegia = () => {
  const [user, setUser] = useState({});
  const [kitData, setKitData] = useState("");
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

  useEffect(() => {
    fetchUserEncouters(auth.apiToken).then((data) => {
      setUser(data);
    });
    // fetchUserProjects(auth.apiToken).then((data) => {
    //   setProjects(data);
    // });
  }, [auth.apiToken]);

  const handleKitData = (data) => {
    setKitData(data);
  };

  return (
    <div>
      <Navbar username={user.name} />
      <div className="sections-wrapper">
        <section className="topics-section">
          <div className="section-steps">
            <p>Aqui estão todos os seus projetos na plataforma Strateegia. Selecione o projeto para agendar seus 
pontos de conversação em sua Google Agenda.</p>
          </div>
          <h1>Inserir aqui o grid</h1>

          

          <h1>E O BOTÃO PARA JOGAR OS OBJETOS SELECIONADOS DO GRID PARA O GOOGLE CALENDAR</h1>
        </section>
        
      </div>
    </div>
  );
};

export default Strateegia;
