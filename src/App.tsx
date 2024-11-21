import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Favourites from "./pages/favourites/Favourites";
import Cart from "./pages/cart/Cart";
import Product from "./components/product/Product";
import Signup from "./pages/signup/Signup";

type ProductType = {
  id: number;
  name: string;
  brand: string;
  description: string;
  api_featured_image: string;
  price: string;
};

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [newArrivals, setNewNewArrivals] = useState<ProductType[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<ProductType[]>(
    []
  );
  const [favoriteProducts, setFavouriteProducts] = useState<ProductType[]>([]);
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://makeup-api.herokuapp.com/api/v1/products.json"
        );
        const data: Product[] = await response.json();
        if (data) {
          setProducts(data);
          console.log(data);
        } else {
          alert("Something went wrong while fetching products!");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const newProduct = products.slice(0, 10);
    setNewNewArrivals(newProduct);
    const bestSellProducts = products.slice(20, 30);
    setBestSellingProducts(bestSellProducts);
  }, [products]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              newArrivals={newArrivals}
              bestSellingProducts={bestSellingProducts}
              favouriteProducts={favoriteProducts}
              setFavouriteProducts={setFavouriteProducts}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              username={username}
              setUsername={setUsername}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              products={products}
              favouriteProducts={favoriteProducts}
              setFavouriteProducts={setFavouriteProducts}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              username={username}
              setUsername={setUsername}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              products={products}
              favouriteProducts={favoriteProducts}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              username={username}
              setUsername={setUsername}
            />
          }
        />
        <Route
          path="/products"
          element={
            <Products
              products={products}
              favouriteProducts={favoriteProducts}
              cartProducts={cartProducts}
              setFavouriteProducts={setFavouriteProducts}
              setCartProducts={setCartProducts}
              username={username}
              setUsername={setUsername}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <Product
              products={products}
              setFavouriteProducts={setFavouriteProducts}
              setCartProducts={setCartProducts}
              favouriteProducts={favoriteProducts}
              cartProducts={cartProducts}
              username={username}
              setUsername={setUsername}
            />
          }
        />
        <Route path="/signup" element={<Signup setUsername={setUsername}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
