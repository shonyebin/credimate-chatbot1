import React, { useState } from 'react';

function Login({ onLogin }) {
  const [inputId, setInputId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputId.trim()) {
      onLogin(inputId.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="교육원ID 입력"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
      />
      <button type="submit">로그인</button>
    </form>
  );
}

export default Login;
