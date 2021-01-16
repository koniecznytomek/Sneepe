import React, { useEffect, useRef } from 'react';
import { Container } from './Gist.style';

import { useParams, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import File from '../File/File';
import Note from '../Note/Note';
import AddFile from '../../../editors/AddFile/AddFile';
import AddNote from '../../../editors/AddNote/AddNote';
import BarTop from '../BarTop/BarTop';
import EditDescription from '../../../editors/EditDescription/EditDescription';
import { gistsSelector } from '../../../../slices/gists/gistsSlice';

export interface MatchParams {
  id: string;
  collection: string;
}
const Gist = () => {
  const container = useRef<HTMLDivElement>(null);
  const { id, collection } = useParams<MatchParams>();

  useEffect(() => {
    container.current &&
      container.current.scrollIntoView({
        block: 'start',
      });
  }, [id]);

  const gists = useSelector(gistsSelector);
  const gist = gists.find(item => item.name === id);

  const note =
    gist &&
    gist.files.find(
      file => file.name.includes('.sneepe.md')
    );

  return gist ? (
    <Container ref={container}>
      <BarTop hasNote={!!note}/>

      <Route exact path={`/gists/${collection}/${id}/addfile`}>
        <AddFile name={id} files={gist.files} col={collection}/>
      </Route>

      <Route exact path={`/gists/${collection}/${id}/addnote`}>
        <AddNote name={id} />
      </Route>

      <Route exact path={`/gists/${collection}/${id}/editdescription`}>
        <EditDescription name={id} />
      </Route>

      {note && <Note {...note} />}
      {gist.files
        .filter(file => !file.name.includes('.sneepe.md'))
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
