import React, { useState } from 'react';
import styled from 'styled-components';

import Category from '../../../components/AdminCategory/Category';
import TransactionData from './Transactiondata';
import Pagination from 'react-js-pagination';


const itemsPerPage = 5;

export default function AdminTransaction() {
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPosts = TransactionData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(TransactionData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleApproval = (postId) => {
        // Implement your approval logic here
        console.log(`Approving transaction with id ${postId}`);
    };

    const handleCompletion = (postId) => {
        // Implement your completion logic here
        console.log(`Completing transaction with id ${postId}`);
    };

    return (
        <div>
            <Category />
            <TitleBox>
                <BoardTitle>번호</BoardTitle>
                <Title>제목</Title>
                <Situation>현황</Situation>
            </TitleBox>
            {currentPosts.map((post) => (
                <BoardItem key={post.id}>
                    <Number>{post.number}</Number>
                    <PostTitle>{post.title}</PostTitle>
                    <PostSituation>{post.situation}</PostSituation>
                    <Button onClick={() => handleApproval(post.id)}>거래 승인</Button>
                    <Button onClick={() => handleCompletion(post.id)}>거래 완료</Button>
                </BoardItem>
            ))}
            {totalPages > 1 && (
                <PaginationContainer>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={TransactionData.length}
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

//====================게시글 타이틀 Css=========================

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


const Situation = styled(BoardTitle)`
    margin-left: 15rem;
    width: 10%; 
`;


const Title = styled(BoardTitle)`
    margin-left: 25rem;
    width: 20%; 
`;

// ======================게시글 안 Css==========================
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


const PostTitle = styled(Number)`
     margin-left: 15rem;
    width: 30%; 
`;


const PostSituation = styled(Number)`
    margin-left: 12rem;
    width: 10%; 
`;
//==============================================================

//페이징Css
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


