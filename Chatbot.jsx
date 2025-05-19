import React from "react";

const Chatbot = ({ userId }) => {
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>CrediMate 학생지원 챗봇</h1>
      <p>환영합니다! 교육원ID <strong>{userId}</strong> 로 로그인되었습니다.</p>
      <p>이제 챗봇 기능이 여기에 들어갈 예정입니다.</p>
    </div>
  );
};

export default Chatbot;