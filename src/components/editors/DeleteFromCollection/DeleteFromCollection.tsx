import React, { useEffect, useState } from 'react';

// hooks
import useRequest from '../../../api/useRequest';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getCollections, deleteFromCollection } from '../../../slices/collections/collectionsSlice';

// assets
import { IconCancel, IconConfirm } from '../../../assets/icons/Icons';

// styles
import { Container } from './DeleteFromCollection.style';

type Props = {
    readonly name: string;
    readonly collection: string;
};

const DeleteFromCollection = ({ name, collection }: Props) => {
    const [overlay, setOverlay] = useState(false);

    const { updateCollectionsInApi } = useRequest();
    const dispatch = useDispatch();
    const collections = useSelector(getCollections);

    // @ts-ignore
    useEffect(() => {
        return () => handleDelete;
    });

    const handleDelete = async () => {
        const updatedCollections = collections.map(col => {
            if (col.name === collection) {
                return {
                    name: col.name,
                    gists: col.gists.filter(gist => gist !== name),
                };
            } else {
                return col;
            }
        });

        await updateCollectionsInApi(updatedCollections);
        dispatch(deleteFromCollection({ name: collection, gist: name }));
        setOverlay(false);
    };

    return (
        <Container>
            <span className='icon' onClick={() => setOverlay(true)}>
                +
            </span>
            {overlay && (
                <div className='overlay'>
                    <div className='confirm-box'>
                        <p>Are you sure to delete this Gist from ... ?</p>
                        <div className='confirm-buttons'>
                            <span className='confirm-button' onClick={() => handleDelete()}>
                                <IconConfirm />
                            </span>
                            <span className='confirm-button' onClick={() => setOverlay(false)}>
                                <IconCancel />
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default DeleteFromCollection;
