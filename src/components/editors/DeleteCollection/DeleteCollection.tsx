import React, { useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getCollections, deleteCollection } from '../../../slices/collections/collectionsSlice';
import useRequest from '../../../api/useRequest';

// assets
import { IconCancel, IconColDelete, IconConfirm } from '../../../assets/icons/Icons';

// styles
import { Container } from './DeleteCollection.style';

type Props = {
    readonly name: string;
};

const DeleteCollection = ({ name }: Props) => {
    const [overlay, setOverlay] = useState<boolean>(false);

    const { updateCollectionsInApi } = useRequest();
    const dispatch = useDispatch();
    const collections = useSelector(getCollections);

    const updatedCollections = collections.filter(collection => collection.name !== name);

    const handleDelete = async () => {
        await updateCollectionsInApi(updatedCollections);
        dispatch(deleteCollection(name));
        setOverlay(false);
    };

    return (
        <Container>
            <span onClick={() => setOverlay(true)}>
                <IconColDelete />
            </span>
            {overlay && (
                <div className="overlay">
                    <div className="confirm-box">
                        <p>Are you sure to delete {name} collection?</p>
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

export default DeleteCollection;
