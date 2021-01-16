import styled from 'styled-components';
import {
  color,
  mainText,
  hoverBackground,
  counter,
} from '../../../../styles/variables';

export const Container = styled.div`
  margin-bottom: 55px;
  ul {
    display: flex;
    flex-direction: column;

    li {
      a {
        color: ${mainText};
        text-decoration: none;
        display: block;
        font-size: 10px;
        padding: 15px 15px 15px 30px;
        cursor: pointer;

        &:hover {
          background: ${hoverBackground};
        }

        span.name {
          margin-left: 10px;
        }

        span.counter {
          float: right;
          ${counter};
        }
      }
    }
  }

  .active {
    background: ${hoverBackground};
    border-left: 4px solid ${color.blue};
    padding-left: 26px;
  }
`;
