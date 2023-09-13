// LoginModal.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";
import logo_login from "../../assets/logo_login.png";
import kakao from "../../assets/kakao_login.png";
import HorizonLine from "./HorizonLine";
import useInput from "../../hook/useInput";
import { useAuth } from "../AuthContext";
import axios from "axios";

function Login({ customStyle, onLoginSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = useInput("");
  const password = useInput("");
  const [errorMessage, setErrorMessage] = useState("");
  const REST_API_KEY = "9394c1ee0de2fd55a8ccc154f6cc5114";
  const REDIRECT_URI = "http://localhost/auth/kakao/callback";
  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  let from = { pathname: "/lists" };
  if (location && location.state && location.state.from) {
    from = location.state.from;
  }
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("/members/login", {
        userId: userId.value,
        password: password.value,
      })
      .then((response) => {
        console.log("Login successful:", response.data);
        sessionStorage.setItem("token", response.data);
        setIsLoggedIn(true);

        if (from.pathname !== "/signup") {
          navigate(from.pathname);
        } else {
          navigate("/lists");
        }

        onLoginSuccess();
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrorMessage(
          "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요."
        );
      });
  };

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };
  return (
    <div className={styles.body}>
      <div className={styles.card} style={customStyle}>
        <form id="form" className={styles.form} onSubmit={handleLogin}>
          <div className={styles.logobox}>
            <img className={styles.logo_login} src={logo_login}></img>
          </div>

          <img
            src={kakao}
            className={styles.kakaoImage}
            alt="kakao"
            onClick={handleKakaoLogin}
          />
          <HorizonLine text="   or  " />
          <div className={styles.formDown}>
            <div className={styles.formControl}>
              <input
                type="text"
                id="username"
                placeholder="아이디"
                value={userId.value}
                onChange={userId.onChange}
                required
              />
            </div>
            <div className={styles.formControl}>
              <input
                type="password"
                id="password"
                placeholder="비밀번호"
                value={password.value}
                onChange={password.onChange}
                required
              />
            </div>
            <button className={styles.loginButton}>로그인</button>
            <div className={styles.loginSignup}>
              <div className={styles.loginSignupDesc}>계정이 없으신가요?</div>
              <button className={styles.loginSignupLink} onClick={handleSignUp}>
                가입하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
