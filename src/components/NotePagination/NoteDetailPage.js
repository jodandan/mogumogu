//하나의 게시물을 클릭했을때 나오는 페이지
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header/Header';

import { ReactComponent as BackbuttonIcon } from '../../assets/Backbutton_icon.svg'
import Plusbutton from '../../assets/Plusbutton.png'
import checkmark from '../../assets/checkmark.png'
import dollar from '../../assets/dollar.png'
import passbook from '../../assets/passbook.png'

import InputComment from './InputComment';
import TransactionPopup from './TransactionPopup';


const NoteDetailPage = ({ notesData }) => {
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const { noteId } = useParams();
    const navigate = useNavigate();
    const note = notesData.find((n) => n.id === parseInt(noteId, 10));

    if (!note) {
        return <div>Note not found</div>;
    }

    const handleBackButtonClick = () => {
        navigate('/note');
    };


    //하드코딩 데이터
    const comments = [
        { id: 1, sender: '깜장콩', content: 'Hello!', timestamp: '2023-01-01 12:00' },
        { id: 2, sender: '김조단', content: 'Hi there!', timestamp: '2023-01-01 13:00' },
        { id: 3, sender: '깜장콩', content: 'How are you?', timestamp: '2023-01-01 14:00' },
    ];

    const handlePlusButtonClick = () => {
        setPopupVisibility(true);
    };

    const handlePopupOptionClick = (option) => {

        console.log(`Selected option: ${option}`);
        //팝업닫기
        setPopupVisibility(false);
    };

    return (
        <div>
            <Header />
            <div style={{ padding: '2rem' }}>
                <TitleBox>
                    <BackButton>
                        <BackbuttonIcon onClick={handleBackButtonClick} />
                    </BackButton>
                    <Title>쪽지</Title>
                    <PlusButtonBox>
                        <img
                            src={Plusbutton}
                            alt="Plusbutton"
                            style={{ width: '55px', height: '50px', cursor: 'pointer' }}
                            onClick={handlePlusButtonClick}
                        />
                        {isPopupVisible && <TransactionPopup handlePopupOptionClick={handlePopupOptionClick} />}
                    </PlusButtonBox>
                </TitleBox>
                <PostBody>
                    <ul>
                        {comments.map((comment) => (
                            <Comment key={comment.id}>
                                <div style={{ width: '100%' }}>
                                    <div>
                                        <p>{comment.sender}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p>{comment.content}</p>
                                        <p>{comment.timestamp}</p>
                                    </div>
                                </div>
                            </Comment>
                        ))}
                    </ul>
                    <InputComment />
                </PostBody>
            </div>
        </div>
    );
};

export default NoteDetailPage;


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

const Comment = styled.div`
    border-bottom: 1px solid #ccc;
    padding: 10px;
    p {
      margin: 3px;
    }
`;

const PlusButtonBox = styled.div`
    flex-shrink: 0;
    background-color: white;
`;



