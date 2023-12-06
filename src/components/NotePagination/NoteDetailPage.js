//하나의 게시물을 클릭했을때 나오는 페이지
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BackbuttonIcon } from '../../assets/Backbutton_icon.svg'
import Plusbutton from '../../assets/Plusbutton.png'
import checkmark from '../../assets/checkmark.png'
import dollar from '../../assets/dollar.png'
import passbook from '../../assets/passbook.png'

import InputComment from './InputComment';


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
            <HeaderBox>
                <div>헤더자리</div>
            </HeaderBox>
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
                        {isPopupVisible && (
                            <Popup>
                                <div style={{ display: 'flex', flexDirection: 'row'}}>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                                        <PopupOption onClick={() => handlePopupOptionClick('입금 신청')}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <img src={dollar} alt='dollar' style={{ width: '64px', height: '64px', padding: '1rem' }} />
                                                <p style={{ textAlign: 'center' }}>입금 신청</p>
                                            </div>
                                        </PopupOption>
                                        <PopupOption onClick={() => handlePopupOptionClick('거래 완료')}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <img src={checkmark} alt='checkmark' style={{ width: '64px', height: '64px', padding: '1rem' }} />
                                                <p style={{ textAlign: 'center' }}>거래 완료</p>
                                            </div>
                                        </PopupOption>
                                        <PopupOption onClick={() => handlePopupOptionClick('계좌 확인')}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <img src={passbook} alt='passbook' style={{ width: '64px', height: '64px', padding: '1rem' }} />
                                                <p style={{ textAlign: 'center' }}>계좌 확인</p>
                                            </div>
                                        </PopupOption>
                                    </div>
                                    <div style={{}}>
                                        <P style={{margin: '4rem 0rem 0rem 45rem'}}>진행 현황 : 거래승인</P>
                                    </div>
                                </div>
                            </Popup>
                        )}
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

const Popup = styled.div`
    position: absolute;
    width: 1540px;
    height: 172px;
    flex-shrink: 0;
    top: 80px;
    right: 0px;
    background-color: white;
    border: 1px solid #ccc;
    background: #F0F0F0;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    z-index: 2;
`;

const PopupOption = styled.div`
    padding: 10px;
    cursor: pointer;
    
    &:hover {
      background-color: #f5f5f5;
  }
`;

const P = styled.div`
    width: 286px;
    height: 69px;
    flex-shrink: 0;
    color: #393939;
    font-family: Inter;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;



