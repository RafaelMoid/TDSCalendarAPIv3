import "./styles.css";



const Kits = ({ nomeMapa , dataEncontro, mapData}) => {
    

  
    return (
      
        <div className="mapa">
            <h3 className="hexagonTitle">{nomeMapa}</h3>
            <div className="hexagonWrapper">
            <ul className="hexagonWrapper">
              <li><img className="hexagon" src="hexagon.png"/></li>
              <li><img className="hexagon" src="hexagon.png"/></li>
              <li><img className="hexagon" src="hexagon.png"/></li>
              <li><img className="hexagon" src="hexagon.png"/></li>
            </ul>
            </div>
            </div>        
        
      
    );
  };
  
  export default Kits; 