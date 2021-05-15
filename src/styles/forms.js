import { css } from 'styled-components';
import theme from 'styled-theming';
import { color, font, mainText, scrollbar, border } from './variables';
import { titlebar } from './snippets';

export const button = theme('theme', {
  light: css`
    span.save {
      color: #567995;
      background: #e3f1fc;
      border: 1px solid #c5ddf0;
    }

    span.cancel {
      color: #797d7f;
      background: #fbfbfb;
      border: 1px solid #f0f3f4;
    }
  `,
  dusk: css`
    span.save {
      color: #fff;
      background: #5dade2;
      border: 1px solid #5dade2;
    }

    span.cancel {
      color: #fff;
      background: ${color.lightDusk};
      border: 1px solid ${border};
    }
  `,
  dark: css`
    span.save {
      color: #fff;
      background: #5dade2;
      border: 1px solid #5dade2;
    }

    span.cancel {
      color: #fff;
      background: ${color.darkGraphite};
      border: 1px solid ${border};
    }
  `,
});

export const buttons = css`
  .buttons {
    display: flex;
    justify-content: flex-end;
    margin: 25px 0;

    span {
      display: block;
      z-index: 10;
      margin-left: 10px;
      padding: 12px 20px;
      border-radius: 2px;
      cursor: pointer;

      ${font.bold};
      font-size: 6px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    ${button};
  }
`;

export const snippetBg = theme('theme', {
  light: css`
    background: ${color.snippetLight};
  `,
  dusk: css`
    background: ${color.snippetDark};
  `,
  dark: css`
    background: ${color.snippetDusk};
  `,
});

export const editor = css`
  .title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${titlebar};
    height: 50px;
    padding: 0 25px;

    .title {
      width: 100%;
      input {
        font-family: 'SF-Bold', monospace;
        font-size: 10px;
        line-height: 10px;
        color: ${mainText};
        background: transparent;
        border: 0;
        padding: 0;
        margin: 0;
        width: 100%;
        transform: translateY(-1px);
        &:focus {
          outline: none !important;
        }
        &.error {
          color: orangered;
        }
      }
    }

    .options {
      cursor: pointer;
    }
  }

  .snippet {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;

    ${scrollbar};

    .textarea {
      grid-row: 1;
      grid-column: 1;
      transform: translate(44px, 5px);
      margin-right: 44px;

      textarea {
        width: 100%;
        background: transparent;
        border: 0;
        color: rgba(255, 255, 255, 0);
        ${font.code};
        font-size: 11px;
        line-height: 24px;
        caret-color: ${mainText};
        resize: vertical;

        &:focus {
          outline: 0;
        }

        &::-webkit-resizer {
          display: none;
        }
      }
    }

    .output {
      transform: translate(0, 0);
      grid-row: 1;
      grid-column: 1;
      ${font.code};
      border: 1px solid ${border};
      border-radius: 0 0 8px 8px;
      font-size: 11px;
      line-height: 24px;

      pre {
        margin: 0;
        padding: 0;
        ${scrollbar};
        ${snippetBg};
      }
    }
  }
`;
