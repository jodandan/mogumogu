import React from "react";
import { Routes, Route } from "react-router-dom";
import Note from './pages/Note/Note';
import Mypage from './pages/Mypage/Mypage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Note />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
