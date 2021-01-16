import { css } from 'styled-components';
import theme from 'styled-theming';

export const color = {
  white: '#fff',
  black: '#454545',
  blue: '#73aeea',
  lightBlue: '#F6FAFE',
  red: '#e85751',
  yellow: '#FCE8C8',

  darkGrey: '#2f2f2f',
  darkDusk: '#2A2C34',

  lightGrey: '#fbfcfc',
  lightDusk: '#2B2D35',

  hoverGrey: '#333333',
  hoverDusk: '#30323B',

  snippetLight: '#fbfcfc',
  snippetDark: '#333',
  snippetDusk: '#2B2D35',
};

export const mainText = theme('theme', {
  light: `${color.black}`,
  dark: `${color.white}`,
  dusk: `${color.white}`,
});

export const font = {
  light: css`
    font-family: 'SF-Light', monospace;
  `,
  medium: css`
    font-family: 'SF-Medium', monospace;
  `,
  bold: css`
    font-family: 'SF-Bold', monospace;
  `,
  code: css`
    font-family: 'Courier', monospace;
  `,
};

export const headerFont = css`
  ${font.bold};
  color: ${mainText};
`;

export const regularFont = css`
  ${font.light};
  color: ${mainText};
  font-size: 12px;
  line-height: 22px;
`;

export const primaryBackground = theme('theme', {
  light: `${color.white}`,
  dark: `${color.darkGrey}`,
  dusk: `${color.darkDusk}`,
});

export const secondaryBackground = theme('theme', {
  light: `${color.white}`,
  dark: `#333`,
  dusk: `${color.lightDusk}`,
});

export const hoverBackground = theme('theme', {
  light: `${color.lightBlue}`,
  dark: `${color.hoverGrey}`,
  dusk: `${color.hoverDusk}`,
});

export const border = theme('theme', {
  light: '#EDEDED',
  dark: '#444',
  dusk: '#24262E',
});

export const counter = theme('theme', {
  light: css`
    font-size: 7px;
    padding: 3px 5px;
    border-radius: 8px;
    border: 1px solid #eaf2fa;
    color: #202020;
    background: #f6fafe;
  `,
  dark: css`
    font-size: 7px;
    padding: 3px 5px;
    border-radius: 8px;
    border: 1px solid #454545;
    color: #ccc;
    background: #383838;
  `,
  dusk: css`
    font-size: 7px;
    padding: 3px 5px;
    border-radius: 8px;
    color: #ccc;
    background: ${color.hoverDusk};
  `,
});

export const lang = theme('theme', {
  light: css`
    border: 1px solid ${border};
    background: ${color.lightGrey};
  `,
  dark: css`
    border: 1px solid ${border};
    background: #383838;
  `,
  dusk: css`
    border: 1px solid ${border};
     background: ${color.hoverDusk};
  `,
});

export const isPublic = theme('theme', {
  light: css`
    border-radius: 18px;
    background: #f6fafe;
    padding: 2px 5px;
    .lock {
      fill: #202020;
      width: 8px;
      transform: translate(2px, -3px);
    }
  `,
  dark: css`
    border: 1px solid #454545;
    border-radius: 18px;
    background: #383838;
    padding: 0 3px;
    .lock {
      fill: #ccc;
      width: 8px;
      transform: translate(2px, -3px);
    }
  `,
  dusk: css`
    border-radius: 18px;
    background: ${color.hoverDusk};
    padding: 0 3px;
    .lock {
      fill: #ccc;
      width: 8px;
      transform: translate(2px, -3px);
    }
  `,
});

export const scrollbar = theme('theme', {
  light: css`
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: none;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: ${color.blue};
    }
  `,
  dark: css`
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: none;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #666666;
    }
  `,
  dusk: css`
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: none;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #666666;
    }
  `,
});

export const deleteConfirm = css`
  .overlay {
    display: grid;
    grid-template-columns: 1fr;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.05);
    width: 100%;
    height: 100%;

    .confirm-box {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      grid-row: 1;
      grid-column: 1 / -1;
      align-self: center;
      justify-self: center;
      width: 400px;
      height: 200px;
      background: ${primaryBackground};
      z-index: 10001;

      p {
        grid-row: 1;
        grid-column: 1 / -1;
        align-self: end;
        justify-self: center;
        ${regularFont};
        color: ${mainText};
      }

      .confirm-buttons {
        display: flex;
        justify-self: center;
        grid-row: 2;
        grid-column: 1 / -1;
        padding-top: 20px;

        span.confirm-button {
          padding: 0 25px;
        }
      }
    }
  }

  span.delete {
    cursor: pointer;
    opacity: 0.99;
  }
`;
