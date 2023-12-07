import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';



const defaultTheme = createTheme();

export default function Unregister() {
  const navigate = useNavigate()
  
 

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}}
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
          
          <Box sx={{ mt: 2 }}component="form" noValidate >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             확인
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}