import { css } from 'styled-components';
import { border, font, headerFont, mainText, regularFont, scrollbar } from './variables';
import { inLineSnippet, snippet } from './snippets';

export const markdown = css`
    h1 {
        ${headerFont};
        margin-bottom: 15px;
    }

    h2 {
        ${headerFont};
        font-size: 22px;
        margin-bottom: 15px;
    }

    h3 {
        ${headerFont};
        font-size: 16px;
        margin-bottom: 15px;
    }

    h4 {
        ${headerFont};
        font-size: 12px;
        margin-bottom: 15px;
    }

    p {
        ${regularFont};
        margin: 30px 0;

        code {
            ${inLineSnippet};
        }
    }

    ${snippet};

    pre {
        padding: 25px !important;
        border-radius: 8px;

        code {
            ${font.code};
        }
    }

    img {
        width: 100%;
    }
`;

export const markdownform = css`
    input {
        ${font.bold};
        font-size: 12px;
        color: ${mainText};
        background: transparent;
        border: 1px solid ${border};
        border-radius: 8px;
        width: 100%;
        padding: 10px 25px;

        &:focus {
            outline: 0;
        }
    }

    textarea {
        ${font.code};
        font-size: 12px;
        color: ${mainText};
        background: transparent;
        border: 1px solid ${border};
        border-radius: 8px;
        width: 100%;
        padding: 25px;
        resize: vertical;
        ${scrollbar};

        &:focus {
            outline: 0;
        }

        &::-webkit-resizer {
            display: none;
        }
    }
`;
