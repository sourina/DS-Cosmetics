import { useNavigate } from "react-router-dom";
import HomeButton from "../../assets/home-button.png";
import FavouritesButton from "../../assets/star.png";
import CartButton from "../../assets/shopping-trolley.png";
import "./navbar.css";
import Login from "../login/Login";

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  api_featured_image: string;
  price: string;
};

type ProductsProps = {
  cartProducts: Product[];
  favouriteProducts:Product[];
  username:string;
  setUsername: (username: string) => void;
};

function Navbar({cartProducts,favouriteProducts,username,setUsername}:ProductsProps ){
 
  
  const navigate = useNavigate();
  const noOfProductsInCart=cartProducts.length;
  const noOfProductsInFav=favouriteProducts.length;

  function handleHome(event: React.FormEvent) {
    event.preventDefault();
    navigate("/");
  }

  function handleFavourite(event: React.FormEvent) {
    event.preventDefault();
    navigate("/favourites");
  }

  function handleCart(event: React.FormEvent) {
    event.preventDefault();
    navigate("/cart");
  }

  return (
    <div className="Nav_Container">
      <div>
        <img
          src={HomeButton}
          alt="Home"
          onClick={handleHome}
          className="home_btn"
        />
      </div>
      <img
        src={FavouritesButton}
        alt="Favourite"
        onClick={handleFavourite}
        className="fav_btn"
      />
       {noOfProductsInFav > 0 && <div className="num_product_fav">{noOfProductsInFav}</div>}
      <img
        src={CartButton}
        alt="Cart"
        onClick={handleCart}
        className="cart_btn"
      />
      {noOfProductsInCart > 0 && <div className="num_product_cart">{noOfProductsInCart}</div>}
     
      <Login username={username} setUsername={setUsername}/>
    </div>
  );
}

export default Navbar;
