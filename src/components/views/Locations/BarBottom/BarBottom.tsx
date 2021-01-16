import React from 'react';
import { Container } from './BarBottom.style';
import { IconLogOut } from '../../../../assets/icons/Icons';
import ThemeToggler from '../../../features/ThemeToggler/ThemeToggler';

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
