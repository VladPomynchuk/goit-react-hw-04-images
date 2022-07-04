import ImageGalleryItem from 'components/ImageGalleryItem';
import { useState } from 'react';
import { GalleryList } from './ImageGallery.styled';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageForModal, setImageForModal] = useState('');

  const modalToggle = () => {
    setShowModal(prevState => !prevState);
  };

  const openModal = image => {
    modalToggle();
    setImageForModal(image);
  };

  return (
    <GalleryList>
      {images.map(el => (
        <ImageGalleryItem key={el.id} data={el} openModal={openModal} />
      ))}
      {showModal && (
        <Modal onClose={modalToggle}>
          <img src={imageForModal} alt="requestImage" />
        </Modal>
      )}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

export default ImageGallery;
