import React, { useEffect, useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, handleClose, children }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [isOpen]);

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    if (!isOpen && !show) return null;

    return (
        <div
            className={`modal ${show ? 'show' : ''}`}
            onClick={handleBackgroundClick}
        >
            <div className={`modal-content ${show ? 'show' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
