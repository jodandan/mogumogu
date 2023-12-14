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
import { InputAdornment, IconButton, Box, TextField} from '@mui/material';

import { ReactComponent as BackbuttonIcon } from '../../assets/Backbutton_icon.svg'
import Plusbutton from '../../assets/Plusbutton.png'


import dollar from '../../assets/dollar.png';
import checkmark from '../../assets/checkmark.png';
import passbook from '../../assets/passbook.png';
import { Grid } from '@mui/material';



const NoteDetailPage = ({ post }) => {
    let { noteId } = useParams();
    const [detail, setDetail] = useState([]);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const navigate = useNavigate();


    const handleBackButtonClick = () => {
        navigate('/note');
    };

    const handlePlusButtonClick = () => {
        setPopupVisibility(true);
    };

    const handlePopupOptionClick = (option) => {
        console.log(`Selected option: ${option}`);
        // 팝업 닫기
        setPopupVisibility(false);
    };

    //내 쪽지함 조회 GET API


    //게시글 쪽지함 조회 GET API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://dana-seo.shop/api/message/getArticleMessages?articleId=${noteId}`);
                console.log(response.data);
                setDetail(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, [noteId]);


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
  <List style={{  margin:"2rem 0", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} disablePadding> {/* 방향과 정렬 변경 */}
    {['입금 신청', '거래 완료', '계좌 확인'].map((text, index) => (
      <ListItem key={text} button={false} style={{ borderBottom: 'none' }}>
        <ListItemButton disableRipple style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
      <ListItemButton disableRipple style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <ListItemText primary={<Typography style={{ textAlign: 'center', fontSize: '2rem'}}>진행 현황 : 거래 승인</Typography>} />
      </ListItemButton>
    </ListItem>
  </List>
</Drawer>






<Grid container style={{ maxWidth: '100%', padding:"0 3rem"}}>
                <PostBody>
                    <ul>
                        {detail.map((post) => (
                            <Comment key={post.id}>
                                <div style={{ width: '100%', borderBottom: '1px solid #999797', padding: '20px 0px 20px 0px'}}>
                                    <div>
                                        <p style={{
                                            color: '#EDB96A',
                                            fontSize: '27px',
                                            fontStyle: 'normal',
                                            fontWeight: '700',
                                            lineHeight: 'normal',
                                        }}>{post.nickName}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p>{post.content}</p>
                                    </div>
                                </div>
                                {post.messages.map((message) => (
                                    <div key={message.id} style={{borderBottom: '1px solid #999797', padding: '20px 0px 20px 0px'}}>
                                        <p style={{
                                            color: '#338379',
                                            fontSize: '27px',
                                            fontStyle: 'normal',
                                            fontWeight: '700',
                                            lineHeight: 'normal',
                                        }}>{message.sender}</p>
                                        <p>{message.content}</p>
                                    </div>
                                ))}
                            </Comment>
                        ))}
                    </ul>
                    <Box sx={{ position: 'fixed', bottom: 10, width: 'calc(100% - 200px)', height: 'auto', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0 }}>
  <TextField
    hiddenLabel
    id="filled-hidden-label-normal"
    placeholder="댓글을 입력하세요."
    variant="filled"
    multiline
    fullWidth
    size="small"
   
    
    InputProps={{
      style: {
        height: '80px', // 텍스트 박스의 높이 조정
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      endAdornment: (
        <InputAdornment position="end">
          <IconButton >
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
    width: 20vw;
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






