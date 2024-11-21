import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../menu/Menu";
import Logo from "../logo/Logo";
import Search from "../search/Search";
import Navbar from "../navbar/Navbar";
import Star from "../../assets/star.png";
import FilledStar from "../../assets/1564507_checked_favorite_star_favourite_rating_icon.png";
import AddCart from "../../assets/858715_add_add to cart_cart_shopping cart_shopping cart icon_icon.png";
import AddedToCart from "../../assets/197223_meanicons_add_buy_store_check_icon.png";
import "./product.css";
import Footer from "../footer/Footer";

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
  setFavouriteProducts: (products: Product[]) => void;
  setCartProducts: (products: Product[]) => void;
  favouriteProducts: Product[];
  cartProducts: Product[];
  username: string;
  setUsername: (username: string) => void;
};

function Product({
  products,
  setCartProducts,
  setFavouriteProducts,
  cartProducts,
  favouriteProducts,username,setUsername
}: ProductsProps) {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  console.log("line 17", id);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product based on productId
        const response = await fetch(
          `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`
        );
        const data: Product = await response.json();
        console.log("data", data);

        if (data) {
          setProduct(data);
        } else {
          alert("Something went wrong while fetching the product!");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, []);

  if (!product) {
    return <p>Loading product...</p>;
  }

  function handleFavorite(product: Product, event: React.MouseEvent) {
    event.stopPropagation();

    const isFavorite = favouriteProducts.some(
      (favProduct) => favProduct.id === product.id
    );

    if (isFavorite) {
      setFavouriteProducts(
        favouriteProducts.filter((favProduct) => favProduct.id !== product.id)
      );
    } else {
      setFavouriteProducts([...favouriteProducts, product]);
    }
  }

  function handleCart(product: Product, event: React.MouseEvent) {
    event.stopPropagation();

    const isInCart = cartProducts.some(
      (cartProduct) => cartProduct.id === product.id
    );

    if (isInCart) {
      setCartProducts(
        cartProducts.filter((cartProduct) => cartProduct.id !== product.id)
      );
    } else {
      setCartProducts([...cartProducts, product]);
    }
  }

  const isFavorite = favouriteProducts.some(
    (favProduct) => favProduct.id === product.id
  );
  const isInCart = cartProducts.some(
    (cartProduct) => cartProduct.id === product.id
  );

  return (
    <div className="productPage_container">
      <div className="nav">
        <Menu />
        <Logo />
        <Search products={products}/>
        <Navbar
          favouriteProducts={favouriteProducts}
          cartProducts={cartProducts}
          username={username}
          setUsername={setUsername}
        />
      </div>
      <div className="product-detail">
        <div className="product_sec1">
          <img src={product.api_featured_image} alt={product.name} />
        </div>
        <div className="product_sec2">
          <h2>{product.name}</h2>
          <p><b>Brand:</b> {product.brand}</p>
          <p className="desc">{product.description}</p>
          <p>Price: {product.price} $</p>
          <button>
          <img
            src={isFavorite ? FilledStar : Star}
            alt="star"
            className="star"
            onClick={(event) => handleFavorite(product, event)}
          /></button>
          <button>
          <img
            src={isInCart ? AddedToCart : AddCart}
            alt="cart"
            className="cart"
            onClick={(event) => handleCart(product, event)}
          /></button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
