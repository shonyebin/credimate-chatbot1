import React, { useState } from "react";
import Login from "./Login";
import Chatbot from "./Chatbot";

const App = () => {
  const [userId, setUserId] = useState("");

  return userId ? (
    <Chatbot userId={userId} />
  ) : (
    <Login onLogin={(id) => setUserId(id)} />
  );
};

export default App;