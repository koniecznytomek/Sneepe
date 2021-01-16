import React from 'react';
import { Container } from './Folders.style';
import {
  IconGists,
  IconStarred,
  IconTrash,
} from '../../../../assets/icons/Icons';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { gistsSelector } from '../../../../slices/gists/gistsSlice';

const Folders = () => {
  const state = useSelector(gistsSelector);

  const gistsCounter = state.length;
  const starredCounter = state.filter(item => item.viewerHasStarred).length;

  return (
    <Container>
      <ul>
        <li>
          <NavLink to='/gists/allgists' activeClassName='active'>
            <IconGists />
            <span className='name'>Gists</span>
            <span className='counter'>{gistsCounter}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/gists/starred' activeClassName='active'>
            <IconStarred />
            <span className='name'>Starred</span>
            <span className='counter'>{starredCounter}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/gists/trash' activeClassName='active'>
            <IconTrash />
            <span className='name'>Trash</span>
            <span className='counter'>10</span>
          </NavLink>
        </li>
      </ul>
    </Container>
  );
};

export default Folders;
