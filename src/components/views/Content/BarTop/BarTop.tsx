import React from 'react';
import { Container } from './BarTop.style';
import { NavLink, useLocation } from 'react-router-dom';
import { IconAddFile, IconAddNote } from '../../../../assets/icons/Icons';
import DeleteGist from '../../../editors/DeleteGist/DeleteGist';

interface Props {
  hasNote: boolean;
}
const BarTop = ({ hasNote }: Props) => {
  const location = useLocation();

  return (
    <Container>
      <div className='bar'>
        <ul>
          <li>
            {!location.pathname.includes('addfile') && (
              <NavLink to={`${location.pathname}/addfile`}>
                <IconAddFile />
              </NavLink>
            )}
          </li>
          {!hasNote && (
            <li>
              <NavLink to={`${location.pathname}/addnote`}>
                <IconAddNote />
              </NavLink>
            </li>
          )}
          <li>
            <DeleteGist />
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default BarTop;
