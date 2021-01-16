import React from 'react';
import { Container } from './Search.style';
import { IconSearch } from '../../../assets/icons/Icons';

const Search = ({ handle }: any) => {
  return (
    <Container>
      <form>
        <span className='icon'>
          <IconSearch />
        </span>
        <input
          name='search'
          autoComplete='off'
          onChange={e => handle(e.target.value)}
        />
      </form>
    </Container>
  );
};

export default Search;
