import styled from 'styled-components';
import { scrollbar, secondaryBackground } from '../../../styles/variables';

export const Container = styled.div`
  background: ${secondaryBackground};
  ${scrollbar};
  width: 100%;
  overflow: auto;
`;
