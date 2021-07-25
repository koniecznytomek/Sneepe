import React from 'react';

// components
import Collections from '../../views/Locations/Collections/Collections';
import BarBottom from '../../views/Locations/BarBottom/BarBottom';
import Folders from '../../views/Locations/Folders/Folders';

// styles
import { Container } from './Locations.style';

const Locations = () => {
    return (
        <Container>
            <Folders />
            <Collections />
            <BarBottom />
        </Container>
    );
};

export default Locations;
