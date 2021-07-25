import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

// components
import ReactMarkdown from 'react-markdown';

// redux
import { useSelector } from 'react-redux';
import { getTheme } from '../../../slices/theme/themeSlice';

// assets
import { Dark, Light, Dusk } from '../../../assets/themes';

type Props = {
    readonly text: string;
};

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
