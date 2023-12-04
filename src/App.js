import React from "react";
import { Routes, Route } from "react-router-dom";
import Note from './pages/Note/Note';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Note />} />
      </Routes>
    </div>
  );
}

export default App;
