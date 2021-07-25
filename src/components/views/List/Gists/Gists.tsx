import React, { useEffect, useRef, useState } from 'react';

// components
import Li from '../Li/Li';
import BarTop from '../BarTop/BarTop';

// router
import { Route, Redirect, useRouteMatch } from 'react-router';

// redux
import { useSelector } from 'react-redux';
import { getGists } from '../../../../slices/gists/gistsSlice';

// styles
import { Container } from './Gists.style';

const Gists = () => {
    const [search, setSearch] = useState('');

    const gists = useSelector(getGists);
    const container = useRef<HTMLDivElement>(null);
    const match = useRouteMatch<{ id: string }>();

    useEffect(() => {
        container.current &&
            container.current.scrollIntoView({
                block: 'start',
            });
    }, [match.params.id]);

    return (
        <Container ref={container}>
            <BarTop add={'allgists'} setSearch={(phrase: string) => setSearch(phrase)} />
            <ul>
                {gists
                    ?.filter(
                        gist =>
                            gist.files[0].name.toLowerCase().includes(search) ||
                            gist.description.toLowerCase().includes(search)
                    )
                    .map(gist => (
                        <Li key={gist.name} gist={gist} slug={match.path} />
                    ))}
            </ul>
            <Route exact path="/gists/allgists/">
                <Redirect to={`${match.path}/${gists[0] && gists[0].name}`} />
            </Route>
        </Container>
    );
};

export default Gists;
