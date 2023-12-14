import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import axios from 'axios';

import sendmessage from '../../assets/sendmessage.png';
import { Grid, Typography, Container, Button, ButtonGroup } from '@mui/material';

export default function InputComment() {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  let { postId } = useParams();
  const [messageContent, setMessageContent] = useState('');
  const [detail, setDetail] = useState('')

  const handleInputClick = () => {
    setPopupVisibility(true);
  };

  const handleNoteInputChange = (event) => {
    setMessageContent(event.target.value);
  };

  const handleCloseButtonClick = () => {
    setPopupVisibility(false);
  };


  // 게시글 get api
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://dana-seo.shop/api/article/getAll',
          {
            params: {
              articleId: postId,
            }
          });
        console.log(response.data);
        setDetail(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [postId]);

  //쪽지 전송 API
  const handleSendMessageClick = async () => {
    const userIdFromLocalStorage = localStorage.getItem('userId');

    if (!userIdFromLocalStorage) {
      console.error('UserId not found in local storage');
      return;
    }

    const messageData = {
      articleId: postId,
      content: messageContent,
      receiver: detail.sender, 
    };

    try {
      await axios.post(`http://dana-seo.shop/api/message/create?userId=${userIdFromLocalStorage}`, messageData);
      setPopupVisibility(false);
      alert('쪽지가 전송되었습니다.');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <InputBox>
      <Input
        type="text"
        placeholder="내용을 입력하세요"
        onClick={handleInputClick}
      />
      <Img
        src={sendmessage}
        alt="sendmessage"
      />
      {isPopupVisible && (
        <Popup>
          <PopupContent>
            <CloseButton onClick={handleCloseButtonClick}>X</CloseButton>
            <Title>쪽지 보내기</Title>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
              <p>내용</p>
              <NoteInput
                placeholder="Type your message here"
                style={{ width: '34vw' }}
                value={messageContent}
                onChange={handleNoteInputChange}
              />
            </div>
            <Button onClick={handleSendMessageClick} style={{ width: '37vw', height: '54px', borderRadius: '4px', background: 'var(--gray-100, #e1e1e1)' }}>
              확인
            </Button>
          </PopupContent>
        </Popup>
      )}
    </InputBox>
  );
}

const Img = styled.img`
    width:56px; 
    height: 67px;
    position: absolute; 
    right: 60px;
`

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vw; 
  width: 92vw; 
  max-width: 600px;
`;

const Input = styled.input`
  position: relative;
  width: 92vw; 
  height: 60px;
  border-radius: 15px;
  background: #f3f1f1;
  border: none;
  padding: 0.5vw; 
  margin-bottom: 1vw; 
`;

const SendButton = styled.button`
  width: 37vw; 
  height: 54px;
  border-radius: 4px;
  background: var(--gray-100, #e1e1e1);
`;

//팝업창 전체
const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%; 
`;


const PopupContent = styled.div`
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;

  input {
    width: 50%; 
    height: 12vw; 
    border: none;
    border-radius: 5px;
    padding: 0.5vw; 
    margin-bottom: 1vw; 
    border: 1px solid #ccc;
  }
`;

const Title = styled.div`
  width: 100vw; 
  flex-shrink: 0;
  color: var(--black, #000);
  font-family: HeadlandOne;
  font-size: 2.8vw; 
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  padding: 1vw; 
`;

const NoteInput = styled.input`
    width: 10vw; 
`;

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 5px;
  font-size: 1.5rem;
  cursor: pointer;
  background: none;
  border: none;
  color: #555; /* Adjust the color as needed */
`;

