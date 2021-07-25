import React, { useEffect, useRef, useState } from 'react';

// components
import BarTop from '../BarTop/BarTop';
import Li from '../Li/Li';

// router
import { Redirect, Route, useRouteMatch } from 'react-router';

// redux
import { useSelector } from 'react-redux';
import { getGists } from '../../../../slices/gists/gistsSlice';

// styles
import { Container } from './Starred.style';

const Starred = () => {
    const [search, setSearch] = useState('');

    const gists = useSelector(getGists);
    const container = useRef<HTMLDivElement>(null);
    const match = useRouteMatch<any>();

    useEffect(() => {
        container.current?.scrollIntoView({
            block: 'start',
        });
    }, [match.params.id]);

    return (
        <Container ref={container}>
            <BarTop setSearch={(phrase: string) => setSearch(phrase)} />
            <ul>
                {gists
                    ?.filter(
                        gist =>
                            gist.viewerHasStarred &&
                            (gist.files[0].name.toLowerCase().includes(search) ||
                                gist.description.toLowerCase().includes(search))
                    )
                    .map((gist, i) => (
                        <Li key={i} gist={gist} slug={match.path} />
                    ))}
            </ul>
            <Route exact path="/gists/allgists/">
                <Redirect to={`${match.path}/${gists[0] && gists[0].name}`} />
            </Route>
        </Container>
    );
};

export default Starred;
