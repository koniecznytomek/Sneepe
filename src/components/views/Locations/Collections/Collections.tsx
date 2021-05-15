import React from 'react';
import { Container } from './Collections.style';
import { IconFolder } from '../../../../assets/icons/Icons';
import { NavLink } from 'react-router-dom';

import AddCollection from '../../../editors/AddCollection/AddCollection';
import useRequest from '../../../../api/useRequest';

import {
  addToCollection,
  getCollections,
  deleteFromCollection,
} from '../../../../slices/collections/collectionsSlice';

import { useDispatch, useSelector } from 'react-redux';
import { getDragged } from '../../../../slices/gist/gistSlice';
import { getGists } from '../../../../slices/gists/gistsSlice';

const Collections = () => {
  const dispatch = useDispatch();
  const gists = useSelector(getGists);
  const collections = useSelector(getCollections);
  const dragged = useSelector(getDragged);

  const { updateCollectionsInApi } = useRequest();

  const counter = (name: string) => {
    const collection = collections.find(item => item.name === name);
    return (
      gists &&
      gists.filter(col => collection && collection.gists.includes(col.name))
        .length
    );
  };

  const handleOnDrag = (e: React.DragEvent<HTMLLIElement>): void =>
    e.preventDefault();

  const handleOnDrop = (chosenCollection: string, dragged: any) => {
    // @param {string} chosenCollection - is where dragged collection is dropped
    // @param {Array} dragged - contains dragged gist .name & .currentCollection as collection where from gist was
    // dragged

    dispatch(addToCollection({ name: chosenCollection, gist: dragged.name }));

    // if gist are moved to another collection, remove him from previous collection
    if (
      dragged.currentCollection &&
      dragged.currentCollection !== chosenCollection
    ) {
      dispatch(
        deleteFromCollection({
          name: dragged.currentCollection,
          gist: dragged.name,
        })
      );
    }

    // prepare current collection state to send it to the api
    const updatedCollections = collections.map(collection => {
      if (
        collection.name === chosenCollection &&
        !collection.gists.includes(dragged.name)
      ) {
        return {
          name: collection.name,
          gists: [...collection.gists, dragged.name],
        };
      } else if (
        collection.name === dragged.currentCollection &&
        collection.name !== chosenCollection
      ) {
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
        {collections.map((col, i) => (
          <li
            key={i}
            onDrop={() => handleOnDrop(col.name, dragged)}
            onDragOver={e => handleOnDrag(e)}
          >
            <NavLink to={`/gists/${col.name}`} activeClassName='active'>
              <IconFolder />
              <span className='name'>{col.name}</span>
              <span className='counter'>{counter(col.name)}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Collections;
