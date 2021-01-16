import styled from 'styled-components';
import { primaryBackground, border } from '../../../styles/variables';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 300px;
  border-right: 1px solid ${border};
  background: ${primaryBackground};
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
