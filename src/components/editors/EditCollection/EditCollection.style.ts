import styled from 'styled-components';
import { border, mainText } from '../../../styles/variables';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${mainText};
    font-size: 9px;
    padding: 0 15px;
    height: 44px;
    border-bottom: 1px solid ${border};
    position: relative;

    .name {
        position: relative;
        top: -2px;

        .icon {
            position: absolute;
            top: 7px;
            left: 0;
        }

        .folder {
            span {
                margin-left: 10px;
            }
        }

        form {
            transform: translate(-9px, 2px);

            input {
                font-family: 'SF-Medium', monospace;
                background: none;
                border: 1px solid ${border};
                border-radius: 10px;
                font-size: 9px;
                color: ${mainText};
                padding: 7px 30px;
                width: 285px;

                &:focus {
                    outline: none !important;
                }
            }
        }
    }

    .options {
        display: flex;
        position: absolute;
        top: 15px;
        right: 15px;

        span {
            cursor: pointer;
            padding: 0 5px;
        }
    }
`;
