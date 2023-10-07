import classes from './ImageView.module.scss'
import PropTypes from 'prop-types';
import { Edit } from '../UI/SvgComponents/Edit';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { Accept } from '../UI/SvgComponents/Accept';
import { Cancel } from '../UI/SvgComponents/Cancel';

export const ImageName = ({imageData}) => {
    const [isEditing, setEditing] = useState(false)
    const [inputVaule, setInputValue] = useState(imageData.imageOriginalName)

    return (
        <div className={classes.Preview}>
            <div className={classes.ImageName}>
                {
                    isEditing
                    ?
                    <Form onSubmit={(e) => e.preventDefault()} className={classes.EditImageNameForm}>
                            <Form.Control
                                type="text"
                                value={inputVaule}
                                autoFocus={true}
                                onChange={(e) => setInputValue(e.target.value)}
                                className={classes.EditImageNameInput}
                            />
                            <div className={classes.Edit}><Accept/></div>
                            <div 
                                className={classes.Edit} 
                                style={{marginTop:'0.1rem'}}
                                onClick={() => setEditing(false)}
                            >
                                <Cancel/>
                            </div>
                    </Form>
                    :
                    <>
                    <div>{imageData.imageOriginalName}</div>
                    <div className={classes.Edit} onClick={() => setEditing(true)}>
                        <Edit />
                    </div>
                    </>
                }

            </div>
            <div
                className={classes.PreviewImage}
                style={{ backgroundImage: `url(${imageData.imageURL})` }}
            ></div>
        </div>
    );
};

ImageName.propTypes = {
    imageData: PropTypes.object,
}
