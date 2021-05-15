import React from 'react';
import { Container } from './Snippet.style';
//import useCopyToClipboard from '../../../../hooks/useCopyToClipboard';

import { useSelector } from 'react-redux';
import { getTheme } from '../../../../slices/theme/themeSlice';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { Dark, Light, Dusk } from '../../../../assets/themes/';

const Snippet = ({ text, language }: any) => {
  const theme = useSelector(getTheme);
  const lang = language && language.name.toLowerCase();

  return (
    <Container>
      <SyntaxHighlighter
        language={lang}
        style={
          {
            light: Light,
            dark: Dark,
            dusk: Dusk,
          }[theme as keyof Object]
        }
        showLineNumbers
      >
        {text}
      </SyntaxHighlighter>
    </Container>
  );
};

export default Snippet;
