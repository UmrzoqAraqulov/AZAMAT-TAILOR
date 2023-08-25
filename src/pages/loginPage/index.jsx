import { Button, Form, Input } from "antd";
import { useAuth } from "../../states/auth";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import logo from "../../assets/images/logo.svg";
import bg_img from "../../assets/images/login-background.jpg";
import userIcon from "../../assets/images/username_login.svg";
import passwordIcon from "../../assets/images/password_login.svg";


const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const onFinish = (userInfo) => {
    login(userInfo, navigate);
  };
  return (
    <div
      style={{ background: `url(${bg_img})`,backgroundSize:"cover" }}
      className="loginPageWrapper"
    >
      <div className="loginFormWrapper">
        <img className="logo" src={logo} alt="logo" />
        <h2 className="title">Login</h2>
        <Form name="login" onFinish={onFinish} className="loginForm">
          <div className="inputs userInputWrapper">
            <img src={userIcon} className="userIcon" alt="userIcon" />
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              className=""
            >
              <Input className="userInput" />
            </Form.Item>
          </div>
          <div className="inputs passworInputWrapper">
            <img src={passwordIcon} className="passwordIcon" alt="" />
            <Form.Item
              className=""
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password className="passwordInput" />
            </Form.Item>
          </div>

          <div className="submitBtnWrapper">
            <Form.Item>
              <Button type="primary" htmlType="submit" className="submitBtn">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
