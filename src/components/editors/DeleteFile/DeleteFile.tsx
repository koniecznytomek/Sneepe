import React, { useState } from 'react';

import useApiRequest from '../../../hooks/useApiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, deleteGist } from '../../../slices/gists/gistsSlice';
import {
  collectionsSelector,
  addCollections,
} from '../../../slices/collections/collectionsSlice';
import { Files } from '../../../slices/gists/types';

import { Container } from './DeleteFile.style';
import { IconCancel, IconConfirm } from '../../../assets/icons/Icons';

interface Props {
  name: string;
  filename: string;
  files: Files[];
}

const DeleteFile = ({ name, filename, files }: Props) => {
  const [overlay, setOverlay] = useState(false);

  const {
    deleteFileFromApi,
    deleteGistFromApi,
    updateCollectionsInApi,
  } = useApiRequest();

  const dispatch = useDispatch();

  const collections = useSelector(collectionsSelector);

  // if gist will be deleted, we almost must delete him from all collections
  const updatedCollections = collections.map(col => {
    if (col.gists.includes(name)) {
      return {
        name: col.name,
        gists: col.gists.filter(gist => gist !== name),
      };
    } else {
      return {
        name: col.name,
        gists: col.gists,
      };
    }
  });

  const counter = files.length;

  const handleDelete = async () => {
    if (counter > 1) {
      try {
        deleteFileFromApi(name, filename).then(() => {
          dispatch(deleteFile({ name, filename }));
          setOverlay(false);
        });
      } catch (error) {
        setOverlay(false);
        console.log(error);
      }
    } else {
      try {
        deleteGistFromApi(name).then(() => {
          dispatch(addCollections(updatedCollections));
          updateCollectionsInApi(updatedCollections);
          dispatch(deleteGist(name));
          setOverlay(false);
        });
      } catch (error) {
        setOverlay(false);
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <span className='delete' onClick={() => setOverlay(true)}>
        Delete
      </span>
      {overlay && (
        <div className='overlay'>
          <div className='confirm-box'>
            {counter > 1 ? (
              <p>Are you sure to delete this File?</p>
            ) : (
              <p>Are you sure to delete this Gist?</p>
            )}
            ;
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

export default DeleteFile;
