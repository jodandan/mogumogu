import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Category from '../../../components/AdminCategory/Category';
import Pagination from 'react-js-pagination';


const itemsPerPage = 5;

export default function AdminMember() {
  const [currentPage, setCurrentPage] = useState(1);
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        console.error('Admin token not found in local storage');
        return;
      }

      try {
        const response = await axios.get('http://dana-seo.shop:8080/api/user/admin/getAll', {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        setMemberData(response.data);
        console.log('Fetched member data:', response.data)
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = memberData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(memberData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleApproval = async (userId) => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      console.error('Admin token not found in local storage');
      return;
    }

    try {
      await axios.delete(`http://dana-seo.shop:8080/api/user/delete?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setMemberData((prevData) => prevData.filter((user) => user.id !== userId));

      alert("회원 삭제가 완료되었습니다.")
      console.log(`User with id ${userId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };



  return (
    <div>
      <Category />
      <TitleBox>
        <BoardTitle>번호</BoardTitle>
        <Id>아이디</Id>
        <Password>비밀번호</Password>
        <Nickname>닉네임</Nickname>
        <ReportCount>신고횟수</ReportCount>
      </TitleBox>
      {currentPosts.map((post) => (
        <BoardItem key={post.id}>
          <Number>{post.id}</Number>
          <PostId>{post.username}</PostId>
          <PostPassword>{post.password.slice(0, 5)}...</PostPassword>
          <PostNickname>{post.nickName}</PostNickname>
          <PostReportCount>{post.reportCount}</PostReportCount>
          <Button onClick={() => handleApproval(post.id)}>회원 삭제</Button>
        </BoardItem>
      ))}
      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={memberData.length}
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
const Id = styled(BoardTitle)`
  margin-left: 5rem;
  width: 13%; 
`;

const Password = styled(BoardTitle)`
  margin-left: 8rem;
  width: 10%; 
`;

const ReportCount = styled(BoardTitle)`
  margin-left: 0rem;
  width: 20%; 
`;


const Nickname = styled(BoardTitle)`
  margin-left: 10rem;
  width: 15%; 
`;



// ======================게시글 안 Css==========================
const PostId = styled(Number)`
  margin-left: 1rem;
  width: 13%; 
`;

const PostPassword = styled(Number)`
  margin-left: 10rem;
  width: 20%; 
`;

const PostNickname = styled(Number)`
  margin-left: 9rem;
  width: 20%; 
`;


const PostReportCount = styled(Number)`
  margin-left: 6rem;
  width: 30%; 
`;



const PaginationContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    width: 107px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #FFF;
    color: #000;
    font-family: Noto Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    border: none;
    cursor: pointer;
`;





