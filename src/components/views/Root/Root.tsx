import React from 'react';

// components
import Locations from '../../routes/Locations/Locations';
import List from '../../routes/List/List';
import Content from '../../routes/Content/Content';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';

// styles
import { ThemeProvider } from 'styled-components';
import { Container } from './Root.style';
import '../../../styles/global.scss';

const Root = () => {
    const theme = useSelector((state: RootState) => state.theme.mode);

    return (
        <>
            <ThemeProvider theme={{ theme: theme }}>
                <Container>
                    <Locations />
                    <List />
                    <Content />
                </Container>
            </ThemeProvider>
        </>
    );
};

export default Root;
