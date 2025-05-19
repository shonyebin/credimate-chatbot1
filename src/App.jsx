import React, { useState } from 'react';
import Login from './Login.jsx';
import Chatbot from './Chatbot.jsx';

function App() {
  const [eduId, setEduId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (id) => {
    setEduId(id);
    setIsLoggedIn(true);
  };

  return (
    <div>
      <h1>CrediMate 학생지원 챗봇</h1>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Chatbot eduId={eduId} />
      )}
    </div>
  );
}

export default App;
