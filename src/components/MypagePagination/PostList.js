
import React, { useState } from 'react';
import styled from 'styled-components';

import Pagination from 'react-js-pagination';


const PostList = ({ posts }) => {
    const itemsPerPage = 5; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div>
            <ListContainer>
                {currentPosts.map((post) => (
                    <ListItem key={post.id}>
                        <ListTitle>{post.title}</ListTitle>
                    </ListItem>
                ))}
            </ListContainer>

            <PaginationContainer>
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={posts.length}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />
            </PaginationContainer>
        </div>
    );
};

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


const PaginationContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

export default PostList;