import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button  from '@mui/material/Button';
import Grid from '@mui/system/Unstable_Grid/Grid';
import modang from "../../assets/modang.png"
import { useNavigate } from 'react-router-dom';



export default function Header() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#004E96" }}>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item style={{ flex: 1 }}></Grid>
          <Grid item style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img width="90px" src={modang} alt="" />
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ display: 'inline-block', textAlign: 'center', ml: 2, fontWeight: 'bold', flexShrink: 0 }}
              style={{ color: 'white' }}
              onClick={()=>(navigate("/mainpage"))}
            >
              MOGUMOGU
            </Typography>
          </Grid>
          <Grid item style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <ButtonGroup variant="text" aria-label="text button group" style={{ paddingRight: "1rem" }}>
              <Button 
              style={{ color: "white" }}
              onClick={()=>(navigate("/memberinfo"))}
              >
                회원정보
              </Button>
              <Button onClick={()=>(navigate("/"))} style={{ color: "white" }}>로그아웃</Button>
            </ButtonGroup>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
