import React from 'react';
import { Container } from './Note.style';
import Markdown from '../../../features/Markdown/Markdown';

interface Props {
  text: string;
}

const Note = ({ text }: Props) => {
  return (
    <Container>
      <div className='note'>
        <Markdown text={text} />
      </div>
    </Container>
  );
};

export default Note;
