import React from 'react';

// components
import Search from '../../../features/Search/Search';
import EditCollection from '../../../editors/EditCollection/EditCollection';

// router
import { NavLink } from 'react-router-dom';

// styles
import { Container } from './BarTop.style';

type Props = {
    add?: any;
    edit?: any;
    setSearch: any;
};

const BarTop = ({ add = undefined, edit = undefined, setSearch }: Props) => {
    return (
        <Container>
            <div className="bar">
                <div className="top">
                    <div className="search">
                        <Search handle={(phrase: string) => setSearch(phrase)} />
                    </div>
                    <div className="add">{add && <NavLink to={`/gists/${add}/addgist`}>+</NavLink>}</div>
                </div>
                <div>{edit && <EditCollection name={edit} />}</div>
            </div>
        </Container>
    );
};

export default BarTop;
