import React, { useState } from 'react';

import useRequest from '../../../api/useRequest';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, deleteGist } from '../../../slices/gists/gistsSlice';
import {
  getCollections,
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
  } = useRequest();

  const dispatch = useDispatch();
  const collections = useSelector(getCollections);

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
      <span className='cancel' onClick={() => setOverlay(true)}>
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
