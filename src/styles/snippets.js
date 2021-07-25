import theme from 'styled-theming';
import { css } from 'styled-components';
import { border, color, font, secondaryBackground, scrollbar } from './variables';

export const titlebar = theme('theme', {
    light: css`
        background: ${color.snippetLight};
        border-radius: 8px 8px 0 0;
        border: 1px solid ${border};
        border-bottom: 0;
    `,
    dusk: css`
        background: ${color.snippetDark};
        border-radius: 8px 8px 0 0;
        border: 1px solid ${border};
        border-bottom: 0;
    `,
    dark: css`
        background: ${color.snippetDusk};
        border-radius: 8px 8px 0 0;
        border: 1px solid ${border};
        border-bottom: 0;
    `,
});

export const inLineSnippet = theme('theme', {
    light: css`
        background: #fbfcfc;
        border: 1px solid ${border};
        border-radius: 4px;
        padding: 1px 4px;
        ${font.code};
        font-weight: bold;
    `,
    dusk: css`
        background: ${secondaryBackground};
        border: 1px solid ${border};
        border-radius: 4px;
        padding: 1px 4px;
        ${font.code};
    `,
    dark: css`
        background: ${secondaryBackground};
        border: 1px solid ${border};
        border-radius: 4px;
        padding: 1px 4px;
        ${font.code};
    `,
});

export const snippet = theme('theme', {
    light: css`
        pre {
            margin: 0;
            font-size: 11px;
            line-height: 24px;
            background: ${color.snippetLight};
            border-radius: 0 0 8px 8px;
            border: 1px solid ${border};
            ${scrollbar};

            code {
                ${font.code};

                .linenumber {
                    width: 40px;
                    opacity: 0.3;
                }
            }
        }
    `,
    dusk: css`
        pre {
            margin: 0;
            font-size: 11px;
            line-height: 24px;
            background: ${color.snippetDark};
            border-radius: 0 0 8px 8px;
            border: 1px solid ${border};
            ${scrollbar};

            code {
                ${font.code};

                .linenumber {
                    width: 40px;
                }
            }
        }
    `,
    dark: css`
        pre {
            margin: 0;
            font-size: 11px;
            line-height: 24px;
            background: ${color.snippetDusk};
            border-radius: 0 0 8px 8px;
            border: 1px solid ${border};
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
