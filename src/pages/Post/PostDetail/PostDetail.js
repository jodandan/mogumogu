import React from 'react';
import {  Grid, Typography, Container, Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router';
import { ReactComponent as BackbuttonIcon } from "../../../assets/Backbutton_icon.svg"
import PersonIcon from '@mui/icons-material/Person';
import BoxImg from "../../../assets/BoxImg.png"

export default function PostDetail() {
  const navigate = useNavigate();
 
  const handleBackButtonClick = () => {
    navigate('/mainpage');
};

  
  return (
    <>
     <div style={{ padding: '3rem' }}>
      <BackbuttonIcon onClick={handleBackButtonClick} />
      </div>    
       
          <Grid container padding='1rem' >
        <Container maxWidth="xl">
          
        {/* 게시글 */}
        <Grid container  alignItems="center" justifyContent="flex-start" marginLeft="20px">
  <Grid item>
    <PersonIcon  style={{ fontSize: 60, color: '#4F4E4E', cursor: 'pointer'}}/>
  </Grid>
  <Grid item>
    
    <Typography variant="body1" style={{ marginLeft: '15px', fontSize: '30px', color: '#4F4E4E', fontWeight: 'bold' }}>
      모구모구
    </Typography>
    </Grid>
    <Grid item>
    <Typography variant="body5" style={{ marginLeft: '4rem', fontSize: '20px', color: '#7C7C7C' }}>
      모집인원 3
    </Typography>
   
      </Grid>
      <Grid item style={{ marginLeft: 'auto', paddingRight:'2rem' }}>
        <ButtonGroup variant="text" aria-label="outlined button group">
          <Button style={{ color: '#000000' }}>삭제</Button>
          <Button style={{ color: '#000000' }}>신고하기</Button>
        </ButtonGroup>
      </Grid>
    </Grid>

        <Grid container alignItems="center" justifyContent="flex-start" marginTop="20px" marginLeft="20px">
        
          <Grid item>
            <Typography variant="body1" style={{ marginLeft: '15px', fontSize: '30px', color: '#4F4E4E', fontWeight: 'bold'}}  align="left">
             휴지 30롤 같이 구매해요!
            </Typography>
            <Typography style={{ marginLeft: '15px', fontSize: '30px', color: '#4F4E4E' }}  align="left">
             10롤씩 나눠 구매하실 분들 연락주세요
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="flex-start" marginTop="20px" marginLeft="20px">
        
        <Grid container direction="row" alignItems="center" justifyContent="flex-start" marginTop="2rem">
  <Grid item>
    <img src={BoxImg} alt="" />
  </Grid>
  <Grid item>
    <Typography variant="body1" style={{ fontWeight:"bold", marginLeft: '15px', fontSize: '22px', color: '#4F4E4E' }}>
      쌍용씨앤비 CODI 순수한 데코 3겹 30cm 30롤
    </Typography>
    <Typography style={{ marginLeft: '15px', textAlign: 'left', fontSize: '20px', color: '#757474' }}>
     6600원
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
    >공동구매 참여하기</Button>
  </Grid>
</Grid>
      </Container>
    
  </Grid>
     





    </>
  );
}