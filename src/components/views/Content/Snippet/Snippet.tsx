import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

// hooks
//import useCopyToClipboard from '../../../../hooks/useCopyToClipboard';

// redux
import { useSelector } from 'react-redux';
import { getTheme } from '../../../../slices/theme/themeSlice';

// assets
import { Dark, Light, Dusk } from '../../../../assets/themes/';

// styles
import { Container } from './Snippet.style';

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
