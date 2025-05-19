import React, { useState } from 'react'

function Chatbot({ studentId }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!input.trim()) return

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_KEY_HERE'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: input }]
        })
      })

      if (!response.ok) throw new Error('API 요청 실패')

      const data = await response.json()
      console.log(data)
    } catch (err) {
      setError('⚠️ 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div>
      <p>🤖: <strong>{studentId}</strong>님 환영합니다.</p>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="질문을 입력하세요..."
        />
        <button type="submit">보내기</button>
      </form>
    </div>
  )
}

export default Chatbot
