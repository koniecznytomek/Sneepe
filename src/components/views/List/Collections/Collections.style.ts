import styled from 'styled-components';
import { mainText } from '../../../../styles/variables';

export const Container = styled.div`
  height: 100%;

  ul {
    display: flex;
    flex-direction: column;
    height: 100%;

    li.nofound {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: ${mainText};
      opacity: 0.3;
    }
  }
`;
