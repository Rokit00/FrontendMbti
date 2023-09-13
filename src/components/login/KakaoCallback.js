import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const KakaoCallback = () => {
  const code = window.location.search;
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get("code");
    console.log(code);
    console.log("/auth/kakao/callback");
    axios.get(`/auth/kakao/callback?code=${code}`).then((r) => {
      console.log(r.data);

      localStorage.setItem("name", r.data.user_name);

      navigate("/loginSuccess");
    });
  }, []);

  return <div>로그인 중입니다.</div>;
};

export default KakaoCallback;
