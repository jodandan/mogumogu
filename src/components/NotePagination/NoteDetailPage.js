//하나의 게시물을 클릭했을때 나오는 페이지
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header/Header';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment, IconButton, Box, TextField } from '@mui/material';

import { ReactComponent as BackbuttonIcon } from '../../assets/Backbutton_icon.svg'
import Plusbutton from '../../assets/Plusbutton.png'


import dollar from '../../assets/dollar.png';
import checkmark from '../../assets/checkmark.png';
import passbook from '../../assets/passbook.png';
import { Grid } from '@mui/material';



const NoteDetailPage = ({ post }) => {
    let { noteId } = useParams();
    const [status, setStatus] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const [detail, setDetail] = useState([]);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const navigate = useNavigate();


    const handleBackButtonClick = () => {
        navigate('/note');
    };

    const handlePlusButtonClick = () => {
        setPopupVisibility(true);
    };

    const handlePopupOptionClick = async (option) => {
        console.log(`Selected option: ${option}`);

        if (option === '입금 신청') {
            axios.patch(`http://dana-seo.shop:8080/api/article/deposit?articleId=${noteId}`)
                .then(() => {
                    alert("입금이 완료되었습니다.");
                    // 페이지 새로 고침으로 데이터 재 생성
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error updating article status:', error);
                });
        }
        else if (option === '거래 완료') {
            try {
                if (status && status.length > 0 && status[0].transactionStatus === 'RECRUITCLOSED' || 'COMPLETED' || 'FINAL') {
                    await axios.patch(`http://dana-seo.shop:8080/api/article/transactionComplete?articleId=${noteId}`);
                    alert("확인되었습니다.");


                    // 페이지 새로 고침으로 데이터 재 생성
                        window.location.reload();

                    // 팝업 닫기
                    setPopupVisibility(false);
                } else {
                    alert("입금 신청을 먼저 완료하세요.");
                }
            } catch (error) {
                console.error('Error updating article status:', error);
            }
        }

        else if (option === '계좌 확인') {
            // 가상의 계좌번호를 alert 창으로 보여줍니다.
            alert('가상의 계좌번호: 123-456-789');
        }

        // 팝업 닫기
        setPopupVisibility(false);
    };

    //게시글 쪽지함 조회 GET API
    useEffect(() => {
        const fetchPosts = async () => {
            const userId = localStorage.getItem('userId');
            console.log(userId)
            try {
                const response = await axios.get(`http://dana-seo.shop:8080/api/message/getArticleMessages?articleId=${noteId}&userId=${userId}`);
                console.log(response.data);
                setDetail(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, [noteId]);


    const handleSendMessageClick = async () => {
        const userIdFromLocalStorage = localStorage.getItem('userId');

        if (!userIdFromLocalStorage) {
            console.error('UserId not found in local storage');
            return;
        }

        // 로컬 스토리지에서 닉네임 가져오기
        const nicknameFromLocalStorage = localStorage.getItem('nickname');

        // receiver 변수 초기화
        let receiver = '';

        // detail 배열의 길이가 0보다 큰 경우에만 처리
        if (detail.length > 0) {
            // detail 배열의 첫 번째 요소부터 비교 시작
            let index = 0;
            while (index < detail.length) {
                // detail 배열의 sender와 로컬 스토리지의 닉네임 비교
                if (detail[index].receiver === nicknameFromLocalStorage) {
                    // sender가 같은 경우, 다음 요소로 이동하여 다시 비교
                    index++;
                } else {
                    // sender가 다른 경우, 해당 sender를 receiver로 정의하고 반복문 종료
                    receiver = detail[index].receiver;
                    break;
                }
            }
        }


        const messageData = {
            articleId: noteId,
            content: messageContent,
            receiver: receiver,
        };

        console.log("receiver", receiver);
        try {
            await axios.post(`http://dana-seo.shop:8080/api/message/create?userId=${userIdFromLocalStorage}`, messageData);
            setPopupVisibility(false);
            alert('쪽지가 전송되었습니다.');

            // 페이지 새로 고침으로 데이터 재 생성
            window.location.reload();


        } catch (error) {
            console.error('Error sending message:', error);
        }
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
                    </PlusButtonBox>
                </TitleBox>
                <Drawer anchor="top" open={isPopupVisible} onClose={() => setPopupVisibility(false)} style={{ margin: '2rem' }}> {/* margin 추가 */}
                    <List style={{ margin: "2rem 0", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} disablePadding> {/* 방향과 정렬 변경 */}
                        {['입금 신청', '거래 완료', '계좌 확인'].map((text, index) => (
                            <ListItem key={text} button={false} style={{ borderBottom: 'none' }}>
                                <ListItemButton onClick={() => handlePopupOptionClick(text)} disableRipple style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <ListItemIcon>
                                        {index === 0 && <img src={dollar} alt='dollar' style={{ width: '3vw', height: '3vw', padding: '1vw' }} />}
                                        {index === 1 && <img src={checkmark} alt="Checkmark Icon" style={{ width: '3vw', height: '3vw', padding: '1vw' }} />}
                                        {index === 2 && <img src={passbook} alt="Passbook Icon" style={{ width: '3vw', height: '3vw', padding: '1vw' }} />}
                                    </ListItemIcon>
                                    <ListItemText primary={<Typography style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>{text}</Typography>} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem button={false} style={{ borderBottom: 'none' }}>
                            <ListItemButton disableRipple style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {/* 거래 진행 현황 */}
                                <ListItemText primary={<Typography style={{ textAlign: 'center', fontSize: '2rem' }}>진행 현황:
                                {detail.transactionStatus === 'RECRUITOPEN' && '모집중'}
                                {detail.transactionStatus === 'RECRUITCLOSED' && '모집마감'}
                                {detail.transactionStatus === 'APPROVED' && '거래 승인'}
                                {detail.transactionStatus === 'COMPLETED' && '거래 완료'}
                                {detail.transactionStatus === 'FINAL' && '거래최종완료'}

                                {detail.length > 0 ? (detail[0].transactionStatus === 'RECRUITOPEN' ? '모집중' : '모집마감') : ''}</Typography>} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>






                <Grid container style={{ maxWidth: '100%', padding: "0 3rem" }}>
                    <PostBody>
                        {/* <ul>
  {detail.length > 0 && detail.map((post) => (
    <Comment key={post.id}>
      
      <div style={{ width: '100%', borderBottom: '1px solid #999797', padding: '20px 0px 20px 0px' }}>
        <div>
          <p style={{
            color: post.userId === localStorage.getItem('userId') ? '#EDB96A' : '#338379',
            fontSize: '27px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
          }}>{post.sender}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>{post.content}</p>
        </div>
      </div>

    
{post.messages && post.messages.map((message) => {
  

  return (
    <div key={message.id} style={{ borderBottom: '1px solid #999797', padding: '20px 0px 20px 0px' }}>
      <p style={{
        color: localStorage.getItem('userId') === message.senderId ? '#EDB96A' : '#338379',
        fontSize: '27px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 'normal',
      }}>{message.sender}</p>
      <p>{message.content}</p>
    </div>
  );
})}

    </Comment>
  ))}
</ul> */}
                        <ul>
                            {detail.length > 0 && detail.map((post) => {
                                const userIdFromLocalStorage = localStorage.getItem('userId');
                                const userIdFromPost = post.userId;
                                // console.log("post.userId:", userIdFromPost);
                                // console.log("localStorage userId:", userIdFromLocalStorage);

                                return (
                                    <Comment key={post.id}>
                                        <div style={{ width: '100%', borderBottom: '1px solid #999797', padding: '20px 0px 20px 0px' }}>
                                            <div>
                                                <p style={{
                                                    color: parseInt(userIdFromLocalStorage) === parseInt(userIdFromPost) ? '#EDB96A' : '#338379',
                                                    fontSize: '27px',
                                                    fontStyle: 'normal',
                                                    fontWeight: '700',
                                                    lineHeight: 'normal',
                                                }}>{post.sender}</p>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <p>{post.content}</p>
                                            </div>
                                        </div>
                                    </Comment>
                                );
                            })}
                        </ul>




                        <Box sx={{ position: 'fixed', bottom: 10, width: 'calc(100% - 200px)', height: 'auto', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0 }}>
                            <TextField
                                style={{ backgroundColor: "#EAEAEA", }}
                                hiddenLabel
                                id="filled-hidden-label-normal"
                                placeholder="내용을 입력하세요."
                                multiline
                                fullWidth
                                size="small"
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSendMessageClick();
                                    }
                                }}
                                InputProps={{
                                    style: {
                                        height: '80px', // 텍스트 박스의 높이 조정
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleSendMessageClick}>
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiFilledInput-root': {
                                        backgroundColor: 'lightgray',
                                        fontSize: '20px', // 텍스트 크기 조정
                                        '&::placeholder': {
                                            fontSize: '20px', // placeholder 크기 조정
                                            textAlign: 'center', // placeholder 가운데 정렬
                                            paddingTop: '5px', // placeholder 위쪽 여백 추가

                                        },
                                    },
                                }}
                            />
                        </Box>
                    </PostBody>
                </Grid>
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
    overflow-y: auto; /* 스크롤바를 추가하여 화면이 넘칠 때 스크롤할 수 있도록 함 */
    padding-bottom: 100px; /* 인풋창이 가려지지 않도록 하기 위한 여유 공간 */
`;

const Comment = styled.div`
    
    padding: 10px;
    p {
      margin: 3px;
    }
`;

const PlusButtonBox = styled.div`
    flex-shrink: 0;
    background-color: white;
`;

const Text = styled.div`
    color: #393939;
    font-family: Inter;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 20px;
    flex-shrink: 0;
    padding: 5px 46px 20px 46px;
    width: 20%;
`;

//인풋창



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






