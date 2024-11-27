import Navbar from "../../components/navbar/Navbar";
import Search from "../../components/search/Search";
import "./home.css";
import Image_Header from "../../assets/first-screen (1).png";

import { useEffect, useState } from "react";
import Display_Product from "../../components/display_product/Display_Product";
import Footer from "../../components/footer/Footer";
import Logo from "../../components/logo/Logo";
import Menu from "../../components/menu/Menu";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  api_featured_image: string;
  price: string;
};

type ProductsProps = {
  products: Product[];
  newArrivals: Product[];
  bestSellingProducts: Product[];
  favouriteProducts: Product[];
  setFavouriteProducts: (products: Product[]) => void;
  cartProducts: Product[];
  setCartProducts: (products: Product[]) => void;
  username: string;
  setUsername: (username: string) => void;
};

function Home({
  products,
  newArrivals,
  bestSellingProducts,
  favouriteProducts,
  setFavouriteProducts,
  cartProducts,
  setCartProducts,
  username,
  setUsername,
}: ProductsProps) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [newArrivalsToDisplay, setNewNewArrivalsToDisplay] = useState<
    Product[]
  >([]);

  const [BestSellingProductsToDisplay, setBestSellingProductsToDisplay] =
    useState<Product[]>([]);

  useEffect(() => {
    if (newArrivals.length && bestSellingProducts.length > 0) {
      setIsLoading(false); // Set loading to false once products are loaded
    }
  }, [newArrivals, bestSellingProducts]);

  useEffect(() => {
    const newArrivalProducts = newArrivals.slice(0, 4);
    setNewNewArrivalsToDisplay(newArrivalProducts);
    const bestSellProducts = bestSellingProducts.slice(0, 4);
    setBestSellingProductsToDisplay(bestSellProducts);
  }, [newArrivals, bestSellingProducts]);

  function handleShop() {
    navigate("/products");
  }

  function handleSeeMore(){
    navigate("/products")
  }

  return (
    <div className="home_container">
      <div className="nav">
        <Menu />
        <Logo />
        <Search products={products} />
        <Navbar
          favouriteProducts={favouriteProducts}
          cartProducts={cartProducts}
          username={username}
          setUsername={setUsername}
        />
      </div>
      <div className="header_container">
        <img src={Image_Header} alt="image" className="header_img" />
        <div className="header_desc">
          <p className="header">
            DISCOVER YOUR INNER <br></br>BEAUTY WITH <br></br>BLOSSOM GLOW KIT
          </p>
          <p className="sub_header">
            Great gift for yourself and your loved ones{" "}
          </p>
          <button className="shop_btn" onClick={handleShop}>
            Shop Now
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="allProducts_container">
          <div className="new_arrivals">
            <h4>New Arrivals</h4>
            <p className="more_opt_btn" onClick={handleSeeMore}>See More</p>
            <Display_Product
              productsToDisplay={newArrivalsToDisplay}
              favouriteProducts={favouriteProducts}
              setFavouriteProducts={setFavouriteProducts}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          </div>
          <div className="best_sellers">
            <h4>Best Sellers</h4>
            <p className="more_opt_btn_sell" onClick={handleSeeMore}>See More</p>
            <Display_Product
              productsToDisplay={BestSellingProductsToDisplay}
              favouriteProducts={favouriteProducts}
              setFavouriteProducts={setFavouriteProducts}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
