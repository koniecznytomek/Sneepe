import React from 'react';
import { Container } from './Folders.style';
import {
  IconGists,
  IconStarred,
  IconTrash,
} from '../../../../assets/icons/Icons';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getGists } from '../../../../slices/gists/gistsSlice';
import { getTrash } from '../../../../slices/trash/trashSlice';

const Folders = () => {
  const gists = useSelector(getGists);
  const trash = useSelector(getTrash);

  const gistsCounter = gists.length;
  const trashCounter = trash.length;
  const starredCounter = gists.filter(item => item.viewerHasStarred).length;

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
            <span className='counter'>{trashCounter}</span>
          </NavLink>
        </li>
      </ul>
    </Container>
  );
};

export default Folders;
