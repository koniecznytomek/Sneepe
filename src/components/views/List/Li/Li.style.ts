import styled from 'styled-components';
import { color, border, mainText, hoverBackground, font, isPublic, lang } from '../../../../styles/variables';

export const Container = styled.div`
    li {
        border-bottom: 1px solid ${border};
        text-decoration: none;

        a {
            position: relative;
            display: block;
            padding: 25px;

            &:hover {
                background: ${hoverBackground};
            }

            &:hover > span.delete {
                visibility: visible;
            }

            span.title {
                ${font.bold};
                font-size: 12px;
                color: ${mainText};
                text-decoration: none;
                padding-bottom: 10px;
                display: block;
            }

            span.date {
                font-size: 6px;
                color: #ccc;
                display: block;
            }

            span.desc {
                font-size: 9px;
                line-height: 16px;
                padding: 5px 0;
                color: ${mainText};
                display: block;
            }

            span.public {
                position: absolute;
                top: 20px;
                right: 16px;
                ${isPublic};
            }

            span.lang {
                color: ${mainText};
                font-size: 7px;
                padding: 2px 3px;
                margin-right: 4px;
                border-radius: 3px;
                ${lang};
            }

            span.delete {
                position: absolute;
                bottom: 20px;
                right: 20px;
                visibility: hidden;
            }
        }

        .active {
            background: ${hoverBackground};
            border-left: 4px solid ${color.blue};
            padding-left: 26px;
        }
    }
`;
