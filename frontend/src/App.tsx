


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}
