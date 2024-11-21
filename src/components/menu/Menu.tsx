import { useState } from "react";
import MenuImg from "../../assets/9042808_menu_icon.png";
import "./menu.css";
import { useNavigate } from "react-router-dom";

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleMenu() {
    setIsMenuOpen((prevState) => {
      return !prevState;
    });
  }

  function handleAbout(){

  }

  function handleProducts(){
navigate("/products")
  }


  return (
    <div className="menu-container">
      <img
        src={MenuImg}
        alt="menu"
        className="menu-icon"
        onClick={handleMenu}
      />
      {isMenuOpen && (
        <div className="menu-content">
          <ul>
            <li onClick={handleAbout}>About</li>
            <li onClick={handleProducts}>Products</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Menu;
