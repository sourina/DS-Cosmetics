import Display_Product from "../../components/display_product/Display_Product";
import Footer from "../../components/footer/Footer";
import Logo from "../../components/logo/Logo";
import Menu from "../../components/menu/Menu";
import Navbar from "../../components/navbar/Navbar";
import Search from "../../components/search/Search";
import "./favourite.css";

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  api_featured_image: string;
  price: string;
};

type ProductsProps = {
  products:Product[]
  favouriteProducts: Product[];
  setFavouriteProducts: (products: Product[]) => void;
  cartProducts: Product[];
  setCartProducts: (products: Product[]) => void;
  username: string;
  setUsername: (username: string) => void;
};

function Favourites({
  products,
  favouriteProducts,
  setFavouriteProducts,
  cartProducts,
  setCartProducts,username,setUsername
}: ProductsProps) {

  
  return (
    <div className="fav_container">
      <div className="nav">
        <Menu/>
        <Logo />
        <Search products={products}/>
        <Navbar favouriteProducts={favouriteProducts} cartProducts={cartProducts} username={username} setUsername={setUsername}/>
      </div>
      <div className="fav_products_container">
        {favouriteProducts.length > 0 ? (
          <Display_Product
            productsToDisplay={favouriteProducts}
            favouriteProducts={favouriteProducts}
            setFavouriteProducts={setFavouriteProducts}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        ) : (
          <p className="empty_msg">
            Hey !!! Looks like you have nothing added..
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Favourites;
