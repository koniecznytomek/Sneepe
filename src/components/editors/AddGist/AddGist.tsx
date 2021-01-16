import React, { useState } from 'react';
import { Container } from './AddGist.style';
import useApiRequest from '../../../hooks/useApiRequest';
import { useParams } from 'react-router-dom';
import TextareaAutosize from 'react-autosize-textarea';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';
import { Dark, Light, Dusk } from '../../../assets/themes';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../slices/theme/themeSlice';

const AddGist = () => {
  const [content, setContent] = useState({
    description: '',
    isPublic: false,
    files: [{ name: '', text: ' ' }],
    note: {name: '', text: ''}
  });

  const { collection } = useParams<any>();
  const { addGistToApi } = useApiRequest();
  const theme = useSelector(themeSelector);

  const renderers = {
    code: ({ language, value = 'code' }: any) => {
      return (
        <SyntaxHighlighter
          style={
            {
              light: Light,
              dark: Dark,
              dusk: Dusk,
            }[theme as keyof Object]
          }
          language={language}
          children={value}
        />
      );
    },
  };

  const handleVisibility = () => {
    setContent({ ...content, isPublic: !content.isPublic });
  };

  const handleContentChange = (e: any) => {
    const value = e.target.value;

    setContent({
      ...content,
      [e.target.name]: value,
    });
  };

  const handleTitleChange = (e: any) => {
    const value = e.target.value;

    setContent({
      ...content,
      note: { name: value, text: content.note.text},
    });
  };
  const handleNoteChange = (e: any) => {
    const value = e.target.value;

    setContent({
      ...content,
      note: {name: content.note.name, text: value},
    });
  };

  const handleFilesChange = (e: any, index: number) => {
    const key = e.target.name;
    const value = e.target.value;

    const newState = content.files.map((file, i) => {
      if (i === index) {
        return {
          ...file,
          [key]: value,
        };
      } else {
        return file;
      }
    });

    setContent({
      ...content,
      files: newState,
    });
  };

  const handleFileAdd = () => {
    setContent({
      ...content,
      files: [...content.files, { name: '', text: '' }],
    });
  };

  const handleDraft = () => {
    const id = () => {
      return (
        '_' +
        Math.random()
          .toString(36)
          .substr(2, 9)
      );
    };
    console.log(id);
  };

  const handleSave = async () => {
    await addGistToApi(content, collection);
  };

  return (
    <Container>
      <form>
        <div className='description'>
          <input
            name='title'
            placeholder='Title'
            onChange={e => handleTitleChange(e)}
          />
          <textarea
            name='note'
            placeholder='Note'
            rows={5}
            onChange={e => handleNoteChange(e)}
          />
        </div>

        <div className='note'>
          <ReactMarkdown renderers={renderers} children={content.note.text} />
        </div>

        <div className='description'>
          <textarea
            name='description'
            placeholder='Description on Github'
            rows={5}
            onChange={e => handleContentChange(e)}
          />
        </div>
        {content.files &&
          content.files.map((file, index) => (
            <span key={index}>
              <div className='title-bar'>
                <div className='title'>
                  <input
                    name='name'
                    placeholder='Filename'
                    onChange={e => handleFilesChange(e, index)}
                  />
                </div>
              </div>

              <div className='snippet'>
                <div className='output'>
                  <SyntaxHighlighter
                    language='javascript'
                    children={file.text}
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
                    defaultValue={file.text}
                    spellCheck='false'
                    onChange={(e: any) => handleFilesChange(e, index)}
                  />
                </div>
              </div>
            </span>
          ))}

        <span className='save' onClick={() => handleSave()}>
          save
        </span>
        <span className='draft' onClick={() => handleDraft()}>
          draft
        </span>
        <span className='cancel' onClick={() => handleFileAdd()}>
          add file
        </span>
        <span className='cancel' onClick={() => handleVisibility()}>
          {content.isPublic ? 'Public' : 'Private'}
        </span>
      </form>
    </Container>
  );
};

export default AddGist;
