import styled from 'styled-components';
import { buttons, editor } from '../../../styles/forms';
import { border, font, mainText, scrollbar } from '../../../styles/variables';
import { markdown, markdownform } from '../../../styles/markdown';

export const Container = styled.div`
    margin: 0 25px;
    .note {
        ${markdownform};

        .note-title {
            margin: 25px 0;
        }

        .note-options {
            display: flex;
            justify-content: flex-end;
            height: 0;

            span {
                position: relative;
                top: 25px;
                right: 25px;
                cursor: pointer;
            }
        }

        .note-editor {
            display: flex;
            flex-direction: column;
        }

        .note-viewer {
            padding: 25px;
            border: 1px solid ${border};
            border-radius: 8px;
            min-height: 100px;
            ${markdown};
        }
    }

    .description {
        margin: 25px 0;

        textarea {
            ${font.medium};
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
    }

    .file {
        margin: 25px 0;
        ${editor};
    }

    ${buttons};
`;
