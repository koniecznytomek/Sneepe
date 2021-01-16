import React, { useState } from 'react';
import { Container } from './AddCollection.style';
import { IconFolder } from '../../../assets/icons/Icons';

import { useDispatch, useSelector } from 'react-redux';
import useApiRequest from '../../../hooks/useApiRequest';
import { addCollection, collectionsSelector } from '../../../slices/collections/collectionsSlice';

const AddCollection = () => {
  const [isAdding, setIsAdding] = useState(false);
  const { updateCollectionsInApi } = useApiRequest();

  const dispatch = useDispatch();
  const collections = useSelector(collectionsSelector);

  const handleAddCollection = async (e: any) => {
    if (e.charCode === 13) {
      e.preventDefault();
      setIsAdding(false);

      dispatch(addCollection(e.target.value));

      const updatedCollections = [
        ...collections,
        { name: e.target.value, gists: [] },
      ];

     await updateCollectionsInApi(updatedCollections);
    }
  };

  return (
    <Container>
      <div className='add'>
        <div className='form'>
          {isAdding && (
            <span className='new'>
              <IconFolder />
              <form>
                <input
                  autoFocus
                  placeholder='Unnamed'
                  onKeyPress={event => handleAddCollection(event)}
                />
              </form>
            </span>
          )}
        </div>
        <div className='button'>
          <span
            onClick={() => setIsAdding(!isAdding)}
            className={`${isAdding ? 'adding' : 'default'}`}
          >
            +
          </span>
        </div>
      </div>
    </Container>
  );
};

export default AddCollection;
