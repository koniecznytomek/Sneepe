import styled from 'styled-components';
import { color, font, mainText, primaryBackground } from '../../../styles/variables';

export const Container = styled.div`
    .add {
        display: flex;
        justify-content: space-between;
        margin-bottom: 14px;
        padding-left: 30px;
        padding-right: 17px;
        height: 20px;

        .button {
            span {
                ${font.bold};
                font-size: 16px;
                display: inline-block;
                transition: all 0.5s ease;
                cursor: pointer;
                user-select: none;
            }

            span.default {
                color: ${color.blue};
            }

            span.adding {
                color: ${color.red};
                transform: rotate(45deg);
            }
        }

        .form {
            form {
                display: inline-block;

                input {
                    @extend % font-medium;
                    font-size: 11px;
                    border: 0;
                    color: ${mainText};
                    background: ${primaryBackground};
                    padding-left: 10px;

                    &:focus {
                        outline: none !important;
                    }

                    &::placeholder {
                        color: ${mainText};
                        opacity: 0.4;
                    }
                }
            }
        }
    }
`;
