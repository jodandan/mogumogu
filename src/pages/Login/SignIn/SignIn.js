import React,{useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux'; 
import { login } from "../../../redux/userSlice"
import axios from 'axios';


const defaultTheme = createTheme();

export default function SignIn() {

  const [errorMessage, setErrorMessage] = useState("");
  
  const dispatch = useDispatch();

  const handleSubmit = async (event) => { 
    event.preventDefault();
    const data = new FormData(event.currentTarget);


    const username = data.get('email');
    const password = data.get('password');

    

    // API 요청
    try {
      const response = await axios.post('http://dana-seo.shop:8080/api/user/login', {
        username: username,
        password: password
        
      });
      console.log({username, password});
      console.log(response.data); // 응답 확인

      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('token', response.data.token);
      console.log(localStorage.getItem('userId')); // 로컬 스토리지에 저장된 userId 출력
      console.log(localStorage.getItem('token')); // 로컬 스토리지에 저장된 token 출력
      
      dispatch(login({ token: response.data.token, userId: response.data.userId }));
      
       navigate("/mainpage")
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("아이디 또는 비밀번호를 다시 확인해주세요.");
      }
      console.error(error); // 에러 출력
    }
  };

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage:`url(${require("../../../assets/LoginImg.png")})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: "5rem 0"
         
            }}
          >
           
            <Typography component="h1" variant="h4" style={{ fontWeight: 'bold' }}>
               Login
            </Typography>
            <Box component="form" padding="3.2rem 0" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="이메일을 입력하세요."
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호를 입력하세요"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errorMessage && (
            <Box marginTop="1rem" display="flex" justifyContent="center" marginBottom="1rem">
              <Typography color="error" align="center">
                {errorMessage}
              </Typography>
            </Box>
          )}
             <Grid marginTop="2rem">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{backgroundColor: "#004E96"}}
              >
                로그인
              </Button>
              </Grid>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" marginTop="8rem">
              <Grid item>
              <Button 
                onClick={()=>(navigate("/adminlogin"))}
                 variant="text"
                 style={{ fontWeight: 'bold',  textDecoration: 'underline'}} >
                  Admin
                  </Button>
              </Grid>
            </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}