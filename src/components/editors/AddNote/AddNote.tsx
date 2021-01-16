import React from 'react';
import { Container } from './AddNote.style';

interface Props {
  name: string;
}
const AddNote = ({ name}: Props) => {
  return (
    <Container>
      <span>adding note - {name}</span>
    </Container>
  );
};

export default AddNote;
