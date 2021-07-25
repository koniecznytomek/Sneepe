import React from 'react';

// components
import ThemeToggler from '../../../features/ThemeToggler/ThemeToggler';

// assets
import { IconLogOut } from '../../../../assets/icons/Icons';

// styles
import { Container } from './BarBottom.style';

const BarBottom = () => {
    return (
        <Container>
            <span>
                <IconLogOut />
            </span>
            <span>
                <ThemeToggler />
            </span>
        </Container>
    );
};

export default BarBottom;
