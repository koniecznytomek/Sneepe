import styled from 'styled-components';
import {
  border,
  color,
  font,
  primaryBackground,
} from '../../../../styles/variables';

export const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  background: ${primaryBackground};

  .bar {
    display: flex;
    flex-direction: column;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid ${border};

      .add {
        a {
          display: block;
          ${font.bold};
          font-size: 20px;
          color: ${color.blue};
          cursor: pointer;
          transform: translate(-20px, -2px);
        }
      }
    }
  }
`;
