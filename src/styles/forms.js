import { css } from 'styled-components';
import theme from 'styled-theming';
import { color, font, mainText, scrollbar } from './variables';
import { titlebar } from './snippets';

export const editbuttons = theme('theme', {
  light: css`
    span.save {
      color: #567995;
      background: #e3f1fc;
      border: 1px solid #c5ddf0;
    }

    span.delete {
      color: #797d7f;
      background: #fdedec;
      border: 1px solid #fadbd8;
    }

    span.cancel {
      color: #797d7f;
      background: ${color.lightGrey};
      border: 1px solid #f0f3f4;
    }
  `,
  dark: css`
    span.save {
      color: #fff;
      background: #5dade2;
      border: 1px solid #5dade2;
    }

    span.delete {
      color: #fff;
      background: #313131;
      border: 1px solid #313131;
    }

    span.cancel {
      color: #fff;
      background: #313131;
      border: 1px solid #313131;
    }
  `,
  dusk: css`
    span.save {
      color: #fff;
      background: #5dade2;
      border: 1px solid #5dade2;
    }

    span.delete {
      color: #fff;
      background: ${color.darkDusk};
      border: 1px solid ${color.darkDusk};
    }

    span.cancel {
      color: #fff;
      background: ${color.darkDusk};
      border: 1px solid ${color.darkDusk};
    }
  `,
});

export const snippetBg = theme('theme', {
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

export const editor = css`
  .title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${titlebar};
    height: 50px;
    padding: 0 25px;

    .title {
      input {
        font-family: 'SF-Bold', monospace;
        font-size: 10px;
        line-height: 10px;
        color: ${mainText};
        background: transparent;
        border: 0;
        padding: 0;
        margin: 0;
        transform: translateY(-1px);
        &:focus {
          outline: none !important;
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

  .form-buttons {
    display: flex;
    justify-content: flex-end;
    margin: 25px;

    span {
      display: block;
      padding: 12px 20px;
      border-radius: 2px;
      margin-left: 10px;
      cursor: pointer;
      font-size: 6px;
      ${font.bold};
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      z-index: 10;
    }

    ${editbuttons};
  }
`;
