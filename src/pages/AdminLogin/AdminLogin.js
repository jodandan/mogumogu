import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Backbutton } from '../../assets/Backbutton_icon.svg'

export default function Admin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log('ID:', id, 'PASSWORD:', password);
  };
  return (
    <div>
      <HeaderBox>
        <div>헤더자리</div>
      </HeaderBox>
      <div style={{ padding: '2rem' }}>
        <div>
          <BackButton>
            <Backbutton />
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
          <div style={{ paddingTop: '2rem' }}>
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          </div>
        </LoginBox>
      </div>
    </div>
  )
}

const HeaderBox = styled.div`
    width: 100%;
    height: 5rem; 
    border: 1px solid blue;
`;

const BackButton = styled.button`
    stroke: #555454;
    background-color: white;
    border: none;
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
    width: 50%;
    height: 50%; 
    margin: 0 auto;
    margin-top: 2rem;

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
    width: 30rem;
    height: 44px;
    padding: 0px 20px;
    align-items: center;
    gap: 31px;
    flex-shrink: 0;
    border-radius: 4px;
    border: 1px solid var(--gray-300, #A6A6A6); 
`;

const LoginButton = styled.button`
    display: flex;
    width: 30rem;
    height: 54px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 4px;
    background: #004E96;
    color: white;
    margin: 0 auto;
    cursor: pointer;
`;