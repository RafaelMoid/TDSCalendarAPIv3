const Kits = ({ nomeMapa , nomeEncontro}) => {


  
    return (
      
        <div className="mapaKits">
          <div className="mapa">
            <h3>{nomeMapa}</h3>
            
            <button >{nomeEncontro}</button>
          </div>
        </div>
      
    );
  };
  
  export default Kits; 