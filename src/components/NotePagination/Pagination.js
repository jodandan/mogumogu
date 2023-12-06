import React, { useState } from 'react';
import './Pagination.css';
import Pagination from 'react-js-pagination';
import NoteListItem from './NoteListItem';
import NoteDetailPage from './NoteDetailPage';
import notesData from './data'; // snowflake import

const itemsPerPage = 10;

const Paging = () => {
  const [page, setPage] = useState(1);
  const [selectedNote, setSelectedNote] = useState(null);

  // 현재 페이지에 해당하는 데이터 추출
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = notesData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    setSelectedNote(null); // Reset selected note when changing page
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  return (
    <div>
      <ul>
        {currentData.map((note) => (
          <NoteListItem key={note.id} note={note} onClick={() => handleNoteClick(note)} />
        ))}
      </ul>

      {/* 페이징 컴포넌트 추가 */}
      <Pagination
        activePage={page}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={notesData.length}
        pageRangeDisplayed={5}
        prevPageText="‹"
        nextPageText="›"
        onChange={handlePageChange}
      />

      {/* 선택된 노트에 대한 상세 내용을 새로운 페이지로 표시 */}
      {selectedNote && <NoteDetailPage note={selectedNote} />}
    </div>
  );
};

export default Paging;