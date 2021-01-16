import React, { useEffect, useState } from 'react';

import useApiRequest from '../../../hooks/useApiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { collectionsSelector, deleteFromCollection } from '../../../slices/collections/collectionsSlice';

import { Container } from './DeleteFromCollection.style';
import { IconCancel, IconConfirm } from '../../../assets/icons/Icons';

interface Props {
  name: string;
  collection: string;
}

const DeleteFromCollection = ({ name, collection }: Props) => {
  const [overlay, setOverlay] = useState(false);

  const { updateCollectionsInApi } = useApiRequest();
  const dispatch = useDispatch();
  const collections = useSelector(collectionsSelector);

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
              <span
                className='confirm-button'
                onClick={() => setOverlay(false)}
              >
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
