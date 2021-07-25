import React from 'react';

// components
import Gist from '../../views/Content/Gist/Gist';
import AddGist from '../../editors/AddGist/AddGist';

// router
import { Route, Switch } from 'react-router';

// styles
import { Container } from './Content.style';

const Content = () => {
    return (
        <Container>
            <Switch>
                <Route exact path="/gists" component={Gist} />
                <Route exact path={`/gists/:collection/addgist`} component={AddGist} />
                <Route exact path={`/gists/:collection/:id`} component={Gist} />
                <Route exact path={`/gists/:collection/:id/addfile`} component={Gist} />
                <Route exact path={`/gists/:collection/:id/addnote`} component={Gist} />
                <Route exact path={`/gists/:collection/:id/editnote`} component={Gist} />
                <Route exact path={`/gists/:collection/:id/editdescription`} component={Gist} />
            </Switch>
        </Container>
    );
};

export default Content;
