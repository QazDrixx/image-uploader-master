import classes from './ImageView.module.scss'
import PropTypes from 'prop-types';
import { Edit } from '../UI/SvgComponents/Edit';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { Accept } from '../UI/SvgComponents/Accept';
import { Cancel } from '../UI/SvgComponents/Cancel';
import { updateImage } from '../../services/axios';

export const ImageName = ({imageData}) => {
    const [isEditing, setEditing] = useState(false)
    const [imageName, setImageName] = useState(imageData.imageOriginalName)

    const handleSubmit = async(e) => {
        e.preventDefault()
        await updateImage(imageData._id, {imageOriginalName:imageName})
        setEditing(false)
    }

    return (
        <div className={classes.Preview}>
            <div className={classes.ImageName}>
                {
                    isEditing
                    ?
                    <Form onSubmit={handleSubmit} 
                    className={classes.EditImageNameForm}>
                            <Form.Control
                                type="text"
                                value={imageName}
                                autoFocus={true}
                                onChange={(e) => setImageName(e.target.value)}
                                className={classes.EditImageNameInput}
                            />
                            <button type='submit' className={`${classes.Edit} ${classes.blankButton}`}><Accept/></button>
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
                    <div title='Image name'>{imageName}</div>
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
