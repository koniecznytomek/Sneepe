import React from 'react';

// components
import DeleteGist from '../../../editors/DeleteGist/DeleteGist';

// router
import { NavLink, useParams } from 'react-router-dom';

// assets
import { IconAddFile, IconAddNote } from '../../../../assets/icons/Icons';

// styles
import { Container } from './BarTop.style';

type Props = {
    readonly hasNote: boolean;
};

const BarTop = ({ hasNote }: Props) => {
    const { id, collection } = useParams<{ id: string; collection: string }>();

    return (
        <Container>
            <div className="bar">
                <ul>
                    <li>
                        <NavLink to={`/gists/${collection}/${id}/addfile`} replace>
                            <IconAddFile />
                        </NavLink>
                    </li>
                    {hasNote ? (
                        <li>
                            <NavLink to={`/gists/${collection}/${id}/editnote`} replace>
                                <IconAddNote />
                            </NavLink>
                        </li>
                    ) : (
                        <li>
                            <NavLink to={`/gists/${collection}/${id}/addnote`} replace>
                                <IconAddNote />
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <DeleteGist />
                    </li>
                </ul>
            </div>
        </Container>
    );
};

export default BarTop;
