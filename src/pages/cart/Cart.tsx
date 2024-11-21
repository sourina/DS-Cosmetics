import { useState } from "react";
import Footer from "../../components/footer/Footer";
import Logo from "../../components/logo/Logo";
import Navbar from "../../components/navbar/Navbar";
import Search from "../../components/search/Search";
import "./cart.css";
import Cancel from "../../assets/4115230_cancel_close_delete_icon.png";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import Delete from "../../assets/370086_bin_delete_empty_out_recycle_icon.png";

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
  cartProducts: Product[];
  setCartProducts: (products: Product[]) => void;
  username: string;
  setUsername: (username: string) => void;
};

function Cart({
  products,
  favouriteProducts,
  cartProducts,
  setCartProducts,
  username,
  setUsername,
}: ProductsProps) {
  const [productQuantities, setProductQuantities] = useState(
    cartProducts.map((product) => ({ id: product.id, quantity: 0 }))
  );
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [streetName, setStreetName] = useState("");
  const [postNumber, setPostNumber] = useState("");
  const [shippingOption, setShippingOption] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderNumber, setOrderNumber] = useState(0);

  const navigate = useNavigate();

  let total = 0;
  let tax = 0;

  const findQuantity = (id: number) =>
    productQuantities.find((item) => item.id === id);

  const increment = (id: number) => {
    setProductQuantities((productQuantities) =>
      productQuantities.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id: number) => {
    setProductQuantities((productQuantities) =>
      productQuantities.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  function deleteProduct(id: number) {
    setCartProducts(cartProducts.filter((product) => product.id !== id));
  }

  function handleShop() {
    setShowCheckout(true);
  }

  function handleClose() {
    setShowCheckout(false);
  }

  function handleConfirmation() {
    setOrderNumber(generateOrderNumber());
    setShowConfirmation(true);
  }

  function closeConfirmation() {
    setCartProducts([]);
    navigate("/");
  }

  const generateOrderNumber = () => {
    return Math.floor(Math.random() * 1000000); // Generates a random 6-digit number
  };

  return (
    <div className="cart_container">
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
      <div className="fav_products_container">
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => {
            const productQuantity = findQuantity(product.id)?.quantity || 1;
            const productPricePerST = parseFloat(product.price);
            const productPrice = parseFloat(
              (productQuantity * productPricePerST).toFixed(2)
            );
            total = total + productPrice;
            tax = parseFloat((0.1 * total).toFixed(2));
            return (
              <>
                <div key={product.id} className="product_cart">
                  <img
                    src={product.api_featured_image}
                    alt={product.name}
                    className="product_photo-cart"
                  />
                  <div className="product_details_cart">
                    <p className="product_name_cart">{product.name}</p>
                    <p className="product_brand_cart">{product.brand}</p>
                    <p className="product_price_cart">{product.price} $</p>
                  </div>
                  <div className="numberOfProducts">
                    <button onClick={() => decrement(product.id)}>-</button>
                    <p>{productQuantity}</p>
                    <button onClick={() => increment(product.id)}>+</button>
                  </div>
                  <div className="total_product_price">{productPrice} $</div>
                  <img
                    src={Delete}
                    alt="delete"
                    className="delete"
                    onClick={() => deleteProduct(product.id)}
                  />
                </div>
              </>
            );
          })
        ) : (
          <p className="empty_msg">
            Hey !!! Looks like you have nothing added..
          </p>
        )}

        {cartProducts.length > 0 ? (
          <div className="total_container">
            <p>Tax 10%: {tax} $</p>
            <p>Total: {total + tax} $</p>
            <button onClick={handleShop}>Buy Now</button>
          </div>
        ) : (
          <div className="empty_div"></div>
        )}
        <Footer />
        {showCheckout && (
          <div className="checkout_container">
            <img
              src={Cancel}
              alt="close"
              className="close_btn"
              onClick={handleClose}
            />
            <div>
              <p className="billing_header">Billing Details</p>
              <form className="form_checkout">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Mobile No.</label>
                <input
                  type="text"
                  value={mobile}
                  placeholder="Enter your mobile No."
                  onChange={(e) => setMobile(e.target.value)}
                />
                <label>Email Address</label>
                <input
                  type="text"
                  value={email}
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>House No.</label>
                <input
                  type="text"
                  value={houseNo}
                  placeholder="Enter your House No."
                  onChange={(e) => setHouseNo(e.target.value)}
                />
                <label>Street Name</label>
                <input
                  type="text"
                  value={streetName}
                  placeholder="Enter your Street Name"
                  onChange={(e) => setStreetName(e.target.value)}
                />
                <label>Post Number</label>
                <input
                  type="text"
                  value={postNumber}
                  placeholder="Enter your Post No."
                  onChange={(e) => setPostNumber(e.target.value)}
                />
              </form>
            </div>
            <div className="shipping_container">
              <p className="shipping_header">Shipping Details</p>
              <form className="shipping_form">
                <input
                  type="radio"
                  name="shipping"
                  value="homedelivery"
                  checked={shippingOption === "homedelivery"}
                  onChange={() => setShippingOption("homedelivery")}
                />
                <label>Home Delivery</label>
                <br />
                <input
                  type="radio"
                  name="shipping"
                  value="pickup"
                  checked={shippingOption === "pickup"}
                  onChange={() => setShippingOption("pickup")}
                />
                <label>Pick Up from Store</label>
              </form>
            </div>
            <div className="payment_container">
              <p className="payment_header">Payment Method</p>
              <button
                className={paymentMethod === "Klarna" ? "selected" : ""}
                onClick={() => setPaymentMethod("Klarna")}
              >
                Klarna
              </button>
              <button
                className={paymentMethod === "Card" ? "selected" : ""}
                onClick={() => setPaymentMethod("Card")}
              >
                Card Payment
              </button>
              <button
                className={paymentMethod === "Swish" ? "selected" : ""}
                onClick={() => setPaymentMethod("Swish")}
              >
                Swish
              </button>
            </div>
            <div className="confirm">
              <button onClick={handleConfirmation}>Confirm Booking</button>
            </div>
          </div>
        )}
        {showConfirmation && (
          <div className="confirmation_container">
            <img
              src={Cancel}
              alt="close"
              className="close_btn"
              onClick={closeConfirmation}
            />
            <p className="confirmation_msg">Your Order has been placed</p>
            <p className="confirm_header">Order Details</p>
            <p className="confirm_details">Order No.: {orderNumber}</p>
            <p className="confirm_details">Name: {name}</p>
            <p className="confirm_details">Mob No.: {mobile}</p>
            <p className="confirm_details">Delivery: {shippingOption}</p>
            <p className="confirm_details">Payment: {paymentMethod}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
