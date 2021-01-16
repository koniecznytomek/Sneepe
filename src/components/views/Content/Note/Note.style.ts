import styled from 'styled-components';
import { headerFont, regularFont } from '../../../../styles/variables';
import { inLineSnippet } from '../../../../styles/snippets';

export const Container = styled.div`
  .note {
    padding: 25px;

    h1 {
      ${headerFont};
      padding-bottom: 15px;
    }

    h2 {
      ${headerFont};
      font-size: 22px;
      padding-bottom: 15px;
    }

    h3 {
      ${headerFont};
      font-size: 16px;
      padding-bottom: 15px;
    }

    h4 {
      ${headerFont};
      font-size: 12px;
      padding-bottom: 10px;
    }

    p {
      ${regularFont};
      padding-bottom: 30px;

      code {
        ${inLineSnippet};
      }
    }

    pre {
      border-radius: 6px;
      font-size: 11px;
      line-height: 20px;
    }

    img {
      width: 100%;
    }
  }
`;
