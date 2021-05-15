import styled from 'styled-components';
import { mainText } from '../../../../styles/variables';
import { titlebar } from '../../../../styles/snippets';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  padding: 0 0 0 0;

  .file {
    grid-row: 1;
    grid-column: 1 / -1;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 25px;

    .title-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      padding: 0 25px;

      ${titlebar};

      .title {
        p {
          font-family: 'SF-Bold', monospace;
          font-size: 10px;
          line-height: 12px;
          color: ${mainText};
        }
      }

      .options {
        cursor: pointer;
      }
    }
  }

  .file-edit {
    grid-row: 1;
    grid-column: 1 / -1;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .hidden {
    opacity: 0;
  }
`;
