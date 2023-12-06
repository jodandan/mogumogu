import React from "react";
import { Routes, Route } from "react-router-dom";
import Note from './pages/Note/Note';
import Mypage from './pages/Mypage/Mypage';

import NoteDetailPage from "./components/NotePagination/NoteDetailPage";
import notesData from "./components/NotePagination/data";

import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminPost from './pages/Admin/AdminPost/AdminPost';
import AdminTransaction from './pages/Admin/AdminTransaction/AdminTransaction';
import AdminMember from './pages/Admin/AdminMember/AdminMember';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/note" element={<Note />} />
        <Route path="/note/:noteId" element={<NoteDetailPage notesData={notesData} />} />

        <Route path="/mypage" element={<Mypage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        <Route path="/adminpost" element={<AdminPost />} />
        <Route path="/admintransaction" element={<AdminTransaction />} />
        <Route path="/adminmember" element={<AdminMember />} />
      </Routes>
    </div>
  );
}

export default App;
