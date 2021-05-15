import React, { useEffect, useRef, useState } from 'react';
import { Container } from './Starred.style';
import { useSelector } from 'react-redux';
import { getGists } from '../../../../slices/gists/gistsSlice';
import { Redirect, Route, useRouteMatch } from 'react-router';
import { MatchParams } from '../Gists/Gists';
import BarTop from '../BarTop/BarTop';
import Li from '../Li/Li';

const Starred = () => {
  const [search, setSearch] = useState('');

  const gists = useSelector(getGists);
  const container = useRef<HTMLDivElement>(null);
  const match = useRouteMatch<MatchParams>();

  useEffect(() => {
    container.current?.scrollIntoView({
      block: 'start',
    });
  }, [match.params.id]);

  return (
    <Container ref={container}>
      <BarTop setSearch={(phrase: string) => setSearch(phrase)} />
      <ul>
        {gists
          ?.filter(
            gist =>
              gist.viewerHasStarred &&
              (gist.files[0].name.toLowerCase().includes(search) ||
                gist.description.toLowerCase().includes(search))
          )
          .map((gist, i) => (
            <Li key={i} gist={gist} slug={match.path} />
          ))}
      </ul>
      <Route exact path='/gists/allgists/'>
        <Redirect to={`${match.path}/${gists[0] && gists[0].name}`} />
      </Route>
    </Container>
  );
};

export default Starred;
