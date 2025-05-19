import React from 'react';
import Chatbot from './Chatbot';

function App({ student }) {
  return (
    <div>
      <h1>CrediMate 학생지원 챗봇</h1>
      <p>환영합니다! 교육원ID <strong>{student.id}</strong> 로 로그인되었습니다.</p>
      <Chatbot student={student} />
    </div>
  );
}

export default App;