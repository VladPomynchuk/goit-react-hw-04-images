import { createPortal } from 'react-dom';
import { Backdrop, ModalContent } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return function clearListener() {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalContent>{children}</ModalContent>
    </Backdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
