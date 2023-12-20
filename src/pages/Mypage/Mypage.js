import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackbuttonIcon } from '../../assets/Backbutton_icon.svg';

import Header from './../../components/Header/Header';

import Pagination from 'react-js-pagination';

export default function Mypage() {
    const navigate = useNavigate();
    const [userArticles, setUserArticles] = useState([]);
    const [nickname, setNickname] = useState([]);
    const [username, setUsername] = useState([]);



    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = userArticles.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleBackButtonClick = () => {
        navigate('/mainpage');
    };

    const handlePostClick = (postId) => {
        navigate(`/postdetail/${postId}`);
      };
      
    useEffect(() => {
        const userIdFromLocalStorage = localStorage.getItem('userId');
       
        if (!userIdFromLocalStorage) {
            console.error('UserId not found in local storage');
            return;
        }

        const fetchUserArticles = async () => {
            try {
                const response = await axios.get(`http://dana-seo.shop:8080/api/user/getUserArticles?userId=${userIdFromLocalStorage}`);
                setUserArticles(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user articles:', error);
            }
        };

        fetchUserArticles();
    }, []);

    useEffect(() => {
        const userIdFromLocalStorage = localStorage.getItem('userId');

        if (!userIdFromLocalStorage) {
            console.error('UserId not found in local storage');
            return;
        }

        const fetchUsernickName = async () => {
            try {
                const response = await axios.get(`http://dana-seo.shop:8080/api/user/get?userId=${userIdFromLocalStorage}`);
                setNickname(response.data.nickName);  
                setUsername(response.data.username);  
                localStorage.setItem('nickName', response.data.nickName); //닉네임 로컬 스토리지 저장
                
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        
        fetchUsernickName();
    }, []);


    return (
        <div>
            <Header />
            <div style={{ padding: '3rem' }}>
                <TitleBox>
                    <BackButton>
                        <BackbuttonIcon onClick={handleBackButtonClick} />
                    </BackButton>
                    <Title>마이페이지</Title>
                </TitleBox>
                <Container>
                    <div style={{ padding: '1rem' }}>
                        <ServiceTitle>{nickname}</ServiceTitle>
                        <UserEmail>{username}</UserEmail>
                    </div>
                </Container>
                <div>
                    <Text>내가쓴글</Text>
                    <ListContainer>
                        {currentPosts.map((post) => (
                            <ListItem key={post.id} onClick={() => handlePostClick(post.id)}>
                                <ListTitle>{post.title}</ListTitle>
                            </ListItem>
                        ))}
                    </ListContainer>

                    <PaginationContainer>
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={userArticles.length}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                        />
                    </PaginationContainer>
                </div>
            </div>
        </div>
    )
}


const TitleBox = styled.div`
    width: 100%;
    height: 5rem; 
    display: flex;
    flex-direction: row;
`;

const BackButton = styled.button`
    stroke: #555454;
    background-color: white;
    border: none;
    cursor: pointer;
`;

const Title = styled.div`
    color: #4F4E4E;
    font-family: Noto Sans;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0 auto;
    padding-top: 10px;
`;

const Container = styled.div`
    width: 100%;
    height: 120px;
    flex-shrink: 0;
    border-radius: 30px;
    background: #F2F2F2;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ServiceTitle = styled.div`
    color: #4F4E4E;
    font-family: Noto Sans;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const UserEmail = styled.div`
    color: #4F4E4E;
    font-family: Noto Sans;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Text = styled.div`
    padding: 2rem;

    color: #4F4E4E;
    font-family: Noto Sans;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
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


const PaginationContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;
