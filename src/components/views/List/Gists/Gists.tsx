import React, { useEffect, useRef, useState } from 'react';
import { Route, Redirect, useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import { gistsSelector } from '../../../../slices/gists/gistsSlice';

import { Container } from './Gists.style';
import Li from '../Li/Li';
import BarTop from '../BarTop/BarTop';

export interface MatchParams {
  id: string;
}

const Gists = () => {
  const [search, setSearch] = useState('');

  const gists = useSelector(gistsSelector);
  const container = useRef<HTMLDivElement>(null);
  const match = useRouteMatch<MatchParams>();

  useEffect(() => {
    container.current &&
      container.current.scrollIntoView({
        block: 'start',
      });
  }, [match.params.id]);

  return (
    <Container ref={container}>
      <BarTop
        add={'allgists'}
        setSearch={(phrase: string) => setSearch(phrase)}
      />
      <ul>
        {gists &&
          gists
            .filter(
              gist =>
                gist.files[0].name.toLowerCase().includes(search) ||
                gist.description.toLowerCase().includes(search)
            )
            .map((gist, i) => <Li key={i} gist={gist} slug={match.path} />)}
      </ul>
      <Route exact path='/gists/allgists/'>
        <Redirect to={`${match.path}/${gists[0] && gists[0].name}`} />
      </Route>
    </Container>
  );
};

export default Gists;
