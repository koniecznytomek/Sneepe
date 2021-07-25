import React from 'react';

// styles
import { Container } from './EditDescription.style';

type Props = {
    readonly name: string;
};

const EditDescription = ({ name }: Props) => {
    return <Container>{name}</Container>;
};

export default EditDescription;
