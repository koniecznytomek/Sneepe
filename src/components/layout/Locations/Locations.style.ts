import styled from 'styled-components';
import { primaryBackground, border } from '../../../styles/variables';

export const Container = styled.div`
  background: ${primaryBackground};
  min-width: 300px;
  max-width: 300px;
  border-right: 1px solid ${border};
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
