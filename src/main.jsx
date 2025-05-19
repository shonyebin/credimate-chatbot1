import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Login';
import App from './App';
import './index.css';

const Root = () => {
  const [student, setStudent] = useState(null);
  return student ? <App student={student} /> : <Login onLogin={setStudent} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);