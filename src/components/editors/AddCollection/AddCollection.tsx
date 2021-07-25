import React, { useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import useRequest from '../../../api/useRequest';
import { addCollection, getCollections } from '../../../slices/collections/collectionsSlice';

// assets
import { IconFolder } from '../../../assets/icons/Icons';

// styles
import { Container } from './AddCollection.style';

const AddCollection = () => {
    const [isAdding, setIsAdding] = useState(false);
    const { updateCollectionsInApi } = useRequest();

    const dispatch = useDispatch();
    const collections = useSelector(getCollections);

    const handleAddCollection = async (e: any) => {
        if (e.charCode === 13) {
            e.preventDefault();
            setIsAdding(false);

            dispatch(addCollection(e.target.value));
            const updatedCollections = [...collections, { name: e.target.value, gists: [] }];
            await updateCollectionsInApi(updatedCollections);
        }
    };

    return (
        <Container>
            <div className="add">
                <div className="form">
                    {isAdding && (
                        <span className="new">
                            <IconFolder />
                            <form>
                                <input
                                    autoFocus
                                    placeholder="Unnamed"
                                    onKeyPress={event => handleAddCollection(event)}
                                />
                            </form>
                        </span>
                    )}
                </div>
                <div className="button">
                    <span onClick={() => setIsAdding(!isAdding)} className={`${isAdding ? 'adding' : 'default'}`}>
                        +
                    </span>
                </div>
            </div>
        </Container>
    );
};

export default AddCollection;
