import React from 'react';
import { Container } from './Root.style';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import Locations from '../Locations/Locations';
import './../../../styles/global.scss';
import List from '../List/List';
import Content from '../Content/Content';

const Root = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <>
      <ThemeProvider
        theme={{ theme: theme }}
      >
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
