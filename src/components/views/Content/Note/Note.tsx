import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from './Note.style';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Dark, Light, Dusk } from '../../../../assets/themes/';
import { themeSelector } from '../../../../slices/theme/themeSlice';

interface Props {
  text: string;
}

const Note = ({ text }: Props) => {
  const theme = useSelector(themeSelector);

  const renderers = {
    code: ({ language, value }: any) => {
      return (
        <SyntaxHighlighter
          style={
            {
              light: Light,
              dark: Dark,
              dusk: Dusk,
            }[theme as keyof Object]
          }
          language={language}
          children={value}
        />
      );
    },
  };

  return (
    <Container>
      <div className='note'>
        <ReactMarkdown renderers={renderers} children={text} />
      </div>
    </Container>
  );
};

export default Note;
