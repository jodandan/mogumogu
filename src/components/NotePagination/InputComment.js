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
     
    </InputBox>
  );
}

const Img = styled.img`
  width:56px; 
  height: 67px;
  position: absolute;
  right:0; 
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vw;
  width: 92vw;
  max-width: 600px;
  position: fixed; 
  bottom: 0;
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
