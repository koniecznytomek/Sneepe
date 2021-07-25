import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { color } from '../../styles/variables';

export const blue = theme('theme', {
    light: css`
        .st0 {
            fill: #e3f1fc;
        }

        .st1 {
            fill: #74aeea;
        }
    `,
    dusk: css`
        .st0 {
            fill: none;
        }

        .st1 {
            fill: #74aeea;
        }
    `,
    dark: css`
        .st0 {
            fill: #2a2c34;
        }

        .st1 {
            fill: #74aeea;
        }
    `,
});

export const red = theme('theme', {
    light: css`
        .st0 {
            fill: #f7e0df;
        }

        .st1 {
            fill: #c66661;
        }
    `,
    dusk: css`
        .st0 {
            fill: #2f2f2f;
        }

        .st1 {
            fill: #d65555;
        }
    `,
    dark: css`
        .st0 {
            fill: #2f2f2f;
        }

        .st1 {
            fill: #d65555;
        }
    `,
});

export const Container = styled.div`
    display: inline-block;
    width: 12px;
    transform: translateY(2px);
    user-select: none;

    .folder {
        ${blue};
    }

    .gists {
        fill: ${color.blue};
    }

    .starred {
        fill: ${color.yellow};
    }

    .trash {
        fill: ${color.red};
    }

    .logout {
        fill: #f56053;
    }

    .light {
        fill: ${color.blue};
    }

    .dark {
        fill: ${color.blue};
    }

    .url {
        transform: translate(5px, -1px);
        width: 9px;
        fill: ${color.blue};
    }

    .coledit {
        width: 9px;
        fill: ${color.blue};
    }

    .coldelete {
        width: 10px;
        fill: ${color.red};
    }

    .addfile {
        width: 13px;
        fill: ${color.blue};
    }

    .addnote {
        width: 13px;
        fill: ${color.blue};
    }

    .deletegist {
        width: 13px;
        fill: ${color.red};
    }

    .confirm {
        width: 15px;
        fill: #229954;
    }

    .cancel {
        width: 11px;
        fill: #c0392b;
    }

    .search {
        width: 11px;
        fill: #ccc;
    }

    .mdview {
        width: 15px;
        fill: ${color.blue};
    }
`;
