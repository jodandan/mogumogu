import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Typography, Container, Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router';
import { ReactComponent as BackbuttonIcon } from "../../../assets/Backbutton_icon.svg"
import PersonIcon from '@mui/icons-material/Person';
import BoxImg from "../../../assets/BoxImg.png"
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function PostDetail() {
  const [detail, setDetail] = useState('')
  const [messageContent, setMessageContent] = useState('');


  let { postId } = useParams();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleButtonClick = () => {
    setPopupVisible(true);
  };


  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/mainpage');
  };

  const handleNoteInputChange = (event) => {
    setMessageContent(event.target.value);
  };


  // 게시글 get api
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://dana-seo.shop/api/article/get',
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

  // 게시글 삭제 api
  const deleteArticle = async () => {
    try {

      await axios.delete('http://dana-seo.shop/api/article/delete', {
        params: {
          articleId: postId
        }
      });
      alert('게시글이 삭제되었습니다.');
      navigate('/mainpage');

    } catch (error) {
      console.error(error);
    }
  };

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
      receiver: detail.nickName, // Assuming nickName is the receiver's username
    };
  
    try {
      await axios.post(`http://dana-seo.shop/api/message/create?userId=${userIdFromLocalStorage}`, messageData);
      setPopupVisible(false);
      alert('쪽지가 전송되었습니다.');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  //게시글 신고하기 api
  const createArticleComplain = async () => {
    try {
      const response = await axios.patch(
        'http://dana-seo.shop/api/article/addComplain',
        null,
        {
          params: {
            articleId: postId,
          },
        }
      );
      // API 호출 성공 시 알림창 표시
      alert('신고가 완료되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <>
      <div style={{ padding: '3rem' }}>
        <BackbuttonIcon onClick={handleBackButtonClick} />
      </div>

      <Grid container padding='1rem' >
        <Container maxWidth="xl">

          {/* 게시글 */}
          <Grid container alignItems="center" justifyContent="flex-start" marginLeft="20px">
            <Grid item>
              <PersonIcon style={{ fontSize: 60, color: '#4F4E4E', cursor: 'pointer' }} />
            </Grid>
            <Grid item>

              <Typography variant="body1" style={{ marginLeft: '15px', fontSize: '30px', color: '#4F4E4E', fontWeight: 'bold' }}>
                {detail.nickName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body5" style={{ marginLeft: '4rem', fontSize: '20px', color: '#7C7C7C' }}>
                모집인원 {detail.numberOfPeople}
              </Typography>

            </Grid>
            <Grid item style={{ marginLeft: 'auto', paddingRight: '2rem' }}>
              <ButtonGroup variant="text" aria-label="outlined button group">
                <Button onClick={deleteArticle} style={{ color: '#000000' }}>삭제</Button>
                <Button onClick={createArticleComplain} style={{ color: '#000000' }}>신고하기</Button>
              </ButtonGroup>
            </Grid>
          </Grid>

          <Grid container alignItems="center" justifyContent="flex-start" marginTop="20px" marginLeft="20px">

            <Grid item>
              <Typography variant="body1" style={{ marginLeft: '15px', fontSize: '30px', color: '#4F4E4E', fontWeight: 'bold' }} align="left">
                {detail.title}
              </Typography>
              <Typography style={{ marginLeft: '15px', fontSize: '30px', color: '#4F4E4E' }} align="left">
                {detail.content}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justifyContent="flex-start" marginTop="20px" marginLeft="20px">

            <Grid container direction="row" alignItems="center" justifyContent="flex-start" marginTop="2rem">
              <Grid item>
                <img src={BoxImg} alt="" />
              </Grid>
              <Grid item>
                <Typography variant="body1" style={{ fontWeight: "bold", marginLeft: '15px', fontSize: '22px', color: '#4F4E4E' }}>
                  {detail.productName}
                </Typography>
                <Typography style={{ marginLeft: '15px', textAlign: 'left', fontSize: '20px', color: '#757474' }}>
                  인당 {detail.cost / detail.numberOfPeople} 원
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" marginTop="7rem">
            <Grid item>

              <Button
                variant="contained"
                sx={{
                  fontSize: '18px',
                  width: '200px',
                  height: '60px',
                }}
                onClick={handleButtonClick}
              >공동구매 참여하기
              </Button>
              {isPopupVisible && (
                <Popup>
                  <PopupContent>
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
            </Grid>
          </Grid>
        </Container>

      </Grid>




    </>
  );
}

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw; 
  max-width: 600px;
  z-index: 2;
`;

const PopupContent = styled.div`
  background: white;
  padding: 1vw; 
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  input {
    width: 100vw; 
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
  font-size: 2.4vw; 
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  padding: 1vw; 
`;

const NoteInput = styled.input`
    width: 10vw; 
`;

const SendButton = styled.button`
  width: 37vw; 
  height: 54px;
  border-radius: 4px;
  background: var(--gray-100, #e1e1e1);
`;
