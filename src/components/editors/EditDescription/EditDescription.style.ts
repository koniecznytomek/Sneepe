import styled from 'styled-components';
import { border, font, mainText, scrollbar } from '../../../styles/variables';
import { buttons, editor } from '../../../styles/forms';

export const Container = styled.div`
    padding: 25px;

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

    ${buttons};
`;
