import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BackbuttonIcon } from '../../assets/Backbutton_icon.svg'
import Header from './../../components/Header/Header';

export default function Admin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleBackButtonClick = () => {
    navigate('/');
};

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log('ID:', id, 'PASSWORD:', password);
    navigate('/adminpost');
  };
  return (
    <div>
        <Header />
      <div style={{ padding: '2rem' }}>
        <div>
          <BackButton>
            <BackbuttonIcon onClick={handleBackButtonClick} />
          </BackButton>
        </div>
        <Title>
          Admin
        </Title>
        <LoginBox>
          <div style={{ paddingLeft: '7rem' }}>
            <InputLabel>ID</InputLabel>
            <InputField type="text" value={id} placeholder="아이디를 입력해주세요" onChange={handleIdChange} />
          </div>
          <div style={{ paddingLeft: '7rem', marginTop:'3rem' }}>
            <InputLabel>Password</InputLabel>
            <InputField type="password" value={password} placeholder="비밀번호를 입력해주세요" onChange={handlePasswordChange} />
          </div>
          <LoginButtonBox>
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          </LoginButtonBox>
        </LoginBox>
      </div>
    </div>
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

