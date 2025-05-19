import React, { useState } from 'react';
import App from './App';

function Login() {
  const [inputId, setInputId] = useState('');
  const [student, setStudent] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleLogin = async () => {
    const res = await fetch(
      'https://docs.google.com/spreadsheets/d/1K4ts2bZ-96u315XDtIfoZF72N4CZ_5pWG3HO6-K7wko/export?format=tsv&gid=0'
    );
    const tsv = await res.text();
    const rows = tsv.trim().split('\n').map(r => r.split('\t'));
    const headers = rows[0];
    const data = rows.slice(1).map(r => {
      let obj = {};
      headers.forEach((h, i) => (obj[h] = r[i]));
      return obj;
    });
    const found = data.find(d => d['교육원아이디'] === inputId);
    if (found) {
      setStudent({ id: inputId, name: found['이름'], data: found });
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };

  if (student) return <App student={student} />;

  return (
    <div>
      <h1>CrediMate 학생지원 챗봇</h1>
      <input
        type="text"
        placeholder="교육원ID를 입력하세요"
        value={inputId}
        onChange={e => setInputId(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      {notFound && <p style={{ color: 'red' }}>일치하는 교육원ID를 찾을 수 없습니다.</p>}
    </div>
  );
}

export default Login;