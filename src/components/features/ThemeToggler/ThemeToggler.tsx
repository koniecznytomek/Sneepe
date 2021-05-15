import React from 'react';
import { Container } from './ThemeToggler.style';
import { useDispatch, useSelector } from 'react-redux';
import { IconDark, IconLight } from '../../../assets/icons/Icons';
import { getTheme, setTheme } from '../../../slices/theme/themeSlice';

const ThemeToggler = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  const handleToggler = () => {
    theme === 'light' && dispatch(setTheme('dark'));
    theme === 'dark' && dispatch(setTheme('dusk'));
    theme === 'dusk' && dispatch(setTheme('light'));
  };

  return (
    <Container>
      <span onClick={() => handleToggler()}>
        {theme === 'light' ? <IconLight /> : <IconDark />}
      </span>
    </Container>
  );
};

export default ThemeToggler;
