import { useContext } from "react";
import { AuthContext } from "../providers/auth";
import { useHistory } from "react-router";
import "./styles.scss";


const Welcome = ({ username }) => {
  const auth = useContext(AuthContext);
  const history = useHistory();


  return (
    <>
      <div className="welcome">
          <h3 className="ola">Olá, <strong>{username}</strong>!</h3>
          <hr className="linha"/>
        </div>
        
    </>
  );
};

export default Welcome;