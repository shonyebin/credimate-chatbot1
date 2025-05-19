
import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [input, setInput] = useState('')
  const [chat, setChat] = useState([])

  const sendMessage = async () => {
    if (!input) return
    setChat(prev => [...prev, { role: 'user', content: input }])

    try {
      const res = await axios.post('https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: '너는 학점은행제 담당 교수이고 학생들의 질문에 친절하고 정확하게 안내해줘.' },
            { role: 'user', content: input }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
          }
        }
      )

      const reply = res.data.choices[0].message.content
      setChat(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (error) {
      setChat(prev => [...prev, { role: 'assistant', content: '⚠️ 오류가 발생했습니다. 다시 시도해주세요.' }])
    }

    setInput('')
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <h1>CrediMate 학생지원 챗봇</h1>
      <div style={{ margin: '1rem 0' }}>
        {chat.map((c, i) => (
          <div key={i}><b>{c.role === 'user' ? '👩‍🎓' : '🧑‍🏫'}:</b> {c.content}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="질문을 입력하세요..."
        style={{ width: '80%', padding: '0.5rem' }}
      />
      <button onClick={sendMessage} style={{ padding: '0.5rem 1rem' }}>보내기</button>
    </div>
  )
}

export default App
