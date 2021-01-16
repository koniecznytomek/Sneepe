import styled from 'styled-components';
import { mainText, primaryBackground } from '../../../styles/variables';

export const Container = styled.div`
  form {
    input {
      border: 0;
      border-radius: 9px;
      background: ${primaryBackground};
      padding: 8px 25px;
      color: ${mainText};
      font-size: 10px;
      width: 270px;

      &:focus {
        outline: none;
      }
    }
    
    span.icon {
      position: relative;
      left: 15px;
      top: 1px;
      z-index: 3;
      opacity: 1;
    }
  }
`;
