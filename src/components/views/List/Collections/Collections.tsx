import React, { useEffect, useRef, useState } from 'react';
import { Redirect, Route, useRouteMatch } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { collectionsSelector } from '../../../../slices/collections/collectionsSlice';
import { gistsSelector } from '../../../../slices/gists/gistsSlice';

import { Container } from './Collections.style';
import Li from '../Li/Li';
import BarTop from '../BarTop/BarTop';


export interface MatchParams {
  id: string;
}

const Collections = () => {
  const [search, setSearch] = useState('');

  const container = useRef<HTMLDivElement>(null);
  const match = useRouteMatch<MatchParams>();

  useEffect(() => {
    container.current &&
      container.current.scrollIntoView({
        block: 'start',
      });
  }, [match.params.id]);

  const gists = useSelector(gistsSelector);
  const collections = useSelector(collectionsSelector);

  const collection =
    collections && collections.find(item => item.name === match.params.id);

  const result =
    gists &&
    gists.filter(
      item =>
        collection &&
        collection.gists.includes(item.name) &&
        (item.files[0].name.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search))
    );

  return (
    <Container ref={container}>
      <BarTop
        add={match.params.id}
        edit={match.params.id}
        setSearch={(phrase: string) => setSearch(phrase)}
      />
      <ul>
        {result &&
          result.map((gist, i) => (
            <Li key={i} gist={gist} slug={match.url} collection={collection} />
          ))}
        {!result.length && (
          <li className='nofound'>
            <p>No gists found.</p>
          </li>
        )}
      </ul>
      {result && (
        <Route exact path={`/gists/${match.params.id}/`}>
          <Redirect
            to={`/gists/${match.params.id}/${result[0] && result[0].name}`}
          />
        </Route>
      )}
    </Container>
  );
};

export default Collections;
