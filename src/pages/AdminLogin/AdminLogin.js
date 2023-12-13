import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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

  const handleSignUp = (event) => {
    event.preventDefault();
    const data = {
      username: id,
      password: password,
    };

    const userid = id;


    localStorage.setItem('userid', userid);

    console.log(data);

    axios.post('http://dana-seo.shop/api/join/process', data)
      .then(response => {
        console.log(response.data);
        navigate('/'); // API 요청 성공시 라우팅
      })
      .catch(error => {
        console.error(error);
      });
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


const BackButton = styled.button`
    stroke: #555454;
    background-color: white;
    border: none;
    cursor: pointer;
`;

const Title = styled.div`
    color: #000;
    text-align: center;
    font-family: Noto Sans;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

//=================== 로그인 CSS =======================

const LoginBox = styled.div`
    width: 50vw;
    height: 50vh; 
    margin: 0 auto;
    margin-top: 50px;
    display:flex;
    flex-direction: column;
`;

const InputLabel = styled.label`
    color: #595959;
    font-family: Noto Sans;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const InputField = styled.input`
    display: flex;
    width: 30vw;
    height: 7vh;
    padding: 0px 20px;
    align-items: center;
    flex-shrink: 0;
    border-radius: 4px;
    border: 1px solid var(--gray-300, #A6A6A6); 
`;

const LoginButton = styled.button`
    display: flex;
    width: 33vw;
    height: 7vh;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 4px;
    background: #004E96;
    color: white;
    cursor: pointer;
`;

const LoginButtonBox = styled.div`
    width: 33vw;
    margin-top: 20px;
    display:flex;
    justify-content: center;
    align-items: center;
    padding-left: 7rem;
    
`;

