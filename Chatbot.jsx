import React, { useEffect, useState } from "react";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS88ZogR8KoXHpkEqk-cHssvtce9yecAq1gDE8ZB6e-IBK7sXR2U6BtzMP9XZjeTr4nphSwO9B1Ldrg/pub?output=tsv";

const Chatbot = ({ userId }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((data) => {
        const rows = data.trim().split("\n").map((row) => row.split("\t"));
        const headers = rows[0];
        const entries = rows.slice(1).map((cols) =>
          Object.fromEntries(cols.map((v, i) => [headers[i], v]))
        );
        const found = entries.find((row) => row["교육원아이디"] === userId);
        setStudent(found || {});
      });
  }, [userId]);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>CrediMate 학생지원 챗봇</h1>
      {student ? (
        student["이름"] ? (
          <div>
            <p>
              <strong>{student["이름"]}</strong>님, 환영합니다! 📅 주요 학사일정:
            </p>
            <ul>
              <li>개강일: {student["개강일"]}</li>
              <li>복습시험: {student["복습시험시작"]} ~ {student["복습시험종료"]}</li>
              <li>과제제출: {student["과제시작"]} ~ {student["과제종료"]}</li>
              <li>중간고사: {student["중간시작"]} ~ {student["중간종료"]}</li>
              <li>기말고사: {student["기말시작"]} ~ {student["기말종료"]}</li>
            </ul>
          </div>
        ) : (
          <p>일치하는 교육원ID를 찾을 수 없습니다.</p>
        )
      ) : (
        <p>불러오는 중...</p>
      )}
    </div>
  );
};

export default Chatbot;