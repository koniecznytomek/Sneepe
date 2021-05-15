import React, { useEffect, useState } from 'react';
import { Container } from './AddFile.style';

import useRequest from '../../../api/useRequest';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Files } from '../../../slices/gists/types';
import { addFile } from '../../../slices/gists/gistsSlice';

import TextareaAutosize from 'react-autosize-textarea';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Dark, Light, Dusk } from '../../../assets/themes';
import { getTheme } from '../../../slices/theme/themeSlice';

interface Props {
  name: string;
  files: Files[];
  col: string;
}

const AddFile = ({ name, files, col }: Props) => {
  const [data, setData] = useState({ name: '', text: '\n' });
  const [duplicate, setDuplicate] = useState(false);

  const { addFileToApi } = useRequest();
  const dispatch = useDispatch();
  const history = useHistory();

  const theme = useSelector(getTheme);

  useEffect(() => {
    const hasDuplicate = files.map(files => files.name).includes(data.name);
    setDuplicate(hasDuplicate);
  }, [files, data.name]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSave = async () => {
    await addFileToApi(name, data.name, data.text);
    dispatch(addFile({ name: name, filename: data.name, text: data.text }));
    history.push(`/gists/${col}/${name}`);
  };

  const handleCancel = () => {
    history.push(`/gists/${col}/${name}`);
  };

  return (
    <Container>
      <form>
        <div className='title-bar'>
          <div className='title'>
            <input
              name='name'
              autoFocus
              autoComplete='off'
              spellCheck='false'
              defaultValue={data.name}
              onChange={e => handleChange(e)}
              className={`${duplicate ? 'error' : 'default'}`}
            />
          </div>
          <div className='options'></div>
        </div>
        <div className='snippet'>
          <div className='output'>
            <SyntaxHighlighter
              language='javascript'
              children={data.text}
              style={
                {
                  light: Light,
                  dark: Dark,
                  dusk: Dusk,
                }[theme as keyof Object]
              }
              showLineNumbers
              lineNumberStyle={{ minWidth: '40px' }}
            />
          </div>
          <div className='textarea'>
            <TextareaAutosize
              name='text'
              defaultValue={data.text}
              spellCheck='false'
              onChange={e => handleChange(e)}
            />
          </div>
        </div>
      </form>

      <div className='buttons'>
        {!duplicate && data.name.length > 0 && (
          <span className='save' onClick={() => handleSave()}>
            save
          </span>
        )}
        <span className='cancel' onClick={() => handleCancel()}>
          cancel
        </span>
      </div>
    </Container>
  );
};

export default AddFile;
