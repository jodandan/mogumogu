import React from 'react'
import styled from 'styled-components';
import { ReactComponent as Backbutton } from '../../assets/Backbutton_icon.svg'
import Pagination from '../../components/NotePagination/Pagination';

export default function Note() {
    return (
        <div>
            <HeaderBox>
                <div>헤더자리</div>
            </HeaderBox>
            <div style={{padding: '2rem'}}>
                <TitleBox>
                    <BackButton>
                        <Backbutton />
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

const PostBody = styled.div`
    width: 100%;
    height: 100%; 
`;