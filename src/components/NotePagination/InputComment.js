import React, { useState } from 'react';
import styled from 'styled-components';
import sendmessage from '../../assets/sendmessage.png';

export default function InputComment() {
    const [isPopupVisible, setPopupVisibility] = useState(false);

    const handleInputClick = () => {
        setPopupVisibility(true);
    };

    const handleSendMessageClick = () => {
        setPopupVisibility(false);
    };

    return (
        <InputBox>
            <Input
                type="text"
                placeholder="내용을 입력하세요"
                onClick={handleInputClick}
            />
            <Img
                src={sendmessage}
                alt="sendmessage"
            />
            {isPopupVisible && (
                <Popup>
                    <PopupContent>
                        <Title>쪽지 보내기</Title>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                            <p>내용</p>
                            <NoteInput placeholder="Type your message here" style={{width:'34vw'}}></NoteInput>
                        </div>
                        <SendButton onClick={handleSendMessageClick}>확인</SendButton>
                    </PopupContent>
                </Popup>
            )}
        </InputBox>
    );
}

const Img = styled.img`
    width:56px; 
    height: 67px;
    position: absolute; 
    right: 60px;
`

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vw; 
  width: 92vw; 
  max-width: 600px;
`;

const Input = styled.input`
  position: relative;
  width: 92vw; 
  height: 60px;
  border-radius: 15px;
  background: #f3f1f1;
  border: none;
  padding: 0.5vw; 
  margin-bottom: 1vw; 
`;

const SendButton = styled.button`
  width: 37vw; 
  height: 54px;
  border-radius: 4px;
  background: var(--gray-100, #e1e1e1);
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw; 
  max-width: 600px;
`;

const PopupContent = styled.div`
  background: white;
  padding: 1vw; 
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  input {
    width: 100vw; 
    height: 12vw; 
    border: none;
    border-radius: 5px;
    padding: 0.5vw; 
    margin-bottom: 1vw; 
    border: 1px solid #ccc;
  }
`;

const Title = styled.div`
  width: 100vw; 
  flex-shrink: 0;
  color: var(--black, #000);
  font-family: HeadlandOne;
  font-size: 2.8vw; 
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  padding: 1vw; 
`;

const NoteInput = styled.input`
    width: 10vw; 
`;

