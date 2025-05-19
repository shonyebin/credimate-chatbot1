import React, { useState } from 'react';
import axios from 'axios';

function Chatbot({ eduId }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: `사용자 교육원ID는 ${eduId}입니다.` },
            { role: 'user', content: question }
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setAnswer(res.data.choices[0].message.content.trim());
    } catch (err) {
      console.error(err);
      setError('❗ 오류가 발생했습니다. 다시 시도해주세요.');
    }
    setLoading(false);
  };

  return (
    <div>
      <div>🙋‍♂️: 토론</div>
      <div>
        {loading ? '⏳ 답변을 불러오는 중입니다...' : error || `🤖: ${answer}`}
      </div>
      <input
        type="text"
        placeholder="질문을 입력하세요..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAsk}>보내기</button>
    </div>
  );
}

export default Chatbot;
