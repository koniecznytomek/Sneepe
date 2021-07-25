import React, { useEffect, useRef, useState } from 'react';

// components
import Li from '../Li/Li';
import BarTop from '../BarTop/BarTop';

// routes
import { Redirect, Route, useRouteMatch } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';
import { getCollections } from '../../../../slices/collections/collectionsSlice';
import { getGists } from '../../../../slices/gists/gistsSlice';

// styles
import { Container } from './Collections.style';

const Collections = () => {
    const [search, setSearch] = useState<string>('');

    const container = useRef<HTMLDivElement>(null);
    const match = useRouteMatch<{ id: string }>();

    useEffect(() => {
        container.current?.scrollIntoView({
            block: 'start',
        });
    }, [match.params.id]);

    const gists = useSelector(getGists);
    const collections = useSelector(getCollections);

    const collection = collections && collections.find(item => item.name === match.params.id);

    const result = gists?.filter(
        item =>
            collection &&
            collection.gists.includes(item.name) &&
            (item.files[0].name.toLowerCase().includes(search) || item.description.toLowerCase().includes(search))
    );

    return (
        <Container ref={container}>
            <BarTop add={match.params.id} edit={match.params.id} setSearch={(phrase: string) => setSearch(phrase)} />
            <ul>
                {result?.map((gist, i) => (
                    <Li key={i} gist={gist} slug={match.url} collection={collection} />
                ))}
                {!result.length && (
                    <li className="nofound">
                        <p>No gists found.</p>
                    </li>
                )}
            </ul>
            {result && (
                <Route exact path={`/gists/${match.params.id}/`}>
                    <Redirect to={`/gists/${match.params.id}/${result[0] && result[0].name}`} />
                </Route>
            )}
        </Container>
    );
};

export default Collections;
