import React from 'react';

// assets
import { IconSearch } from '../../../assets/icons/Icons';

// styles
import { Container } from './Search.style';

const Search = ({ handle }: any) => {
    return (
        <Container>
            <form>
                <span className="icon">
                    <IconSearch />
                </span>
                <input name="search" autoComplete="off" onChange={e => handle(e.target.value)} />
            </form>
        </Container>
    );
};

export default Search;
