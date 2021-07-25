import React, { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

// components
import TextareaAutosize from 'react-autosize-textarea';

// hooks
import useRequest from '../../../api/useRequest';

// routes
import { useHistory } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { addFile } from '../../../slices/gists/gistsSlice';
import { getTheme } from '../../../slices/theme/themeSlice';

// types
import { Files } from '../../../slices/gists/types';

// assets
import { Dark, Light, Dusk } from '../../../assets/themes';

// styles
import { Container } from './AddFile.style';

type Props = {
    readonly name: string;
    readonly files: Files[];
    readonly col: string;
};

const AddFile = ({ name, files, col }: Props) => {
    const [data, setData] = useState({ name: '', text: '\n' });
    const [duplicate, setDuplicate] = useState<boolean>(false);

    const { addFileToApi } = useRequest();
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = useSelector(getTheme);

    useEffect(() => {
        const hasDuplicate = files.map(files => files.name).includes(data.name);
        setDuplicate(hasDuplicate);
    }, [files, data.name]);

    const handleChange = (e: any) => {
        const { value, name } = e.target;
        setData({ ...data, [name]: value });
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
                <div className="title-bar">
                    <div className="title">
                        <input
                            name="name"
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                            defaultValue={data.name}
                            onChange={handleChange}
                            className={`${duplicate ? 'error' : 'default'}`}
                        />
                    </div>
                    <div className="options" />
                </div>
                <div className="snippet">
                    <div className="output">
                        <SyntaxHighlighter
                            language="javascript"
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
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </form>
            <div className="buttons">
                {!duplicate && data.name.length > 0 && (
                    <span className="save" onClick={handleSave}>
                        save
                    </span>
                )}
                <span className="cancel" onClick={handleCancel}>
                    cancel
                </span>
            </div>
        </Container>
    );
};

export default AddFile;
