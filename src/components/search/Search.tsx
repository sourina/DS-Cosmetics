import "./search.css";
import Search_Button from "../../assets/find.png";
import { useState } from "react";
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
};

function Search({ products }: ProductsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleSearch(event: React.FormEvent) {
   
    event.preventDefault();

    const matchedProduct = products.find(
      (product) => product.name.toLowerCase() === searchTerm.toLowerCase()
    );

    if (matchedProduct) {
      setErrorMessage("");
      navigate(`/product/${matchedProduct.id}`);
    } else {
      setErrorMessage("No product found with that name.");
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5)); // Limit suggestions to top 5
    } else {
      setSuggestions([]);
    }
  }

  function handleSuggestionClick(product: Product) {
    navigate(`/product/${product.id}`);
    setSearchTerm(product.name);
    setSuggestions([]); // Clear suggestions after selection
  }

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault(); // Prevent page reload
    handleSearch(event); // Trigger search logic
  }

  return (
    <div className="search_wrapper">
      <form className="search_form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="search_input"
          value={searchTerm}
          onChange={handleInputChange}
        ></input>
        <img
          src={Search_Button}
          alt="search"
          className="search_btn"
          onClick={handleSearch}
        />
      </form>
      {suggestions.length > 0 && (
        <div className="suggestions_list">
          {suggestions.map((product) => (
            <p
              key={product.id}
              className="suggestion_item"
              onClick={() => handleSuggestionClick(product)}
            >
              {product.name}
            </p>
          ))}
        </div>
      )}
      {errorMessage && (
        <div className="error_message">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Search;
