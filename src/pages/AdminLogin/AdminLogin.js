import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackbuttonIcon } from '../../assets/Backbutton_icon.svg'
import Header from './../../components/Header/Header';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import modangBack from "../../../assets/modangBack.png";
import axios from "axios";


const defaultTheme = createTheme();

export default function Admin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/');
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://dana-seo.shop/api/user/login', {
        username: 'admin_0@gmail.com',
        password: 'pwd', 
      });

      //관리자토큰 가져오기
      const adminToken = response.data.token;

      //관리자토큰 저장하기
      localStorage.setItem('adminToken', adminToken);

      //관리자페이지이동
      navigate('/adminpost');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <Header />
      <ThemeProvider theme={defaultTheme}>
        <div style={{ padding: '2rem' }}>
          <BackbuttonIcon onClick={handleBackButtonClick} />
        </div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '5'
            }}
          >

            {/* <img src={modangBack} width="60px" alt='' /> */}
            <Typography component="h1" variant="h4" style={{ fontWeight: 'bold' }}>
              Admin
            </Typography>
            <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
              <Grid container marginTop="1.5rem" spacing={2}>
                <Grid item xs={12}>
                  ID
                  <TextField
                    required
                    fullWidth
                    id="id"
                    label="이메일을 입력해주세요."
                    name="id"
                    autoComplete="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  PASSWORD
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="비밀번호를 입력해주세요."
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>

                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 6, mb: 2 }}
                style={{ backgroundColor: "#004E96" }}
                onClick={handleSignUp}
              >
                로그인
              </Button>

            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}


