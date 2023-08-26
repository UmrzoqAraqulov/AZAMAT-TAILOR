import { useState } from "react";
import { useAuth } from "../../states/auth";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import logo from "../../assets/images/logo.svg";
import bg_img from "../../assets/images/login-background.jpg";
import userIcon from "../../assets/images/username_login.svg";
import passwordIcon from "../../assets/images/password_login.svg";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { userName, password } = loginData;

  const onFinish = (e) => {
    e.preventDefault();
    login(loginData, navigate);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <div
      style={{ background: `url(${bg_img})`, backgroundSize: "cover" }}
      className="contain"
    >
      <div className="main">
        <img className="logo" src={logo} alt="LogInLogo" />
        <h2 className="title">Azamat Mens Tailor</h2>
        <form className="form" id="b-form" onSubmit={onFinish}>
          <div className="input-wrapper">
            <label htmlFor="userName">
              <img width="35" src={userIcon} alt="dsdasda" />
            </label>
            <input
              id="userName"
              name="userName"
              value={userName}
              onChange={handleChange}
              type="text"
              required
              placeholder="Username"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">
              <img width="35" src={passwordIcon} alt="keys" />
            </label>
            <div className="pass">
              <input
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                min="4"
                max="10"
              />
              {showPassword ? (
                <i
                  onClick={() => setShowPassword(false)}
                  className="fa-regular fa-eye-slash"
                ></i>
              ) : (
                <i
                  onClick={() => setShowPassword(true)}
                  className="fa-regular fa-eye"
                ></i>
              )}
            </div>
          </div>
          <button className="button" type="submit">
            KIRISH
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
