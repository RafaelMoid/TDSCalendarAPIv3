import "./styles.css";



const Kits = ({ nomeMapa , dataEncontro, mapData}) => {
    

  
    return (
      
        <div className="mapa">
            <h3 className="hexagonTitle">{nomeMapa}</h3>
            <div className="hexagonWrapper">
            <ul className="hexagonWrapper">
              <li className="textHexagon">
                <img className="hexagon" src="hexagon.png"/>
                  <p>19:00</p>
                  <p>31/11/2021</p>
              </li>
              <li className="textHexagon">
                <img className="hexagon" src="hexagon.png"/>
                  <p>19:00</p>
                  <p>12/11/2021</p>
              </li>
              <li className="textHexagon">
                <img className="hexagon" src="hexagon.png"/>
                  <p>17:00</p>
                  <p>25/12/2021</p>
              </li>
              <li className="textHexagon">
                <img className="hexagon" src="hexagon.png"/>
                  <p>20:00</p>
                  <p>30/12/2021</p>
              </li>
            </ul>
            </div>
            </div>        
        
      
    );
  };
  
  export default Kits; 