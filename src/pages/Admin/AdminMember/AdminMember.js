import React, { useState } from 'react';
import styled from 'styled-components';

import Category from '../../../components/AdminCategory/Category';
import MemberData from './MemberData';
import Pagination from 'react-js-pagination';


const itemsPerPage = 5;

export default function AdminMember() {
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPosts = MemberData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(MemberData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleApproval = (postId) => {
        // Implement your approval logic here
        console.log(`Approving transaction with id ${postId}`);
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
                    <Number>{post.number}</Number>
                    <PostId>{post.email}</PostId>
                    <PostPassword>{post.password}</PostPassword>
                    <PostNickname>{post.nickname}</PostNickname>
                    <PostReportCount>{post.reportCount}</PostReportCount>
                    <Button onClick={() => handleApproval(post.id)}>회원 삭제</Button>
                </BoardItem>
            ))}
            {totalPages > 1 && (
                <PaginationContainer>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={MemberData.length}
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





