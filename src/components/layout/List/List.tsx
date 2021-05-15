import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from './List.style';
import Gists from '../../views/List/Gists/Gists';
import Collections from '../../views/List/Collections/Collections';
import Trash from '../../views/List/Trash/Trash';
import Starred from '../../views/List/Starred/Starred';

const List = () => {
  return (
    <Container>
      <Switch>
        <Route path='/gists/allgists' component={Gists} />
        <Route path='/gists/starred' component={Starred} />
        <Route path='/gists/trash' component={Trash} />
        <Route path='/gists/:id' component={Collections} />
      </Switch>
    </Container>
  );
};

export default List;
