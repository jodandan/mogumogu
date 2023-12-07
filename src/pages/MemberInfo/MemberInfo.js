import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ChangeNickname from '../../components/Info/ChangeNickname/ChangeNickname';
import Unrigister from '../../components/Info/Unregister/Unregister';
import { ReactComponent as BackbuttonIcon } from "../../assets/Backbutton_icon.svg"
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },

}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '2rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function MemberInfo() {

  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
 
  const navigate = useNavigate();
  
  const handleBackButtonClick = () => {
    navigate('/mainpage');
  };

  return (
    <>

    <Grid container alignItems="center" padding="2rem">
      <Grid item >
        <BackbuttonIcon onClick={handleBackButtonClick} />
       </Grid>
    <Grid item xs>
    <Typography fontWeight="bold" fontSize="1.7rem" align="center">
      회원 정보
    </Typography>
  </Grid>
</Grid>
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography fontSize="1.2rem">닉네임 변경</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ChangeNickname/>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography fontSize="1.2rem">탈퇴하기</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Unrigister />
        </AccordionDetails>
      </Accordion>
  
    </div>
    </>
  );
}