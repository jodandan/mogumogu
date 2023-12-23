import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import modangBack from "../../../assets/modangBack.png"
import { ReactComponent as BackbuttonIcon } from "../../../assets/Backbutton_icon.svg";
import axios from "axios";


const defaultTheme = createTheme();

export default function SignUp() {

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  
  const handleSignUp = (event) => {
    event.preventDefault();
  
    // 이메일 도메인 제한
    if (!email.endsWith('@gachon.ac.kr')) {
      setErrorMessage('가천대 이메일을 사용해주세요.');
      return;
    }
  
    const data = {
      username: email,
      password: password,
      nickName: nickname
    };
  
    const userEmail = email; 


   localStorage.setItem('userEmail', userEmail);

    console.log(data);
  
    axios.post('http://dana-seo.shop:8080/api/join/process', data)
      .then(response => {
        console.log(response.data);
        navigate('/emailauth'); // API 요청 성공시 라우팅
      })
      .catch(error => {
        console.error(error);
      });
  };
  
 
  const handleBackButtonClick = () => {
    navigate('/');
};

  return (
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
 
          <img src={modangBack} width="60px" alt=''/>
          <Typography component="h1"  variant="h4" style={{ fontWeight: 'bold' }}>
            Sign up
          </Typography>
          
          <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
            <Grid container marginTop="1.5rem" spacing={2}>
            <Grid item xs={12}>
                이메일
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  helperText={
                    <Typography
                      variant="body2"
                      style={{ color: errorMessage ? 'red' : 'inherit' }}
                    >
                      가천대 이메일을 통해 회원가입해주세요.
                    </Typography>
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // 이메일 도메인 제한
                inputProps={{ pattern: "[a-zA-Z0-9._%+-]+@gachon\\.ac\\.kr$", title: "가천대 이메일을 사용해주세요." }}
                
                />
                
              </Grid>
              
              <Grid item xs={12} >
                닉네임
                <TextField
                  required
                  fullWidth
                  id="nickname"
                  name="nickname"
                  autoComplete="nickname" 
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </Grid>
             
              
              <Grid item xs={12}>
                비밀번호
                <TextField
                  required
                  fullWidth
                  name="password"
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
              style={{backgroundColor: "#004E96"}}
              onClick={handleSignUp}
            >
              회원가입
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}