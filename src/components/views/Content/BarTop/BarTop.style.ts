import styled from 'styled-components';
import { border, secondaryBackground } from '../../../../styles/variables';

export const Container = styled.div`
    position: sticky;
    top: 0;
    z-index: 100;
    background: ${secondaryBackground};

    .bar {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 40px;
        border-bottom: 1px solid ${border};

        ul {
            display: flex;
            padding: 0 25px;

            li {
                padding: 0 10px;
                cursor: pointer;
            }
        }
    }
`;
