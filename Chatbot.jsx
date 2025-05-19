import React, { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [userId, setUserId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (userId.trim()) setSubmitted(true);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    let reply = "";

    if (input.toLowerCase().includes("시험자료")) {
      reply = "📚 시험자료 안내\n\nhttps://naver.me/FW6MU4wD 링크를 클릭하여 이수하시는 과목명에 맞춰 자료를 다운받아주시면 되십니다! 😊";
    } else if (input.toLowerCase().startsWith("토론:")) {
      const prompt = `너는 학점은행제를 담당하는 교수로써 학생들에게 토론자료를 제공해주는 역할인거야. 그래서 이어진 문장으로 토론에 대한 주제로 내가 자료를 요청하면 완벽하게 모사율에 걸리지 않는 자료로 만들어서 나에게 보내줘. 글자수는 400자를 넘겨줘.\n\n${input}`;
      try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
          model: "gpt-3.5-turbo",
          messages: [{ role: "system", content: prompt }],
        }, {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json"
          }
        });
        reply = response.data.choices[0].message.content;
      } catch (error) {
        reply = "❌ 빈빈멘토가 토론자료를 가져오는 데 실패했어요. 다시 시도해 주세요.";
      }
    } else {
      reply = "빈빈멘토가 해당 내용을 확인하고 있어요!";
    }

    setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    setLoading(false);
  };

  if (!submitted) {
    return (
      <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
        <h1>🎓 CrediMate 학생지원 챗봇</h1>
        <p>교육원아이디를 입력해 주세요</p>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="예: 20255500505"
          style={{ padding: 10, width: "100%", marginBottom: 10 }}
        />
        <button onClick={handleLogin} style={{ width: "100%", padding: 10 }}>
          시작하기
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>🎓 CrediMate 학생지원 챗봇</h1>
      <p style={{ fontStyle: "italic", color: "gray" }}>환영합니다! 교육원아이디: {userId}</p>
      <div style={{ marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              background: msg.sender === "user" ? "#d0e6ff" : "#e2ffe2",
              padding: 10,
              marginBottom: 5,
              borderRadius: 5,
              textAlign: msg.sender === "user" ? "right" : "left",
              whiteSpace: "pre-wrap"
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div style={{ fontStyle: "italic", color: "gray" }}>빈빈멘토가 생각 중이에요...</div>}
      </div>
      <textarea
        rows="3"
        style={{ width: "100%", marginBottom: 10 }}
        placeholder="예: 토론: 인공지능의 윤리 문제에 대해"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit} style={{ width: "100%", padding: 10 }}>
        질문하기
      </button>
    </div>
  );
}