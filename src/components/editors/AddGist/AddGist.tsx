import React, { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

// components
import TextareaAutosize from 'react-autosize-textarea';
import Markdown from '../../features/Markdown/Markdown';

// redux
import { useSelector } from 'react-redux';
import { getTheme } from '../../../slices/theme/themeSlice';
import useRequest from '../../../api/useRequest';

// router
import { useParams } from 'react-router-dom';

// assets
import { Dark, Light, Dusk } from '../../../assets/themes';
import { IconColDelete, IconMdView } from '../../../assets/icons/Icons';

// styles
import { Container } from './AddGist.style';

const AddGist = () => {
    const [error, setError] = useState<boolean>(true);
    const [duplicates, setDuplicates] = useState<string[]>([]);
    const [mdView, setMdView] = useState<boolean>(false);

    const [content, setContent] = useState({
        description: '',
        isPublic: false,
        files: [{ name: '', text: '\n' }],
        note: { name: '', text: '' },
    });

    const { collection } = useParams<any>();
    const { addGistToApi } = useRequest();
    const theme = useSelector(getTheme);

    useEffect(() => {
        content.files.some(file => file.name.length > 0) ? setError(false) : setError(true);

        const filenames = content.files.map(file => file.name);
        const hasDuplicate = filenames.some((a, i) => filenames.indexOf(a) !== i);

        setDuplicates([...new Set(filenames.filter((value, index, self) => self.indexOf(value) !== index))]);
        hasDuplicate && setError(true);
    }, [content.files]);

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
            note: { name: value, text: content.note.text },
        });
    };
    const handleNoteChange = (e: any) => {
        const value = e.target.value;

        setContent({
            ...content,
            note: { name: content.note.name, text: value },
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
            files: [...content.files, { name: '', text: '\n' }],
        });
    };

    const handleFileDelete = (e: any, index: number) => {
        setContent({
            ...content,
            files: content.files.filter((file, i) => i !== index),
        });
    };

    const handleDraft = () => {
        const id = () => {
            return '_' + Math.random().toString(36).substr(2, 9);
        };
        console.log(id);
    };

    const handleSave = async () => {
        !error && (await addGistToApi(content, collection));
    };

    return (
        <Container>
            <form>
                <div className="note">
                    <div className="note-title">
                        <input
                            name="title"
                            placeholder="Gist name"
                            autoComplete="off"
                            spellCheck="false"
                            onChange={e => handleTitleChange(e)}
                        />
                    </div>
                    <div className="note-options">
                        <span onClick={() => setMdView(!mdView)}>
                            <IconMdView />
                        </span>
                    </div>
                    {!mdView ? (
                        <div className="note-editor">
                            <textarea
                                name="note"
                                value={content.note.text}
                                placeholder="Note"
                                autoComplete="off"
                                spellCheck="false"
                                rows={10}
                                onChange={e => handleNoteChange(e)}
                            />
                        </div>
                    ) : (
                        <div className="note-viewer">
                            <Markdown text={content.note.text} />
                        </div>
                    )}
                </div>
                <div className="description">
                    <textarea
                        name="description"
                        placeholder="Description"
                        autoComplete="off"
                        spellCheck="false"
                        rows={5}
                        onChange={e => handleContentChange(e)}
                    />
                </div>
                {content.files?.map((file, index) => (
                    <div key={index} className="file">
                        <div className="title-bar">
                            <div className="title">
                                <input
                                    name="name"
                                    placeholder="Filename"
                                    autoComplete="off"
                                    spellCheck="false"
                                    value={file.name}
                                    className={duplicates.includes(file.name) ? 'error' : ''}
                                    onChange={e => handleFilesChange(e, index)}
                                />
                            </div>
                            <div className="options">
                                <span onClick={e => handleFileDelete(e, index)}>
                                    <IconColDelete />
                                </span>
                            </div>
                        </div>
                        <div className="snippet">
                            <div className="output">
                                <SyntaxHighlighter
                                    language="javascript"
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
                            <div className="textarea">
                                <TextareaAutosize
                                    name="text"
                                    defaultValue={file.text}
                                    autoComplete="off"
                                    spellCheck="false"
                                    onChange={(e: any) => handleFilesChange(e, index)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </form>
            <div className="buttons">
                {!error && (
                    <span className="save" onClick={() => handleSave()}>
                        save
                    </span>
                )}
                <span className="cancel" onClick={() => handleDraft()}>
                    draft
                </span>
                <span className="cancel" onClick={() => handleFileAdd()}>
                    add file
                </span>
                <span className="cancel" onClick={() => handleVisibility()}>
                    {content.isPublic ? 'Public' : 'Private'}
                </span>
            </div>
        </Container>
    );
};

export default AddGist;
