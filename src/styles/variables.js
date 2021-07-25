import { css } from 'styled-components';
import theme from 'styled-theming';

export const color = {
    white: '#fff',
    black: '#454545',
    blue: '#73aeea',
    lightBlue: '#F6FAFE',
    red: '#e85751',
    yellow: '#FCE8C8',

    darkDusk: '#29314E',
    darkGraphite: '#2A2C34',

    lightDusk: '#29314E',
    lightGraphite: '#2B2D35',

    hoverDusk: '#2A3250',
    hoverGraphite: '#30323B',

    snippetLight: '#fbfcfc',
    snippetDark: '#2A3250',
    snippetDusk: '#2A2C34',
};

export const mainText = theme('theme', {
    light: `${color.black}`,
    dusk: `${color.white}`,
    dark: `${color.white}`,
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
    dusk: `${color.darkDusk}`,
    dark: `${color.darkGraphite}`,
});

export const secondaryBackground = theme('theme', {
    light: `${color.white}`,
    dusk: `${color.lightDusk}`,
    dark: `${color.lightGraphite}`,
});

export const hoverBackground = theme('theme', {
    light: `${color.lightBlue}`,
    dusk: `${color.hoverDusk}`,
    dark: `${color.hoverGraphite}`,
});

export const border = theme('theme', {
    light: '#f0f3f4',
    dusk: '#2D3859',
    dark: '#24262E',
});

export const counter = theme('theme', {
    light: css`
        font-size: 7px;
        padding: 3px 5px;
        border-radius: 8px;
        border: 1px solid ${border};
        color: #202020;
        background: #fbfbfb;
    `,
    dusk: css`
        font-size: 7px;
        padding: 3px 5px;
        border-radius: 8px;
        border: 1px solid ${border};
        color: #ccc;
        background: ${color.hoverDusk};
    `,
    dark: css`
        font-size: 7px;
        padding: 3px 5px;
        border-radius: 8px;
        color: #ccc;
        background: ${color.hoverGraphite};
    `,
});

export const lang = theme('theme', {
    light: css`
        border: 1px solid ${border};
        background: #fbfbfb;
    `,
    dusk: css`
        border: 1px solid ${border};
        background: ${color.hoverDusk};
    `,
    dark: css`
        border: 1px solid ${border};
        background: ${color.hoverGraphite};
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
    dusk: css`
        border: 1px solid ${border};
        border-radius: 18px;
        background: ${color.hoverDusk};
        padding: 0 3px;

        .lock {
            fill: #ccc;
            width: 8px;
            transform: translate(2px, -3px);
        }
    `,
    dark: css`
        border-radius: 18px;
        background: ${color.hoverGraphite};
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
            width: 10px;
            height: 7px;
        }

        &::-webkit-scrollbar-track {
            border-radius: 10px;
            background: none;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            border: 1px solid #dbdbdb;
            background: #e5e5e5;
        }
    `,
    dusk: css`
        &::-webkit-scrollbar {
            width: 10px;
            height: 7px;
        }

        &::-webkit-scrollbar-track {
            border-radius: 10px;
            background: none;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            border: 1px solid #272c40;
            background: #484d61;
        }
    `,
    dark: css`
        &::-webkit-scrollbar {
            width: 10px;
            height: 7px;
        }

        &::-webkit-scrollbar-track {
            border-radius: 10px;
            background: none;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            border: 1px solid #24262e;
            background: #454545;
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
`;
