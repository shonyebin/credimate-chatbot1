import React, { useState } from 'react'
import Chatbot from './Chatbot'
import Login from './Login'

function App() {
  const [studentId, setStudentId] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = (id) => {
    setStudentId(id)
    setLoggedIn(true)
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>CrediMate 학생지원 챗봇</h1>
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <p>🤖: 토론</p>
          <Chatbot studentId={studentId} />
        </>
      )}
    </div>
  )
}

export default App
