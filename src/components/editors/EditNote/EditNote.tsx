import React, { useEffect, useState } from 'react';

// components
import DeleteFile from '../DeleteFile/DeleteFile';
import Markdown from '../../features/Markdown/Markdown';

// hooks
import useRequest from '../../../api/useRequest';

// router
import { useHistory } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';
import { editNote } from '../../../slices/gists/gistsSlice';

// types
import { Files } from '../../../slices/gists/types';

// assets
import { IconMdView } from '../../../assets/icons/Icons';

// styles
import { Container } from './EditNote.style';

type Props = {
    readonly name: string;
    readonly note: any;
    readonly col: string;
    readonly files: Files[];
};

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
                <div className="note">
                    <div className="note-title">
                        <input
                            name="name"
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                            defaultValue={data.name}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    <div className="note-options">
                        <span>
                            <span onClick={() => setMdView(!mdView)}>
                                <IconMdView />
                            </span>
                        </span>
                    </div>
                    {!mdView ? (
                        <div className="note-editor">
                            <textarea name="text" defaultValue={data.text} rows={30} onChange={e => handleChange(e)} />
                        </div>
                    ) : (
                        <div className="note-viewer">
                            <Markdown text={data.text} />
                        </div>
                    )}
                </div>
            </form>

            <div className="buttons">
                <span className="save" onClick={e => handleSave(e)}>
                    save
                </span>
                <DeleteFile name={name} filename={note.name} files={files} />
                <span className="cancel" onClick={() => handleCancel()}>
                    cancel
                </span>
            </div>
        </Container>
    );
};

export default EditNote;
