// TransactionPopup.js

import React from 'react';
import styled from 'styled-components';
import dollar from '../../assets/dollar.png';
import checkmark from '../../assets/checkmark.png';
import passbook from '../../assets/passbook.png';

const TransactionPopup = ({ handlePopupOptionClick }) => {
    return (
        <Popup>
            <CloseButton onClick={() => handlePopupOptionClick('close')}>❌</CloseButton>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                    <PopupOption onClick={() => handlePopupOptionClick('입금 신청')}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <img src={dollar} alt='dollar' style={{ width: '5vw', height: '5vw', padding: '1vw' }} />
                            <p style={{ textAlign: 'center' }}>입금 신청</p>
                        </div>
                    </PopupOption>
                    <PopupOption onClick={() => handlePopupOptionClick('거래 완료')}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <img src={checkmark} alt='checkmark' style={{ width: '5vw', height: '5vw', padding: '1vw' }} />
                            <p style={{ textAlign: 'center' }}>거래 완료</p>
                        </div>
                    </PopupOption>
                    <PopupOption onClick={() => handlePopupOptionClick('계좌 확인')}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <img src={passbook} alt='passbook' style={{ width: '5vw', height: '5vw', padding: '1vw' }} />
                            <p style={{ textAlign: 'center' }}>계좌 확인</p>
                        </div>
                    </PopupOption>
                </div>
                <TextBox>
                    <P>진행 현황 : 거래승인</P>
                </TextBox>
            </div>
        </Popup>
    );
};

const Popup = styled.div`
  position: absolute;
  width: 90vw;
  height: 25vh;
  flex-shrink: 0;
  top: 5vh;
  right: 5vw;
  background-color: white;
  border: 1px solid #ccc;
  background: #f0f0f0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 2;
`;

const PopupOption = styled.div`
  padding: 1vw;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const TextBox = styled.div`
  width: 20vw;
  height: 7vh;
  flex-shrink: 0;
  margin: 4vw 0 0 35vw;
  float: right;
`;

const P = styled.span`
  color: #393939;
  font-family: Inter;
  font-size: 2vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

`;

const CloseButton = styled.div`
  position: absolute;
  top: 0.5vw;
  right: 0.5vw;
  cursor: pointer;
  font-size: 1.5vw;
  color: #555;
`;


export default TransactionPopup;
