// Signup.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import useInput from "../hook/useInput";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const validators = {
  id: (id) => /^[A-Za-z0-9]{6,20}$/.test(id),
  pw: (pw) => /^[A-Za-z0-9]{8,20}$/.test(pw),
  email: (email) =>
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/.test(
      email
    ),
  pwConfirm: (pw, pwConfirm) => pw === pwConfirm,
  mbti: (mbti) => /^[INFJESTP][NS][FT][JP]$/.test(mbti),
  birthdate: (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate <= today;
  },
};

const errorMessages = {
  id: "아이디는 6글자 이상의 영문과 숫자 조합으로 가능합니다.",
  pw: "비밀번호는 8글자 이상의 영문과 숫자 조합으로 가능합니다.",
  email: "올바른 이메일 형식이 아닙니다.",
  birthdate: "미래 날짜는 선택할 수 없습니다.",
  pwConfirm: "비밀번호가 일치하지 않습니다.",
  mbti: "올바른 MBTI 형식을 입력해주세요.",
};

function InputField({ label, id, type, value, onChange, validator }) {
  const isValid = validator(value);
  return (
    <div className={styles.form_element}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWithError}>
        <input
          id={id}
          type={type}
          value={value}
          className={styles.input}
          onChange={onChange}
          required
        />
        {!isValid && value.length > 0 && (
          <span className={styles.errorMessage}>{errorMessages[id]}</span>
        )}
      </div>
    </div>
  );
}

function Signup() {
  const navigate = useNavigate();
  const userId = useInput("", validators.id);
  const password = useInput("", validators.pw);
  const email = useInput("", validators.email);
  const [showMbtiSuggestions, setShowMbtiSuggestions] = useState(false);
  const [birthdate, setBirthdate] = useState(null);
  const [birthdateInput, setBirthdateInput] = useState("");
  const [nick, setNick] = useState("");
  const [term, setTerm] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const passwordConfirm = useInput("", (value) =>
    validators.pwConfirm(password.value, value)
  );
  const handleSignup = (e) => {
    e.preventDefault();

    axios
      .post("/members/signup", {
        userId: userId.value,
        password: password.value,
        email: email.value,
        nickName: nick,
        mbti: mbti,
        birthday: birthdateInput,
      })
      .then((response) => {
        console.log("Signup successful:", response.data);
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setErrorMessage(
            "이미 존재하는 아이디입니다. 다른 아이디를 선택해주세요."
          );
        } else {
          setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      });
  };
  const [mbti, setMbti] = useState("");
  const [showMbtiError, setShowMbtiError] = useState(false);
  const [mbtiSuggestions, setMbtiSuggestions] = useState([]);
  const MBTI_TYPES = [
    "INTJ",
    "INTP",
    "ENTJ",
    "ENTP",
    "INFJ",
    "INFP",
    "ENFJ",
    "ENFP",
    "ISTJ",
    "ISFJ",
    "ESTJ",
    "ESFJ",
    "ISTP",
    "ISFP",
    "ESTP",
    "ESFP",
  ];

  const isBirthdateValid = validators.birthdate(birthdate);

  useEffect(() => {
    setNotAllow(
      !(
        userId.isValid &&
        password.isValid &&
        email.isValid &&
        isBirthdateValid &&
        term
      )
    );
  }, [userId.isValid, password.isValid, email.isValid, isBirthdateValid, term]);

  useEffect(() => {
    setBirthdateInput(birthdate ? birthdate.toISOString().split("T")[0] : "");
  }, [birthdate]);

  useEffect(() => {
    setMbtiSuggestions(
      MBTI_TYPES.filter((type) => type.startsWith(mbti.toUpperCase()))
    );
  }, [mbti]);

  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <form className={styles.form} onSubmit={handleSignup}>
          <h1 className={styles.signup_title}>회원가입</h1>
          <InputField
            label="아이디"
            id="id"
            type="text"
            value={userId.value}
            onChange={userId.onChange}
            validator={validators.id}
          />
          <InputField
            label="비밀번호"
            id="pw"
            type="password"
            value={password.value}
            onChange={password.onChange}
            validator={validators.pw}
          />
          <InputField
            label="비밀번호 확인"
            id="pwConfirm"
            type="password"
            value={passwordConfirm.value}
            onChange={passwordConfirm.onChange}
            validator={() =>
              validators.pwConfirm(password.value, passwordConfirm.value)
            }
          />
          <div className={styles.form_element}>
            <label htmlFor="mbti" className={styles.label}>
              MBTI
            </label>
            <input
              id="mbti"
              value={mbti}
              className={styles.input}
              onChange={(e) => setMbti(e.target.value.toUpperCase())}
              onFocus={() => {
                setShowMbtiSuggestions(true);
                setShowMbtiError(false);
              }}
              onBlur={() => {
                setTimeout(() => setShowMbtiSuggestions(false), 200);
                setShowMbtiError(true);
              }}
              required
            />
            {showMbtiSuggestions && (
              <div className={styles.autocomplete}>
                {mbtiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setMbti(suggestion);
                      setShowMbtiSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}

            {showMbtiError && !validators.mbti(mbti) && mbti.length > 0 && (
              <span className={styles.errorMessage}>{errorMessages.mbti}</span>
            )}
          </div>
          <div className={styles.form_element}>
            <label htmlFor="nickname" className={styles.label}>
              닉네임
            </label>{" "}
            {/* Add label class */}
            <input
              id="nickname"
              value={nick}
              className={styles.input}
              onChange={(e) => setNick(e.target.value)}
              required
            />
            <div className={styles.errorMessage}>
              {nick.length === 0 ? <div>필수 입력 사항입니다.</div> : null}
            </div>
          </div>

          <InputField
            label="이메일"
            id="email"
            type="email"
            value={email.value}
            onChange={email.onChange}
            validator={validators.email}
          />
          <div className={styles.form_element}>
            <label htmlFor="birthdate" className={styles.label}>
              생년월일
            </label>
            <div className={styles.birthdate_input_container}>
              <input
                id="birthdate"
                type="date"
                value={birthdateInput}
                className={styles.input}
                onChange={(e) => {
                  setBirthdateInput(e.target.value);
                  setBirthdate(new Date(e.target.value));
                }}
                required
              />
            </div>
            <div className={styles.errorMessage}>
              {!isBirthdateValid && birthdate && (
                <div>{errorMessages.birthdate}</div>
              )}
            </div>
          </div>
          <div className={styles.checkbox}>
            <label>
              <input
                type="checkbox"
                name="term"
                checked={term}
                onChange={(e) => setTerm(e.target.checked)}
                required
              />
              <span className={styles.black}>만 14세 이상입니다.</span>{" "}
              <span className={styles.red}>(필수)</span>
            </label>
          </div>
          {errorMessage && (
            <div className={styles.errorContainer}>
              <span className={styles.errorMessage}>{errorMessage}</span>
            </div>
          )}
          <button disabled={notAllow} className={styles.signup_button}>
            가입하기
          </button>
        </form>
        <div className={styles.right}>
          <h2>이용약관</h2>
          <p>
            본 약관은 ... (이하 "회사")이 운영하는 웹 사이트 및 모바일
            애플리케이션 ... (이하 "서비스")를 이용함에 있어 회사와 이용자의
            권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
