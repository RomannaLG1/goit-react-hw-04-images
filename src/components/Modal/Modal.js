import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { ModalStyled, Overlay } from './Modal.styled';

export const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalStyled>
        <img src={src} alt="searchImage" />
      </ModalStyled>
    </Overlay>
  );
};

Modal.propsTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
