import { useNavigate } from "react-router-dom";
import "./logo.css";

function Logo() {
  const navigate = useNavigate();
  function handleNavigate(){
    navigate("/")
  }

 
  return <p className="logo" onClick={handleNavigate}>DS Cosmetics</p>;
}

export default Logo;
