import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import SyntaxHighlighter from 'react-syntax-highlighter';

// components
import DeleteFile from '../DeleteFile/DeleteFile';

// hooks
import useRequest from '../../../api/useRequest';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../../slices/theme/themeSlice';
import { updateFile } from '../../../slices/gists/gistsSlice';

// types
import { Files } from '../../../slices/gists/types';

// assets

import { Dark, Light, Dusk } from '../../../assets/themes';

// styles
import { Container } from './EditFile.style';

type Props = {
    readonly name: string;
    readonly file: any;
    readonly files: Files[];
    readonly trigger: (state: boolean) => void;
};

const EditFile = ({ name, file, files, trigger }: Props) => {
    const [data, setData] = useState({ name: '', text: '' });
    const [titleExists, setTitleExists] = useState(false);

    const dispatch = useDispatch();
    const { updateFileInApi } = useRequest();
    const theme = useSelector(getTheme);

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
        trigger(false);
        dispatch(updateFile({ name, filename, data }));
        await updateFileInApi(name, filename, data.name, data.text);
    };

    const handleCancel = () => {
        trigger(false);
    };

    return (
        <Container>
            <form>
                <div className="title-bar">
                    <div className="title">
                        <input
                            name="name"
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                            defaultValue={data.name}
                            onChange={e => handleChange(e)}
                            className={`${titleExists ? 'error' : 'default'}`}
                        />
                    </div>
                    <div className="options"></div>
                </div>
                <div className="snippet">
                    <div className="output">
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
                    <div className="textarea">
                        <TextareaAutosize
                            name="text"
                            defaultValue={data.text}
                            spellCheck="false"
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>
            </form>
            {data.name.length > 0 && (
                <div className="buttons">
                    <span className="save" onClick={e => handleSave(e)}>
                        {!titleExists && 'save'}
                    </span>
                    <DeleteFile name={name} filename={filename} files={files} />
                    <span className="cancel" onClick={() => handleCancel()}>
                        cancel
                    </span>
                </div>
            )}
        </Container>
    );
};

export default EditFile;
