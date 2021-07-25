import React, { useState } from 'react';

// hooks
import useRequest from '../../../api/useRequest';

// router
import { useParams } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteGist } from '../../../slices/gists/gistsSlice';
import { addCollections, getCollections } from '../../../slices/collections/collectionsSlice';

// assets
import { IconCancel, IconConfirm, IconDeleteGist } from '../../../assets/icons/Icons';

// styles
import { Container } from './DeleteGist.style';

const DeleteGist = () => {
    const [overlay, setOverlay] = useState<boolean>(false);
    const { id } = useParams<{ id: string; collection: string }>();
    const dispatch = useDispatch();
    const collections = useSelector(getCollections);

    const { deleteGistFromApi, updateCollectionsInApi } = useRequest();

    const updatedCollections = collections.map(col => {
        if (col.gists.includes(id)) {
            return {
                name: col.name,
                gists: col.gists.filter(gist => gist !== id),
            };
        } else {
            return {
                name: col.name,
                gists: col.gists,
            };
        }
    });

    const handleDelete = async () => {
        try {
            deleteGistFromApi(id).then(() => {
                dispatch(addCollections(updatedCollections));
                updateCollectionsInApi(updatedCollections);
                dispatch(deleteGist(id));
                setOverlay(false);
            });
        } catch (error) {
            setOverlay(false);
        }
    };

    return (
        <Container>
            <span onClick={() => setOverlay(true)}>
                <IconDeleteGist />
            </span>
            {overlay && (
                <div className="overlay">
                    <div className="confirm-box">
                        <p>Are you sure to delete this Gist?</p>
                        <div className="confirm-buttons">
                            <span className="confirm-button" onClick={() => handleDelete()}>
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

export default DeleteGist;
