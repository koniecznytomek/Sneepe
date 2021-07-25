import React, { useState } from 'react';

// components
import Snippet from '../Snippet/Snippet';
import EditFile from '../../../editors/EditFile/EditFile';

// types
import { Files } from '../../../../slices/gists/types';

// asstes
import { IconColEdit } from '../../../../assets/icons/Icons';

// styles
import { Container } from './File.style';

type Props = {
    readonly files: {
        readonly name: string;
        readonly text: string;
    }[];
    readonly file: Files;
    readonly name: string;
};

const File = ({ files, file, name }: Props) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Container>
            <div className={`file ${isEditing ? 'hidden' : ''}`}>
                <div className="title-bar">
                    <div className="title">
                        <p>{file.name}</p>
                    </div>
                    <div className="options">
                        <span className="editicon" onClick={() => setIsEditing(true)}>
                            <IconColEdit />
                        </span>
                    </div>
                </div>
                <div className="snippet">
                    <Snippet text={file.text} language={file.language} />
                </div>
            </div>
            {isEditing && (
                <div className="file-edit">
                    <EditFile name={name} file={file} files={files} trigger={(state: boolean) => setIsEditing(state)} />
                </div>
            )}
        </Container>
    );
};

export default File;
