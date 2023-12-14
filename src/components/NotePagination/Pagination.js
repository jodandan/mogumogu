import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useNavigate } from 'react-router-dom';
import './Pagination.css';
import Pagination from 'react-js-pagination';




const Paging = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [note, setNote] = useState([]);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = note.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(note.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNoteClick = (post) => {
    setNote(post);
  };

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('userId');

    if (!userIdFromLocalStorage) {
      console.error('UserId not found in local storage');
      return;
    }

    const fetchUserArticles = async () => {
      try {
        const response = await axios.get(`http://dana-seo.shop/api/message/getMessageStorage?userId=${userIdFromLocalStorage}`);
        setNote(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user articles:', error);
      }
    };

    fetchUserArticles();
  }, []);


  return (
    <div>
      <ul style={{ marginBottom: '10px' }}>
        <ListContainer>
        {currentPosts.map((post) => (
        <ListItem key={post.id} onClick={() => handleNoteClick(post)}>
          <ListTitle
            onClick={() => {
              navigate(`/note/${post.id}`);
            }}
          >
            {post.title}
          </ListTitle>
        </ListItem>
      ))}
        </ListContainer>
      </ul>

      {/* 페이징 컴포넌트 추가 */}
      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={note.length}
            pageRangeDisplayed={5}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
          />
        </PaginationContainer>
      )}
    </div>
  );
};

export default Paging;


const PaginationContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

const ListContainer = styled.div`
    padding: 2rem;
`;

const ListItem = styled.div`
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    padding: 10px;
`;

const ListTitle = styled.div`
    color: #4F4E4E;
    font-family: Noto Sans;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;
