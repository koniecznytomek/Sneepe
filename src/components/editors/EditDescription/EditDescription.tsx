import React from 'react';
import { Container } from './EditDescription.style';

interface Props {
  name: string;
}

const EditDescription = ({name}: Props) => {
  return (
    <Container>
      {name}
    </Container>
  );
};

export default EditDescription;
