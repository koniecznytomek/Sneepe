import styled from 'styled-components';
import { border, primaryBackground } from '../../../../styles/variables';

export const Container = styled.div`
    position: fixed;
    bottom: 0;
    width: 300px;
    border-top: 1px solid ${border};
    border-right: 1px solid ${border};
    padding: 15px;
    background: ${primaryBackground};
    display: flex;
    justify-content: space-between;

    span {
        cursor: pointer;
        user-select: none;
    }
`;
