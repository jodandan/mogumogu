import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackbuttonIcon } from '../../assets/Backbutton_icon.svg'
import Pagination from '../../components/NotePagination/Pagination';
import Header from './../../components/Header/Header';


export default function Note() {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate('/mainpage');
    };

    return (
        <div>
            <Header />
            <div style={{ padding: '2rem' }}>
                <TitleBox>
                    <BackButton>
                        <BackbuttonIcon onClick={handleBackButtonClick} />
                    </BackButton>
                    <Title>쪽지함</Title>
                </TitleBox>
                <PostBody>
                    <Pagination />
                </PostBody>
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

const PostBody = styled.div`
    width: 100%;
    height: 100%; 
`;