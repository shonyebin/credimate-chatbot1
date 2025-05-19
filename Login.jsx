import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [input, setInput] = useState("");

  const handleLogin = () => {
    if (input.trim()) {
      onLogin(input.trim());
    } else {
      alert("교육원ID를 입력해주세요.");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>CrediMate 학생지원 챗봇</h2>
      <p>교육원ID를 입력하세요:</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="예: 20255500505"
        style={{ padding: "10px", fontSize: "16px", width: "250px" }}
      />
      <button onClick={handleLogin} style={{ marginLeft: "10px", padding: "10px 20px" }}>
        시작
      </button>
    </div>
  );
};

export default Login;