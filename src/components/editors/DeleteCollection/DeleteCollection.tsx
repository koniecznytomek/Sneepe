import React, { useState } from 'react';

import useApiRequest from '../../../hooks/useApiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { collectionsSelector, deleteCollection } from '../../../slices/collections/collectionsSlice';

import { Container } from './DeleteCollection.style';
import {
  IconCancel,
  IconColDelete,
  IconConfirm,
} from '../../../assets/icons/Icons';

interface Props {
  name: string;
}

const DeleteCollection = ({ name }: Props) => {
  const [overlay, setOverlay] = useState(false);

  const { updateCollectionsInApi } = useApiRequest();
  const dispatch = useDispatch();
  const collections = useSelector(collectionsSelector);

  const updatedCollections = collections.filter(
    collection => collection.name !== name
  );

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
        <div className='overlay'>
          <div className='confirm-box'>
            <p>Are you sure to delete {name} collection?</p>
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

export default DeleteCollection;