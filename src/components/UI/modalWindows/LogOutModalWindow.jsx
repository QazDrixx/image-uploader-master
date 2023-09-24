import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useLogOut } from '../../../hooks/useLogOut'

export const LogOutModalWindow = () => {
    const [showLogOutModal, setShowLogOutModal] = useState(false)
    const logOut = useLogOut()
    const handleClose = () => {
        setShowLogOutModal(false)
    }

    return (
        <>
        <div onClick={() => setShowLogOutModal(true)}>Log out</div>
            <Modal show={showLogOutModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you really want to leave?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Stay
                    </Button>
                    <Button variant="secondary" onClick={() => {
                        logOut()
                        handleClose()
                    }}>
                        Log Out
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
