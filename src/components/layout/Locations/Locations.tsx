import React from 'react';
import { Container } from './Locations.style';

import Collections from '../../views/Locations/Collections/Collections';
import BarBottom from '../../views/Locations/BarBottom/BarBottom';
import Folders from '../../views/Locations/Folders/Folders';

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
