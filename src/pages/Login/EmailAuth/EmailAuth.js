import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import modangSide from "../../../assets/modangSide.png"
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackbuttonIcon } from "../../../assets/Backbutton_icon.svg"
import { useState } from 'react';
import axios from 'axios';

const defaultTheme = createTheme();

export default function EmailAuth() {

  const [code, setCode] = useState('');
 
  const handleSubmit = (event) => {
    event.preventDefault();
   
    const email = localStorage.getItem('userId'); 
   
    
    axios.get('http://dana-seo.shop/api/join/emails/verifications', {
      params: {
        email: email,
        code: code
      }
    })
    .then(response => {
      console.log(response.data);
      navigate('/mainpage');
    })
    .catch(error => {
      console.error(error);
      
    });
  };
   
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/signup');
};

  return (
    <ThemeProvider theme={defaultTheme}>
       <div style={{ padding: '2rem' }}>
      <BackbuttonIcon onClick={handleBackButtonClick} />
      </div>        
      <Container component="main" maxWidth="s" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <img src={modangSide} width="60px" alt=''/>
          <Grid item margin="2rem">
          <Typography component="h1"  variant="h5" style={{ fontWeight: 'bold' }}>
            이메일 인증 코드를 입력해주세요.
          </Typography>
          </Grid>

          <Grid item marginBottom="5rem">
          <Typography textAlign="center" component="h4"  variant="h5" style={{ fontSize: "20px", color: "#474747"}}>
            입력하신 이메일로 회원가입 인증 코드를 전송하였습니다.<br/>
            10분 이내에 인증 코드를 입력해주세요.
          </Typography>
          </Grid> 

         

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

              <TextField 
                id="standard-basic" 
                label="인증코드를 입력해주세요." 
                variant="standard"
                inputProps={{
                  style: { width: '350px'}
                }}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
         

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 10 }}
                    style={{ backgroundColor: "#004E96", width: '350px' }}
                  >
                    확인
                  </Button>
                </Grid>
      
          </Box>

        </Box>
     
      </Container>
    </ThemeProvider>
  );
}