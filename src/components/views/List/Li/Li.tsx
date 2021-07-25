import React from 'react';
import { Container } from './Li.style';
import { NavLink } from 'react-router-dom';
import { setDragged } from '../../../../slices/gist/gistSlice';
import { IconLock } from '../../../../assets/icons/Icons';
import { useDispatch } from 'react-redux';
import DeleteFromCollection from '../../../editors/DeleteFromCollection/DeleteFromCollection';
import { Gists } from '../../../../slices/gists/types';

type Props = {
    readonly slug: string;
    readonly gist: Gists;
    readonly collection?: any;
};

const Li = ({ slug, gist, collection }: Props) => {
    const dispatch = useDispatch();

    // Gist title pattern check
    const hasTitle = gist.files.find(file => file.name.includes('.sneepe.md'));
    const title = hasTitle ? hasTitle.name.slice(0, -10).replace(/^[_]+/, '') : gist.files[0].name;

    const lang = [...new Set(gist.files.map(item => item.extension && item.extension.replace('.', '')))];

    return (
        <Container>
            <li>
                <NavLink
                    replace
                    to={`${slug}/${gist.name}`}
                    activeClassName="active"
                    draggable="true"
                    onDragStart={() =>
                        dispatch(
                            setDragged({
                                name: gist.name,
                                currentCollection: collection && collection.name,
                            })
                        )
                    }
                    onDragEnd={() => dispatch(setDragged({ name: '', currentCollection: '' }))}
                >
                    <span className="title">{title}</span>
                    <span className="date">{gist.updatedAt ? gist.updatedAt.substring(0, 10) : ''}</span>
                    <span className="desc">{gist.description}</span>
                    {lang &&
                        lang.map(
                            (extension, i) =>
                                extension && (
                                    <span className="lang" key={i}>
                                        {extension}
                                    </span>
                                )
                        )}
                    {!gist.isPublic && (
                        <span className="public">
                            <IconLock />
                        </span>
                    )}
                    {collection && (
                        <span className="delete">
                            <DeleteFromCollection name={gist.name} collection={collection.name} />
                        </span>
                    )}
                </NavLink>
            </li>
        </Container>
    );
};

export default Li;
