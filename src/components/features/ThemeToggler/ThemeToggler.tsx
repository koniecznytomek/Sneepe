import React from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getTheme, setTheme } from '../../../slices/theme/themeSlice';

// assets
import { IconDark, IconLight } from '../../../assets/icons/Icons';

// styles
import { Container } from './ThemeToggler.style';

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
            <span onClick={() => handleToggler()}>{theme === 'light' ? <IconLight /> : <IconDark />}</span>
        </Container>
    );
};

export default ThemeToggler;
