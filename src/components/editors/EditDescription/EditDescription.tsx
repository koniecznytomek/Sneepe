import React from 'react';

// styles
import { Container } from './EditDescription.style';

type Props = {
    readonly name: string;
    readonly description: string;
};

const EditDescription = ({ name, description }: Props) => {
    const handleSave = () => {};
    const handleCancel = () => {};
    return (
        <Container>
            <div className="description">
                <textarea name="text" defaultValue={description} rows={10} />
            </div>

            <div className="buttons">
                <span className="save" onClick={handleSave}>
                    save
                </span>
                <span className="cancel" onClick={handleCancel}>
                    cancel
                </span>
            </div>
        </Container>
    );
};

export default EditDescription;
