import styled from 'styled-components';
import { deleteConfirm, font, color } from '../../../styles/variables';

export const Container = styled.div`
    .icon {
        display: block;
        ${font.bold};
        font-size: 15px;
        color: ${color.red};
        cursor: pointer;
        transform: rotate(45deg);
    }

    ${deleteConfirm};
`;
