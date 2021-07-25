import styled from 'styled-components';
import { deleteConfirm } from '../../../styles/variables';

export const Container = styled.div`
    ${deleteConfirm};

    span.cancel {
        opacity: 0.9;
    }
`;
