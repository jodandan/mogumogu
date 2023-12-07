import React from 'react';
import { Container, Grid, Typography, TextField, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackbuttonIcon } from "../../assets/Backbutton_icon.svg"



export default function CreatePost() {
 
  const navigate = useNavigate();
  
  const handleBackButtonClick = () => {
    navigate('/mainpage');
  };


  
  return (
    <>
        {/* 글쓰기 페이지 헤더 */}
        <Grid container alignItems="center" padding="3.5rem">
      <Grid item >
        <BackbuttonIcon onClick={handleBackButtonClick} />
       </Grid>
        <Grid item xs>
        <Typography fontWeight="bold" fontSize="1.7rem" align="center">
          게시물 작성
        </Typography>
      </Grid>
    </Grid>
      
     
     {/* 텍스트 필드 */}
      <Container>
    <Grid container padding="3rem"  spacing={3} >
        
        <Grid item xs={12}>
          <TextField
            id="title"
            name="title"
            label="제목"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="content"
            name="content"
            label="내용"
            fullWidth
             multiline
             rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="capacity"
            name="capacity"
            label="모집 인원"
            fullWidth

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="product"
            name="product"
            label="상품명"
            fullWidth
            autoComplete="shipping postal-code"

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="price"
            name="price"
            label="금액"
            fullWidth

          />
          
        </Grid>
        
        </Grid>
    
   {/* 확인 버튼 */}
    <Grid container justifyContent="center" marginTop="2.5rem">
      <Grid item>
        <Button 
          style={{ backgroundColor:"#004E96", fontSize: "18px", width: "12rem" }}
          variant="contained" 
         
        >
          등록
        </Button>
      </Grid>
    </Grid>
  
      
      </Container>
    </>
  );
}