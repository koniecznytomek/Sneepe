import React from 'react';
import { Container } from './BarTop.style';
import { NavLink, useParams } from 'react-router-dom';
import { IconAddFile, IconAddNote } from '../../../../assets/icons/Icons';
import DeleteGist from '../../../editors/DeleteGist/DeleteGist';

interface Props {
  hasNote: boolean;
}

export interface MatchParams {
  id: string;
  collection: string;
}

const BarTop = ({ hasNote }: Props) => {
  const { id, collection } = useParams<MatchParams>();

  return (
    <Container>
      <div className='bar'>
        <ul>
          <li>
            <NavLink to={`/gists/${collection}/${id}/addfile`} replace>
              <IconAddFile />
            </NavLink>
          </li>
          {hasNote ? (
            <li>
              <NavLink to={`/gists/${collection}/${id}/editnote`} replace>
                <IconAddNote />
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to={`/gists/${collection}/${id}/addnote`} replace>
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
