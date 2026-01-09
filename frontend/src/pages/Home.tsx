import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20
      }}
    >
      <h1>Live Polling System</h1>

      <button
        onClick={() => navigate("/teacher")}
        style={{ padding: "10px 20px" }}
      >
        Join as Teacher
      </button>

      <button
        onClick={() => navigate("/student")}
        style={{ padding: "10px 20px" }}
      >
        Join as Student
      </button>
    </div>
  );
}
