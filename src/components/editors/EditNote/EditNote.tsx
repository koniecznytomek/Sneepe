import React, { useEffect, useState } from 'react';
import { Container } from './EditNote.style';
import { useDispatch } from 'react-redux';
import { editNote } from '../../../slices/gists/gistsSlice';
import { useHistory } from 'react-router-dom';
import useRequest from '../../../api/useRequest';
import { IconMdView } from '../../../assets/icons/Icons';
import DeleteFile from '../DeleteFile/DeleteFile';
import { Files } from '../../../slices/gists/types';
import Markdown from '../../features/Markdown/Markdown';

interface Props {
  name: string;
  note: any;
  col: string;
  files: Files[];
}

const EditNote = ({ name, note, col, files }: Props) => {
  const [mdView, setMdView] = useState<boolean>(false);
  const [data, setData] = useState({ name: '', text: '' });

  const tempName = note.name.slice(0, -10).replace(/^[_]+/, '');

  useEffect(() => {
    setData({ name: tempName, text: note.text });
  }, [note, tempName]);

  const dispatch = useDispatch();
  const history = useHistory();
  const { updateFileInApi } = useRequest();

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const filename = data.name + '.sneepe.md';
    dispatch(
      editNote({
        name: name,
        filename: note.name,
        newFilename: filename,
        text: data.text,
      })
    );
    await updateFileInApi(name, note.name, filename, data.text);
    history.push(`/gists/${col}/${name}`);
  };

  const handleCancel = () => {
    history.push(`/gists/${col}/${name}`);
  };

  return (
    <Container>
      <form>
        <div className='note'>
          <div className='note-title'>
            <input
              name='name'
              autoFocus
              autoComplete="off"
              spellCheck='false'
              defaultValue={data.name}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className='note-options'>
            <span>
              <span onClick={() => setMdView(!mdView)}>
                <IconMdView />
              </span>
            </span>
          </div>
          {!mdView ? (
            <div className='note-editor'>
              <textarea
                name='text'
                defaultValue={data.text}
                rows={30}
                onChange={e => handleChange(e)}
              />
            </div>
          ) : (
            <div className='note-viewer'>
              <Markdown text={data.text} />
            </div>
          )}
        </div>
      </form>

      <div className='buttons'>
        <span className='save' onClick={e => handleSave(e)}>
          save
        </span>
        <DeleteFile name={name} filename={note.name} files={files} />
        <span className='cancel' onClick={() => handleCancel()}>
          cancel
        </span>
      </div>
    </Container>
  );
};

export default EditNote;
