import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@mui/styles";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({

  nicknameInput: {
    width: 350,
    height: 56,
    border: "1px solid #A6A6A6",
    borderRadius: 4,
  },
  errorText: {
    color: "#F03F40",
    fontSize: 15,
    fontFamily: "HeadlandOne",
    fontWeight: 400,
    lineHeight: "24",
    margin: '10px 0',
  },
  helperText: {
    color: "#757575",
    fontSize: 16,
    fontFamily: "HeadlandOne",
    fontWeight: 400,
    lineHeight: "25.60",
    margin: '10px 0',
  },
  button: {
    width: 170,
    height: 50,
    borderRadius: 4,
    border: "1px solid #A6A6A6",
  },

}));

const defaultTheme = createTheme();

function ChangeNickname() {
  const classes = useStyles();
  const [nickName, setNickname] = React.useState('');
  const [error, setError] = React.useState(null);
  const [checkCompleted, setCheckCompleted] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      nickName: data.get('nickName'),
    });
  };


  const handleCheckNickname = async () => {
    console.log('handleCheckNickname is called');
    const userId = localStorage.getItem('userId');
    console.log('userId:', userId);
    console.log('nickName:', nickName);
  
    try {
      const response = await axios.patch(`http://dana-seo.shop:8080/api/user/update?userId=${userId}`, {
        nickName: nickName,
      });
      if (response.status === 200) {
        setError(null);
        setMessage(
          <Typography variant="body2" color="primary">
            사용 가능한 닉네임입니다.
          </Typography>
        );
        setCheckCompleted(true);
        return;
      }
    
    } catch (error) {
      const status = error.response && error.response.status;
      if (status === 409) {
        setError('중복된 닉네임입니다.');
        setMessage(null);
        setCheckCompleted(false);
      } else {
        setError('닉네임 중복 확인 요청 실패');
        setMessage(null);
        setCheckCompleted(false);
      }
    }}

    const handleConfirm = () => {
     
      setMessage(
        <Typography variant="body2" color="primary">
         닉네임 변경이 완료되었습니다!
        </Typography>
      );
    };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" marginBottom={8}>
            닉네임 변경
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                style={{ fontSize: 20 }}
                className={classes.nicknameInput}
                label="닉네임을 입력해주세요"
                variant="outlined"
                id="outlined-helperText"
                value={nickName}
                error={!!error} // error 상태를 설정합니다
                helperText={error || message || " 중복되지 않은 닉네임으로 변경해주세요"} 
                onChange={(e) => {
                  setNickname(e.target.value);
                  setError(null);
                  setMessage(null);
                  setCheckCompleted(false); // 닉네임을 변경하면 중복 확인 완료 상태를 초기화
                }}
              
            />
            
            </Grid>
            <Grid item xs={4}>
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleCheckNickname}
                
              >
                중복 확인
              </Button>
            </Grid>
          </Grid>
          
          <Box paddingTop={6} sx={{ mt: 2 }} component="form" noValidate onSubmit={handleSubmit}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!checkCompleted}
              onClick={handleConfirm}
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

export default ChangeNickname;