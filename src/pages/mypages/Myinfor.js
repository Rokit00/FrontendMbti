import React, { useState, useEffect } from "react";
import styles from "./Mypage.module.css";
import { Mypage } from "./Mypage";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";

const Myinfor = () => {
  const { user, setUser } = useAuth();

  const initialState = {
    id: "",
    userId: "",
    mbti: "",
    nickName: "",
    email: "",
    birthday: "",
  };

  const [userDetails, setUserDetails] = useState(initialState);

  useEffect(() => {
    if (user) {
      setUserDetails({
        id: user.id || "",
        userId: user.userId || "",
        mbti: user.mbti || "",
        nickName: user.nickName || "",
        email: user.email || "",
        birthday: user.birthday || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post("/mypage/profile", formData, config);
      if (response.status === 200) {
        alert("프로필 업데이트 완료");
      } else {
        alert("프로필 업데이트 실패");
      }
    } catch (error) {
      console.error("Error uploading profile picture", error);
      alert("프로필 업로드 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `/mypage/update-all`,
        userDetails,
        config
      );

      if (response.status === 200) {
        alert("정보가 성공적으로 수정되었습니다.");
        setUser(response.data);
      } else {
        alert("정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error updating user info", error);
      alert("정보 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className={styles.Myinfo}>
      <Mypage />
      <div className={styles.Box2}>
        <div className={styles.infor}>
          {["email", "mbti", "nickName", "birthday"].map((field, idx) => {
            const labels = {
              email: "이메일",
              mbti: "MBTI",
              nickName: "닉네임",
              birthday: "생년월일",
            };
            return (
              <div key={idx} className={styles.inputbox}>
                <label htmlFor={field}>{labels[field]}</label>
                <input
                  id={field}
                  name={field}
                  type="text"
                  value={userDetails[field] || ""}
                  onChange={handleChange}
                />
              </div>
            );
          })}
          <input type="file" onChange={handleImageUpload} />
          <button onClick={handleSubmit}>정보 수정</button>
        </div>
      </div>
    </section>
  );
};

export default Myinfor;
