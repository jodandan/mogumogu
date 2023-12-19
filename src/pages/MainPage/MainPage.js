import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Toolbar, Grid } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Guide from "../../assets/Guide.png"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import Chip from '@mui/material/Chip';
import axios from 'axios';


//검색창 스타일링
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: '2px solid #5784F7',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 3),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#5784F7',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 0),
    marginLeft: `calc(1em + ${theme.spacing(6)})`,
    marginRight: `calc(1em + ${theme.spacing(1)})`,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

const defaultTheme = createTheme();

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [posts, setPosts] = useState([]); // 게시글 상태

  const navigate = useNavigate();
   

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://dana-seo.shop:8080/api/article/getAll');
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchPosts();
  }, []);
  

  const handleEnterPress = async (event) => {
    // 엔터 키가 눌렸을 때
    if (event.key === 'Enter') {
      try {
        let response;
        // 검색어가 있는 경우와 없는 경우를 분리하여 처리
        if (searchTerm) {
          response = await axios.get(`http://dana-seo.shop:8080/api/article/search?keyword=${searchTerm}`);
        } else {
          response = await axios.get('http://dana-seo.shop:8080/api/article/getAll');
        }
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  //배너 스타일링
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#EEF2F9',
      padding: "2rem"
    },
    image: {
      maxWidth: '100%',
      height: "100%"
    },
  };


  return (
    <ThemeProvider theme={defaultTheme}>

      <Toolbar sx={{ margin: '5rem 2rem 5rem 8rem', alignItems: 'center' }}>
        <Grid></Grid>
        <Grid container justifyContent="center">
          {/* 검색창 */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              style={{ color: '#898989', margin: 'auto' }}
              placeholder="검색어를 입력하세요."
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyPress={handleEnterPress}
            />
          </Search>
        </Grid>
        {/* 아이콘 */}
        <PersonOutlineIcon
          sx={{ fontSize: '40px', color: '#6E6E6E', marginRight: "1rem" }}
          onClick={() => { navigate("/mypage") }} />
        <MailOutlineIcon
          sx={{ fontSize: '40px', color: '#6E6E6E' }}
          onClick={() => { navigate("/note") }} />
      </Toolbar>
      {/* 배너 */}
      <Grid container style={styles.container}>
        <img src={Guide} alt="" style={styles.image} />
      </Grid>

      {/* 게시글 헤더 */}
      <Grid container direction="column" justifyContent="space-around" alignItems="center">
        <Grid container style={{ fontSize: '25px', padding: '3rem 1rem 2rem 1rem', fontWeight: 'bold', color: '#414141' }}>
          <Grid item xs={4} />
          <Grid item xs={4} style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            글 목록
          </Grid>
          <Grid item xs={4} style={{ textAlign: 'center' }}>
            <Chip
              style={{ fontSize: "20px", width: "10rem", height: "3rem" }}
              icon={<DriveFileRenameOutlineTwoToneIcon fontSize='large' />}
              label="글쓰기"
              onClick={() => { navigate("/createpost") }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* 게시글 목록 */}
<Grid container justifyContent="center">
  <List sx={{ textAlign: 'center', width: '80%', margin: '1rem', bgcolor: 'background.paper' }}>
    {posts.map((post) => (
      <React.Fragment key={post.id}>
        <ListItem
          alignItems="center"
          onClick={() => {
            navigate(`/postdetail/${encodeURIComponent(post.id)}`);
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between" style={{ margin: '20px' }}>
            <Grid item xs={12} sm={6}>
              <ListItemText
                primary={
                  <Typography variant="h5" style={{ fontSize: '1.5rem' }}>
                    {post.title}
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
              <Typography variant="body5" style={{ fontSize: '20px', color: '#7C7C7C' }}>
                {post.transactionStatus === 'RECRUITOPEN' ? '모집중' : '모집 완료'}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </React.Fragment>
    ))}
  </List>
</Grid>

            
    </ThemeProvider>
  );
}
