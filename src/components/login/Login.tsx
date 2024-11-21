import { useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import LoginButton from "../../assets/login.png";

type LoginProps = {
  username: string;
  setUsername: (username: string) => void;
};

function Login({ username, setUsername }: LoginProps) {
  const [toggle, setToggle] = useState(false);
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(username ? true : false);

  const navigate = useNavigate();

  function handleSignup(event: React.FormEvent) {
    event.preventDefault();
    navigate("/signup");
  }

  function handleLoginBtn(event: React.FormEvent) {
    event.preventDefault();
    setToggle(!toggle);
  }

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoggedIn(true);
    setToggle(!toggle);
  }

  function handleLogOut() {
    setUsername("");
    setLoggedIn(false);
    setToggle(!toggle);
  }

  const name = username.slice(0, 1).toUpperCase() + username.slice(1);

  return (
    <div className="login_container">
      <img
        src={LoginButton}
        alt="Login"
        onClick={handleLoginBtn}
        className="login_btn"
      />
      {toggle && !loggedIn && (
        <div className="login_popup">
          <form className="form_login" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            ></input>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
            <button type="submit">Login</button>
            <p className="signUp_opt">
              Not a member yet?{" "}
              <p onClick={handleSignup} className="signUp_btn">
                Sign Up here
              </p>
            </p>
          </form>
        </div>
      )}
      {loggedIn && (
        <div className="welcome_msg">
          <p>Welcome {name}</p>
        </div>
      )}
      {toggle && loggedIn && (
        <div className="profile_sec">
          <ul>
            <li onClick={handleLogOut}>LogOut</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Login;
