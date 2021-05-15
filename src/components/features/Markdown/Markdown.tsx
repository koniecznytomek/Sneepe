import React from 'react';
import { useSelector } from 'react-redux';
import { getTheme } from '../../../slices/theme/themeSlice';
import { Dark, Light, Dusk } from '../../../assets/themes';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';

interface Props {
  text: string;
}

const Markdown = ({ text }: Props) => {
  const theme = useSelector(getTheme);

  const renderers = {
    code: ({ language, value = 'code' }: any) => {
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

  return <ReactMarkdown renderers={renderers} children={text} />;
};

export default Markdown;
