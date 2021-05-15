import React, { useEffect, useRef } from 'react';
import { Container } from './Gist.style';

import { useParams, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import File from '../File/File';
import Note from '../Note/Note';
import AddFile from '../../../editors/AddFile/AddFile';
import AddNote from '../../../editors/AddNote/AddNote';
import BarTop from '../BarTop/BarTop';
import EditDescription from '../../../editors/EditDescription/EditDescription';
import { getGists } from '../../../../slices/gists/gistsSlice';
import EditNote from '../../../editors/EditNote/EditNote';

export interface MatchParams {
  id: string;
  collection: string;
}
const Gist = () => {
  const container = useRef<HTMLDivElement>(null);
  const { id, collection } = useParams<MatchParams>();
  const location = useLocation();

  useEffect(() => {
    container.current &&
      container.current.scrollIntoView({
        block: 'start',
      });
  }, [id]);

  const gists = useSelector(getGists);
  const gist = gists.find(item => item.name === id);

  const note =
    gist && gist.files.find(file => file.name.includes('.sneepe.md'));

  return gist ? (
    <Container ref={container}>
      <BarTop hasNote={!!note} />

      <Route exact path={`/gists/${collection}/${id}/addfile`}>
        <AddFile name={id} files={gist.files} col={collection} />
      </Route>

      <Route exact path={`/gists/${collection}/${id}/addnote`}>
        <AddNote name={id} col={collection}/>
      </Route>

      <Route exact path={`/gists/${collection}/${id}/editnote`}>
        <EditNote name={id} note={note} col={collection} files={gist.files}/>
      </Route>

      <Route exact path={`/gists/${collection}/${id}/editdescription`}>
        <EditDescription name={id} />
      </Route>

      {note && !location.pathname.includes('editnote') && <Note {...note} />}
      {gist.files
        ?.filter(file => !file.name.includes('.sneepe.md'))
        .map((file, i) => {
          if (file.extension !== '.md') {
            return (
              <File key={i} files={gist.files} file={file} name={gist.name} />
            );
          } else {
            return <Note key={i} {...file} />;
          }
        })}
    </Container>
  ) : null;
};

export default Gist;
