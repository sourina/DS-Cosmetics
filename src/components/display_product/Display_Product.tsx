import Star from "../../assets/star.png";
import FilledStar from "../../assets/1564507_checked_favorite_star_favourite_rating_icon.png";
import AddCart from "../../assets/858715_add_add to cart_cart_shopping cart_shopping cart icon_icon.png";
import AddedToCart from "../../assets/197223_meanicons_add_buy_store_check_icon.png";
import "./display_product.css";
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
  productsToDisplay: Product[];
  favouriteProducts: Product[];
  setFavouriteProducts: (products: Product[]) => void;
  cartProducts: Product[];
  setCartProducts: (products: Product[]) => void;
};

function Display_Product({
  productsToDisplay,
  favouriteProducts,
  setFavouriteProducts,
  cartProducts,
  setCartProducts,
}: ProductsProps) {

  const navigate = useNavigate();
  
  const handleProduct = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

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

  return (
    <div className="products_container">
      {productsToDisplay.map((product) => {
        const isFavorite = favouriteProducts.some(
          (favProduct) => favProduct.id === product.id
        );
        const isInCart = cartProducts.some(
          (cartProduct) => cartProduct.id === product.id
        );

        return (
          <div key={product.id} className="product_card" onClick={() => handleProduct(product)}>
            <img
              src={isFavorite ? FilledStar : Star}
              alt="star"
              className="star"
              onClick={(event) => handleFavorite(product, event)} 
            />
            <img
              src={isInCart ? AddedToCart : AddCart}
              alt="cart"
              className="cart"
              onClick={(event) => handleCart(product, event)} 
            />
            <img
              src={product.api_featured_image}
              alt={product.name}
              className="product_photo"
            />
            <p className="product_name">{product.name}</p>
            <p className="product_brand">{product.brand}</p>
            <p>{product.price} $</p>
          </div>
        );
      })}
    </div>
  );
}

export default Display_Product;
