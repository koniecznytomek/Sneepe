import React, { useState } from 'react';
import { Container } from './File.style';
import Snippet from '../Snippet/Snippet';
import EditFile from '../../../editors/EditFile/EditFile';
import { IconColEdit } from '../../../../assets/icons/Icons';
import { Files } from '../../../../slices/gists/types';

interface Props {
  files: {
    name: string;
    text: string;
  }[];
  file: Files;
  name: string;
}

const File = ({ files, file, name }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Container>
      <div className={`file ${isEditing ? 'hidden' : ''}`}>
        <div className='title-bar'>
          <div className='title'>
            <p>{file.name}</p>
          </div>
          <div className='options'>
            <span className='editicon' onClick={() => setIsEditing(true)}>
              <IconColEdit />
            </span>
          </div>
        </div>
        <div className='snippet'>
          <Snippet text={file.text} language={file.language} />
        </div>
      </div>
      {isEditing && (
        <div className='file-edit'>
          <EditFile
            name={name}
            file={file}
            files={files}
            trigger={(state: boolean) => setIsEditing(state)}
          />
        </div>
      )}
    </Container>
  );
};

export default File;
