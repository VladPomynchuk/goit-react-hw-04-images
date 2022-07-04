import { GalleryItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ data, openModal }) => {
  const handleClick = () => {
    openModal(data.largeImageURL);
  };

  return (
    <GalleryItem onClick={handleClick}>
      <img src={data.webformatURL} alt={data.tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
