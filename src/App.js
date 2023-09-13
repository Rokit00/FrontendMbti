//App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import DebateList from "./pages/debate_list/DebateList";
import SectionTwo from "./pages/home/sections/SectionTwo";
import DebateDetail from "./components/DebateDetail";
import LoginModal from "./components/login/LoginModal";
import { AuthProvider } from "./components/AuthContext";
import Signup from "./pages/Signup";
import NewDebate from "./components/NewDebate";
import Mychemilist from "./pages/mypages/Mychemilist";
import Mydiscussion from "./pages/mypages/Mydiscussion";
import Myinfor from "./pages/mypages/Myinfor";
import Qa from "./pages/mypages/Qa";
import DeleteAccount from "./pages/mypages/DeleteAccount";
import KakaoCallback from "./components/login/KakaoCallback";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<DebateList />} />
          <Route path="/post/:id" element={<DebateDetail />} />
          <Route path="/section2/:data" element={<SectionTwo />} />
          <Route path="/section2" element={<SectionTwo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginModal />} />
          <Route path="/newDebate" element={<NewDebate />} />
          <Route path="/Mychemilist" element={<Mychemilist />} />
          <Route path="/Mydiscussion" element={<Mydiscussion />} />
          <Route path="/profile" element={<Myinfor />} />
          <Route path="/Q&A" element={<Qa />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route
            exact
            path="/auth/kakao/callback"
            element={<KakaoCallback />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
