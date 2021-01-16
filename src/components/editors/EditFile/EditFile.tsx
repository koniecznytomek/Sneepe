import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { tokenSelector } from '../../../slices/auth/authSlice';
import { themeSelector } from '../../../slices/theme/themeSlice';
import { updateFile } from '../../../slices/gists/gistsSlice';

import { Files } from '../../../slices/gists/types';
import { Octokit } from '@octokit/core';

import TextareaAutosize from 'react-autosize-textarea';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Dark, Light, Dusk } from '../../../assets/themes';

import DeleteFile from '../DeleteFile/DeleteFile';
import { Container } from './EditFile.style';

interface Props {
  name: string;
  file: any;
  files: Files[];
  trigger: (state: boolean) => void;
}

const EditFile = ({ name, file, files, trigger }: Props) => {
  const [data, setData] = useState({ name: '', text: '' });
  const [titleExists, setTitleExists] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const theme = useSelector(themeSelector);

  const filename = file.name;
  const code = file.text;

  useEffect(() => {
    return () => trigger(false);
  }, [name, trigger]);

  useEffect(() => {
    setData({ name: filename, text: code });
  }, [filename, code]);

  useEffect(() => {
    const filenameExists = files
      .map(files => files.name)
      .filter(file => file !== filename)
      .includes(data.name);
    setTitleExists(filenameExists);
  }, [files, data.name, filename]);

  const handleChange = (e: any) => {
    const key = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSave = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();

    const octokit = new Octokit({ auth: token });
    dispatch(updateFile({name, filename, data}));

    trigger(false);

    await octokit.request(`PATCH /gists/${name}`, {
      files: {
        [filename]: {
          filename: data.name,
          content: data.text,
        },
      },
    });
  };

  const handleCancel = () => {
    trigger(false);
  };

  return (
    <Container>
      <div className='editfile'>
        <form>
          <div className='title-bar'>
            <div className='title'>
              <input
                name='name'
                autoFocus
                spellCheck='false'
                defaultValue={data.name}
                onChange={e => handleChange(e)}
                className={`${titleExists ? 'error' : 'default'}`}
              />
            </div>
            <div className='options'></div>
          </div>

          <div className='snippet'>
            <div className='output'>
              <SyntaxHighlighter
                language={file.language && file.language.name.toLowerCase()}
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

        {data.name.length > 0 && (
          <div className='form-buttons'>
            <span className='save' onClick={e => handleSave(e)}>
              {!titleExists && 'save'}
            </span>
            <DeleteFile name={name} filename={filename} files={files} />
            <span className='cancel' onClick={() => handleCancel()}>
              cancel
            </span>
          </div>
        )}
      </div>
    </Container>
  );
};

export default EditFile;
