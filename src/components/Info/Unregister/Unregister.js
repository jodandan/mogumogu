import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';






const defaultTheme = createTheme();

export default function Unregister() {
  const navigate = useNavigate()
  
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.delete(`http://dana-seo.shop/api/user/delete?userId=${userId}`, {
      
      });
  
      if (response.status === 200) {
        console.log('회원 탈퇴 성공:', response.data);
        setOpenSnackbar(true); // Snackbar 열기
        localStorage.removeItem('token');
        localStorage.removeItem('userId');  // 로컬 스토리지 비우기
        setTimeout(() => {
          navigate('/'); // 2초 후에 홈으로 이동
        }, 2000);
      } else {
        console.error('회원 탈퇴 요청 실패:', response.data);
      }
    } catch (error) {
      console.error('회원 탈퇴 요청 실패:', error);
    }
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Avatar sx={{ m: 1}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원 탈퇴
          </Typography>
          <Box sx={{ mt: 2 }} >
          <Typography color="#757575">
          작성하신 게시글과 댓글은 삭제되지 않습니다. <br/>
          탈퇴 후 모든 정보는 되돌릴 수 없습니다.
          </Typography>
          </Box>
          
          <Box sx={{ mt: 2 }}component="form" noValidate onSubmit={handleSubmit} >
            <Grid container spacing={2}>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
             확인
            </Button>
            
          </Box>
        </Box>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={2000} // 2초 후에 자동으로 사라짐
        onClose={handleCloseSnackbar}
        message="탈퇴가 완료되었습니다." // Snackbar 메시지 설정
        key="snackbar"
      />
        
      </Container>
    </ThemeProvider>
  );
}