import PropTypes from 'prop-types';

import { Modal } from 'components/Modal';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';


export const ImageGalleryItem =({previewImg, largeImg}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <>
        <GalleryItem onClick={() => setIsModalOpen(true)}>
          <GalleryItemImage src={previewImg} alt="searchImage" />
        </GalleryItem>
        {isModalOpen &&
          createPortal(
            <Modal
              src={largeImg}
              alt="searchImage"
              onClose={() => setIsModalOpen(false)}
            />,
            document.querySelector('#modal-root')
          )}
      </>
    );
  
}

ImageGalleryItem.propTypes = {
   previewImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};
