import React, {useState} from 'react';
import { Container, Grid, Typography, TextField, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackbuttonIcon } from "../../../assets/Backbutton_icon.svg"
import axios from 'axios';


export default function CreatePost() {
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    numberOfPeople: '',
    productName: '',
    cost: '',
  });
  
  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // 게시글 작성 api
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const data = {
      ...formData,
      userId,
      complain: 0,
    };

    try {
      const response = await axios.post('http://dana-seo.shop/api/article/create', data, {
        params: {
          userId: userId,
        },
      });
      console.log(response.data);
      navigate('/mainpage');
      alert("게시글 작성이 완료되었습니다.")
    } catch (error) {
      console.error(error);
    }
  };

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
      <form onSubmit={handleSubmit}>
    <Grid container padding="3rem"  spacing={3} >
        
        <Grid item xs={12}>
          
          <TextField
            id="title"
            name="title"
            label="제목"
            fullWidth
            onChange={handleInputChange}
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
             onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="numberOfPeople"
            name="numberOfPeople"
            label="모집 인원"
            fullWidth
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="productName"
            name="productName"
            label="상품명"
            fullWidth
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="cost"
            name="cost"
            label="금액"
            fullWidth
            onChange={handleInputChange}
         />
          
        </Grid>
        
        </Grid>
    
   {/* 확인 버튼 */}
    <Grid container justifyContent="center" marginTop="2.5rem">
      <Grid item>
        <Button 
          style={{ backgroundColor:"#004E96", fontSize: "18px", width: "12rem" }}
          variant="contained" 
          type="submit"
        >
          등록
        </Button>
      </Grid>
    </Grid>
  
        </form>
      
      </Container>
    </>
  );
}