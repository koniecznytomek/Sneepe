import React from 'react';

// components
import AddCollection from '../../../editors/AddCollection/AddCollection';

// hooks
import useRequest from '../../../../api/useRequest';

// router
import { NavLink } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getDragged } from '../../../../slices/gist/gistSlice';
import { getGists } from '../../../../slices/gists/gistsSlice';
import { addToCollection, getCollections, deleteFromCollection } from '../../../../slices/collections/collectionsSlice';

// assets
import { IconFolder } from '../../../../assets/icons/Icons';

// styles
import { Container } from './Collections.style';

const Collections = () => {
    const dispatch = useDispatch();
    const gists = useSelector(getGists);
    const collections = useSelector(getCollections);
    const dragged = useSelector(getDragged);

    const { updateCollectionsInApi } = useRequest();

    const counter = (name: string) => {
        const collection = collections.find(item => item.name === name);
        return gists && gists.filter(col => collection && collection.gists.includes(col.name)).length;
    };

    const handleOnDrag = (e: React.DragEvent<HTMLLIElement>): void => e.preventDefault();

    const handleOnDrop = (chosenCollection: string, dragged: any) => {
        dispatch(addToCollection({ name: chosenCollection, gist: dragged.name }));

        if (dragged.currentCollection && dragged.currentCollection !== chosenCollection) {
            dispatch(
                deleteFromCollection({
                    name: dragged.currentCollection,
                    gist: dragged.name,
                })
            );
        }

        const updatedCollections = collections.map(collection => {
            if (collection.name === chosenCollection && !collection.gists.includes(dragged.name)) {
                return {
                    name: collection.name,
                    gists: [...collection.gists, dragged.name],
                };
            } else if (collection.name === dragged.currentCollection && collection.name !== chosenCollection) {
                return {
                    name: collection.name,
                    gists: collection.gists.filter(col => col !== dragged.name),
                };
            } else {
                return collection;
            }
        });
        if (updatedCollections) updateCollectionsInApi(updatedCollections);
    };

    return (
        <Container>
            <AddCollection />
            <ul>
                {collections?.map(item => (
                    <li
                        key={item.name}
                        onDrop={() => handleOnDrop(item.name, dragged)}
                        onDragOver={e => handleOnDrag(e)}
                    >
                        <NavLink to={`/gists/${item.name}`} activeClassName="active">
                            <IconFolder />
                            <span className="name">{item.name}</span>
                            <span className="counter">{counter(item.name)}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default Collections;
