import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import PropTypes from 'prop-types';


export const ModalWindow = ({title, agreeButtonText, disagreeButtonText, showModalBtn, callback}) => {
    const [showModal, setShowModal] = useState(false)

    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <>
        <div onClick={() => setShowModal(true)}>{showModalBtn}</div>
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    {disagreeButtonText}
                </Button>
                <Button variant="secondary" onClick={() => {
                    callback()
                    handleClose()
                }}>
                    {agreeButtonText}
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};


ModalWindow.propTypes = {
    title: PropTypes.string,
    agreeButtonText: PropTypes.string,
    disagreeButtonText: PropTypes.string,
    showModalBtn: PropTypes.any,
    callback: PropTypes.func,
  };