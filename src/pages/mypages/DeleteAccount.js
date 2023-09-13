import React from "react";
import axios from "axios";
import styles from "./Mypage.module.css";
import { Mypage } from "./Mypage";
import { useAuth } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      const token = sessionStorage.getItem("token");
      try {
        const response = await axios.delete("/mypage/delete", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 204) {
          alert("계정이 성공적으로 삭제되었습니다.");

          sessionStorage.removeItem("token");
          setIsLoggedIn(false);
          setUser(null);

          navigate("/");
        } else {
          alert("계정 삭제 중 문제가 발생했습니다.");
        }
      } catch (error) {
        console.error("Error while deleting account:", error);
        alert("계정 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return null;
};

export default DeleteAccount;
