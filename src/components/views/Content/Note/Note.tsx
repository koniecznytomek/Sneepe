import React from 'react';
// components
import Markdown from '../../../features/Markdown/Markdown';

// styles
import { Container } from './Note.style';

type Props = {
    readonly text: string;
};

const Note = ({ text }: Props) => {
    return (
        <Container>
            <div className='note'>
                <Markdown text={text} />
            </div>
        </Container>
    );
};

export default Note;
