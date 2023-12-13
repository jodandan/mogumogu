import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';

import Category from '../../../components/AdminCategory/Category';
import Pagination from 'react-js-pagination';


const itemsPerPage = 5;

export default function AdminPost() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]); // 게시글 상태

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://dana-seo.shop/api/article/delete?articleId=${postId}`);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      console.log(`Post with id ${postId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting post with id ${postId}:`, error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://dana-seo.shop/api/article/getAll');
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);


  return (
    <div>
      <Category />
      <TitleBox>
        <BoardTitle>번호</BoardTitle>
        <Nickname>닉네임</Nickname>
        <Recruit>모집 인원</Recruit>
        <Title>제목</Title>
        <Detail>내용</Detail>
      </TitleBox>
      {currentPosts.map((post) => (
        <BoardItem key={post.id}>
          <Number>{post.id}</Number>
          <PostNickname>{post.nickName}</PostNickname>
          <PostRecruit>{post.numberOfPeople}</PostRecruit>
          <PostTitle>{post.title}</PostTitle>
          <PostDetail>{post.content}</PostDetail>
          <DeleteButton onClick={() => handleDelete(post.id)}>삭제</DeleteButton>
        </BoardItem>
      ))}
      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={posts.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </PaginationContainer>
      )}
    </div>
  );
}

const TitleBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 90%;
    height: 100%;
    flex-shrink: 0;
    margin: 3rem 3rem 3rem 3.5rem;
`;

const BoardTitle = styled.div`
  color: #000;
  font-family: Noto Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 4px;
  width: 5%;
`;


const BoardItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 3rem;
  flex-shrink: 0;
  margin: 0rem 3rem 0rem 3.5rem;
  padding: 1rem;
  gap: 1rem;
  border-top: 1px solid rgba(204, 204, 204, 0.80);
  border-bottom: 1px solid rgba(204, 204, 204, 0.80); 
  background: #F3F3F3;
`;



const Number = styled.div`
  color: #000;
  font-family: Noto Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 4.8px;
  width: 5%; 
`;

//====================게시글 타이틀 Css=========================
const Nickname = styled(BoardTitle)`
  margin-left: 3rem;
  width: 13%; 
`;

const Recruit = styled(BoardTitle)`
  width: 10%; 
`;

const Detail = styled(BoardTitle)`
  margin-left: 0rem;
  width: 20%; 
`;


const Title = styled(BoardTitle)`
  margin-left: 7rem;
  width: 20%; 
`;



// ======================게시글 안 Css==========================
const PostNickname = styled(Number)`
  margin-left: 1rem;
  width: 13%; 
`;

const PostRecruit = styled(Number)`
  margin-left: 1rem;
  width: 10%; 
`;

const PostTitle = styled(Number)`
  margin-left: 1rem;
  width: 20%; 
`;


const PostDetail = styled(Number)`
  width: 30%; 
`;




const PaginationContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

const DeleteButton = styled.button`
    border-radius: 20px;
    background: #FF8283;
    width: 75px;
    height: 30px;
    flex-shrink: 0;
    padding: 5px 10px;
    cursor: pointer;
    border: none;
`;




