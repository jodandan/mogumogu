//하나의 게시물항목
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Pagination.css';

const NoteListItem = ({ note }) => {
    return (
        <ul>
            <StyledLink to={`/note/${note.id}`}>
                <li key={note.id}>
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
`;
