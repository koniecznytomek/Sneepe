import React, { useEffect, useRef, useState } from 'react';
import { Container } from './Trash.style';
import { useSelector } from 'react-redux';
import { getGists } from '../../../../slices/gists/gistsSlice';
import { useRouteMatch } from 'react-router';

const Trash = () => {
    const [search, setSearch] = useState('');

    const gists = useSelector(getGists);
    const container = useRef<HTMLDivElement>(null);
    const match = useRouteMatch<any>();

    useEffect(() => {
        container.current?.scrollIntoView({
            block: 'start',
        });
    }, [match.params.id]);
    return <Container>Trashcan</Container>;
};

export default Trash;
