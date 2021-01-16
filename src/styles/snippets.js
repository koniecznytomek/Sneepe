import theme from 'styled-theming';
import { css } from 'styled-components';
import {
  border,
  color,
  font,
  secondaryBackground,
  scrollbar,
} from './variables';

export const titlebar = theme('theme', {
  light: css`
    background: ${color.snippetLight};
  `,
  dark: css`
    background: ${color.snippetDark};
  `,
  dusk: css`
    background: ${color.snippetDusk};
  `,
});

export const inLineSnippet = theme('theme', {
  light: css`
    background: #fbfcfc;
    border: 1px solid ${border};
    border-radius: 4px;
    padding: 1px 2px;
    ${font.code};
  `,
  dark: css`
    background: ${secondaryBackground};
    border: 1px solid ${border};
    border-radius: 4px;
    padding: 1px 2px;
    ${font.code};
  `,
  dusk: css`
    background: ${secondaryBackground};
    border: 1px solid ${border};
    border-radius: 4px;
    padding: 1px 2px;
    ${font.code};
  `,
});

export const snippet = theme('theme', {
  light: css`
    pre {
      margin: 25px;
      font-size: 11px;
      line-height: 24px;
      ${color.snippetLight};

      ${scrollbar};
      //background: #2A314C;
      //border-radius: 4px;

      code {
        ${font.code};

        .linenumber {
          width: 40px;
          opacity: 0.3;
        }
      }
    }
  `,
  dark: css`
    pre {
      margin: 0;
      font-size: 11px;
      line-height: 24px;
      background: ${color.snippetDark};
      ${scrollbar};

      code {
        ${font.code};

        .linenumber {
          width: 40px;
        }
      }
    }
  `,
  dusk: css`
    pre {
      margin: 0;
      font-size: 11px;
      line-height: 24px;
      background: ${color.snippetDusk};
      ${scrollbar};

      code {
        ${font.code};

        .linenumber {
          width: 40px;
          color: #ccc;
        }
      }
    }
  `,
});
