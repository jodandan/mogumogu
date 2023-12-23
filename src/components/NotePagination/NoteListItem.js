//하나의 게시물항목
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Pagination.css';

const NoteListItem = ({ note }) => {
    return (
        <ul>
            <StyledLink to={`/note/${note.id}`}>
                <li key={note.id} 
                    style={{marginBottom: '25px'}}>
                    <p>{note.content}</p>
                    <p>{note.timestamp}</p>
                </li>
            </StyledLink>
        </ul>
    );
};

export default NoteListItem;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    color: #4F4E4E;
    font-family: Noto Sans;
    font-size: 26px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

`;