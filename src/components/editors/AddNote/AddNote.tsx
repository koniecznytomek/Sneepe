import React, { useState } from 'react';
import { Container } from './AddNote.style';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IconMdView } from '../../../assets/icons/Icons';
import Markdown from '../../features/Markdown/Markdown';
import useRequest from '../../../api/useRequest';
import { addFile } from '../../../slices/gists/gistsSlice';

interface Props {
  name: string;
  col: string;
}
const AddNote = ({ name, col }: Props) => {
  const [mdView, setMdView] = useState<boolean>(false);
  const [data, setData] = useState({ name: '', text: '' });

  const dispatch = useDispatch();
  const history = useHistory();
  const { addFileToApi } = useRequest();

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const filename = data.name + '.sneepe.md';
    await addFileToApi(name, filename, data.text);
    dispatch(addFile({ name: name, filename: filename, text: data.text }));
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
              autoComplete='off'
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
        <span className='save' onClick={() => handleSave()}>
          save
        </span>
        <span className='cancel' onClick={() => handleCancel()}>
          cancel
        </span>
      </div>
    </Container>
  );
};

export default AddNote;
