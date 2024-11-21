import Navbar from "../../components/navbar/Navbar";
import "./products.css";
import Display_Product from "../../components/display_product/Display_Product";
import Menu from "../../components/menu/Menu";
import Logo from "../../components/logo/Logo";
import Search from "../../components/search/Search";
import Footer from "../../components/footer/Footer";
import { useState } from "react";

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
  favouriteProducts: Product[];
  setFavouriteProducts: (products: Product[]) => void;
  cartProducts: Product[];
  setCartProducts: (products: Product[]) => void;
  username: string;
  setUsername: (username: string) => void;
};

function Products({
  products,
  favouriteProducts,
  cartProducts,
  setFavouriteProducts,
  setCartProducts,
  username,
  setUsername,
}: ProductsProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [sortedProductsArr, setSortedProductsArr] = useState<Product[]>([]);

  function handleSort() {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setSortedProductsArr(sortedProducts);
  }

  const toggleSortOrder = () => {
    handleSort();
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="productsPage_container">
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
      {products.length > 0 ? (
        <div>
          <button onClick={toggleSortOrder} className="sortButton">
            Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </button>
          {sortedProductsArr.length > 0 ? (
            <Display_Product
              productsToDisplay={sortedProductsArr}
              favouriteProducts={favouriteProducts}
              setFavouriteProducts={setFavouriteProducts}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          ) : (
            <Display_Product
              productsToDisplay={products}
              favouriteProducts={favouriteProducts}
              setFavouriteProducts={setFavouriteProducts}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Footer />
    </div>
  );
}

export default Products;
