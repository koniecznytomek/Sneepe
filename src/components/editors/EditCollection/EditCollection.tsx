import React, { useEffect, useState } from 'react';

// components
import DeleteCollection from '../DeleteCollection/DeleteCollection';

// hooks
import useRequest from '../../../api/useRequest';

// router
import { useHistory } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getCollections, renameCollection } from '../../../slices/collections/collectionsSlice';

// assets
import { IconColEdit, IconFolder } from '../../../assets/icons/Icons';

// styles
import { Container } from './EditCollection.style';

const EditCollection = ({ name }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState(name);

    const { updateCollectionsInApi } = useRequest();
    const history = useHistory();

    const dispatch = useDispatch();
    const collections = useSelector(getCollections);

    useEffect(() => {
        setData(name);
    }, [name]);

    const handleChange = (e: any) => {
        e.preventDefault();
        setData(e.target.value);
    };

    const handleSave = async (e: any) => {
        if (e.charCode === 13) {
            e.preventDefault();
            setIsEditing(false);
            history.push(`/gists/${data}`);

            dispatch(renameCollection({ name: name, newName: data }));

            const renamedCollection = collections.map(collection => {
                if (collection.name === name) {
                    return {
                        name: data,
                        gists: [...collection.gists],
                    };
                } else {
                    return collection;
                }
            });

            await updateCollectionsInApi(renamedCollection);
        }
    };

    return (
        <Container>
            <div className="name">
                {isEditing ? (
                    <>
                        <div className="icon">
                            <IconFolder />
                        </div>
                        <form>
                            <input
                                name="name"
                                value={data}
                                autoComplete="off"
                                autoFocus
                                onChange={e => handleChange(e)}
                                onKeyPress={e => handleSave(e)}
                            />
                        </form>
                    </>
                ) : (
                    <div className="folder">
                        <IconFolder />
                        <span>{name}</span>
                    </div>
                )}
            </div>
            <div className="options">
                {isEditing && <DeleteCollection name={name} />}
                <span onClick={() => setIsEditing(!isEditing)}>
                    <IconColEdit />
                </span>
            </div>
        </Container>
    );
};

export default EditCollection;
