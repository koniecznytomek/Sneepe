import React, { useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import useRequest from '../../../api/useRequest';
import { deleteFile, deleteGist } from '../../../slices/gists/gistsSlice';
import { getCollections, addCollections } from '../../../slices/collections/collectionsSlice';

// types
import { Files } from '../../../slices/gists/types';

// assets
import { IconCancel, IconConfirm } from '../../../assets/icons/Icons';

// styles
import { Container } from './DeleteFile.style';

type Props = {
    readonly name: string;
    readonly filename: string;
    readonly files: Files[];
};

const DeleteFile = ({ name, filename, files }: Props) => {
    const [overlay, setOverlay] = useState<boolean>(false);

    const { deleteFileFromApi, deleteGistFromApi, updateCollectionsInApi } = useRequest();

    const dispatch = useDispatch();
    const collections = useSelector(getCollections);

    const updatedCollections = collections.map(col => {
        if (col.gists.includes(name)) {
            return {
                name: col.name,
                gists: col.gists.filter(gist => gist !== name),
            };
        } else {
            return {
                name: col.name,
                gists: col.gists,
            };
        }
    });

    const counter = files.length;

    const handleDelete = async () => {
        if (counter > 1) {
            try {
                deleteFileFromApi(name, filename).then(() => {
                    dispatch(deleteFile({ name, filename }));
                    setOverlay(false);
                });
            } catch (error) {
                setOverlay(false);
                console.log(error);
            }
        } else {
            try {
                deleteGistFromApi(name).then(() => {
                    dispatch(addCollections(updatedCollections));
                    updateCollectionsInApi(updatedCollections);
                    dispatch(deleteGist(name));
                    setOverlay(false);
                });
            } catch (error) {
                setOverlay(false);
                console.log(error);
            }
        }
    };

    return (
        <Container>
            <span className="cancel" onClick={() => setOverlay(true)}>
                Delete
            </span>
            {overlay && (
                <div className="overlay">
                    <div className="confirm-box">
                        <p>Are you sure to delete this {counter > 1 ? 'File' : 'Gist'}?</p>;
                        <div className="confirm-buttons">
                            <span className="confirm-button" onClick={handleDelete}>
                                <IconConfirm />
                            </span>
                            <span className="confirm-button" onClick={() => setOverlay(false)}>
                                <IconCancel />
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default DeleteFile;
