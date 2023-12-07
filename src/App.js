import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";

import SignIn from "./pages/Login/SignIn/SignIn";
import SignUp from "./pages/Login/SignUp/SignUp";
import EmailAuth from "./pages/Login/EmailAuth/EmailAuth";

import MainPage from "./pages/MainPage/MainPage";
import MemberInfo from "./pages/MemberInfo/MemberInfo";
import CreatePost from "./pages/CreatePost/CreatePost";

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


        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/emailauth" element={<EmailAuth />} /> 

        <Route path="/mainpage" element={<><Header/><MainPage /></>} />
        <Route path="/memberinfo" element={<><Header/><MemberInfo /></>} />
        <Route path="/createpost" element={<><Header/><CreatePost /></>} />


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
