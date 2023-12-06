import React, { useState } from 'react';
import styled from 'styled-components';
import sendmessage from '../../assets/sendmessage.png'

export default function InputComment() {

    const [isPopupVisible, setPopupVisibility] = useState(false);

    const handleInputClick = () => {
        setPopupVisibility(true);
    };

    const handleSendMessageClick = () => {
        // Handle sending the message
        // You can implement the logic to send the message here
        setPopupVisibility(false);
    };

    return (
        <InputBox>
            <Input
                type="text"
                placeholder="내용을 입력하세요"
                onClick={handleInputClick}
            />
            <img src={sendmessage} alt="sendmessage" style={{ width: '56px', height: '67', position: 'absolute', marginLeft: '80rem' }} />
            {isPopupVisible && (
                <Popup>
                    <PopupContent>
                        <Title>쪽지 보내기</Title>
                        <div style={{display: 'flex', flexDirection:'column', padding: '1rem'}}>
                            <p>내용</p>
                            <input placeholder="Type your message here"></input>
                        </div>
                        <SendButton onClick={handleSendMessageClick}>
                            확인
                        </SendButton>
                    </PopupContent>
                </Popup>
            )}
        </InputBox>
    )
}

const InputBox = styled.div`
    display: flex;
    flex-direction: row;
    padding: 13rem 2rem 0rem 2rem;
    width: 95%;

`;


const Input = styled.input`
    width: 95%;
    height: 60px;
    flex-shrink: 0;
    border-radius: 15px;
    background: #F3F1F1;
    border: none;
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 25%;
  width: 793px;
  height: 300px;
`;

const PopupContent = styled.div`
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction:column;

  input {
    width: 80%;
    height: 120px;
    border: none;
    border-radius: 5px;
    padding: 5px;
    margin-right: 10px;
    border: 1px solid #ccc;
    margin: 0 auto;
  }
`;


const Title = styled.div`
    width: 209px;
    flex-shrink: 0;
    color: var(--black, #000);
    font-family: HeadlandOne;
    font-size: 28.43px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    padding: 1rem;
`;


const SendButton = styled.button`
    display: flex;
    width: 186px;
    height: 54px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border-radius: 4px;
    background: var(--gray-100, #E1E1E1);
`;

