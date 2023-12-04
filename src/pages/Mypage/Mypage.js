import React from 'react'
import styled from 'styled-components';
import { ReactComponent as Backbutton } from '../../assets/Backbutton_icon.svg';

import PostList from '../../components/MypagePagination/PostList'; 
import postData from '../../components/MypagePagination/MypagepostData'; 

export default function Mypage() {
    return (
        <div>
            <HeaderBox>
                <div>헤더자리</div>
            </HeaderBox>
            <div style={{ padding: '3rem' }}>
                <TitleBox>
                    <BackButton>
                        <Backbutton />
                    </BackButton>
                    <Title>마이페이지</Title>
                </TitleBox>
                <Container>
                    <div style={{ padding: '1rem' }}>
                        <ServiceTitle>모구모구</ServiceTitle>
                        <UserEmail>wdd789q@gachon.ac.kr</UserEmail>
                    </div>
                </Container>
                <div>
                    <Text>내가쓴글</Text>
                    <PostList posts={postData} />
                </div>
            </div>
        </div>
    )
}

const HeaderBox = styled.div`
    width: 100%;
    height: 5rem; 
    border: 1px solid blue;
`;

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

