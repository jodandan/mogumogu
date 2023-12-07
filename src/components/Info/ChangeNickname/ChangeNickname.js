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
  const [checkCompleted, setCheckCompleted] = React.useState(false);



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
            />
            
            </Grid>
            <Grid item xs={4}>
              <Button
                className={classes.button}
                variant="contained"
 
              >
                중복 확인
              </Button>
            </Grid>
          </Grid>
          
          <Box paddingTop={6} sx={{ mt: 2 }} component="form" noValidate >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!checkCompleted}
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