import "./styles.css";



const Kits = ({ nomeMapa , dataEncontro}) => {
    

  
    return (
      
        <div className="mapaKits">
          <div className="mapa">
            <h3>{nomeMapa}</h3>
            <div className="PontoDeEncontro">
            <button className="PontoDeEncontroBtn" >{dataEncontro}</button>
            </div>
          </div>
        </div>
      
    );
  };
  
  export default Kits; 