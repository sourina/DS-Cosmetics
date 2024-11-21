import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import Logo from "../../components/logo/Logo";

type SignUpProps = {
  setUsername: (username: string) => void;
};

function Signup({setUsername}:SignUpProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    username: "",
    password: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    setUsername(formData.username)
    navigate("/"); 
  }

  return (
    <div className="signup_container">
      <div className="logo_container">
        <Logo />
      </div>
      <p className="signUp_header">Be a part of us to enjoy unlimited deals!!!</p>
      <form className="signup_form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Enter your address"
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Enter your username"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
        />

        <button type="submit">SignUp</button>
      </form>
    </div>
  );
}

export default Signup;
