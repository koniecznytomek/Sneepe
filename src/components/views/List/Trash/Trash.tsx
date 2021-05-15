import React, { useEffect, useRef, useState } from 'react';
import { Container } from './Trash.style';
import { useSelector } from 'react-redux';
import { getGists } from '../../../../slices/gists/gistsSlice';
import { useRouteMatch } from 'react-router';
import { MatchParams } from '../Gists/Gists';

const Trash = () => {
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
    <Container>
      Trashcan
    </Container>
  );
};

export default Trash;
