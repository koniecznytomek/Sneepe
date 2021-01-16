import styled from 'styled-components';
import { snippet } from '../../../../styles/snippets';

export const Container = styled.div`
  width: 100%;
  ${snippet};

  .copy {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;
