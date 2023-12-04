import React, { useState } from 'react';
import './Pagination.css';
import Pagination from 'react-js-pagination';
import notesData from './data'; // 데이터 파일 import

const itemsPerPage = 10;

const Paging = () => {
  const [page, setPage] = useState(1);

  // 현재 페이지에 해당하는 데이터 추출
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = notesData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div>
      {/* 현재 페이지에 해당하는 데이터 표시 */}
      <ul>
        {currentData.map((note) => (
          <li key={note.id}>
            <p>{note.content}</p>
            <p>{note.timestamp}</p>
          </li>
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
    </div>
  );
};

export default Paging;