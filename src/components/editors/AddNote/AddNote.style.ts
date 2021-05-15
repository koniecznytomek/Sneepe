import styled from 'styled-components';
import { buttons } from '../../../styles/forms';
import { markdown, markdownform } from '../../../styles/markdown';
import { border } from '../../../styles/variables';

export const Container = styled.div`
  margin: 0 25px;

  .note {
    ${markdownform};

    .note-title {
      margin: 25px 0;
    }

    .note-options {
      display: flex;
      justify-content: flex-end;
      height: 0;

      span {
        position: relative;
        top: 25px;
        right: 25px;
        cursor: pointer;
      }
    }

    .note-editor {
      display: flex;
      flex-direction: column;
    }

    .note-viewer {
      padding: 25px;
      border: 1px solid ${border};
      border-radius: 8px;
      min-height: 100px;
      ${markdown};
    }
  }
  ${buttons}
`;
