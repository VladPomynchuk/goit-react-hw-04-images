import Searchbar from 'components/Searchbar';
import { useState, useEffect } from 'react';
import ImageGallery from 'components/ImageGallery';
import { getImages } from '../../service/api';
import { StyledFinder, Spinner } from './ImageFinder.styled';
import ButtonLoadMore from 'components/ButtonLoadMore';
import { TailSpin } from 'react-loader-spinner';

const ImageFinder = () => {
  const [request, setRequest] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (request !== '') {
      async function fetchImages() {
        loadingToggle();
        const response = await getImages(request, page);

        if (response) {
          setTotalHits(response.totalHits);
          updateImages(response.imagesArray);
        }

        loadingToggle();
      }
      fetchImages();
    }
  }, [request, page]);

  const loadingToggle = () => {
    setLoading(prevState => !prevState);
  };

  const onSubmit = value => {
    if (value !== request) {
      setRequest(value);
      setImages([]);
      setPage(1);
    }
  };

  const updateImages = newImages => {
    setImages(prevState => [...prevState, ...newImages]);
  };

  const incrementPage = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <StyledFinder>
      <Searchbar onSubmit={onSubmit} />
      {images.length > 0 && (
        <>
          <ImageGallery images={images} />
          {!loading && images.length !== totalHits && (
            <ButtonLoadMore onClick={incrementPage} />
          )}
        </>
      )}
      {loading && (
        <Spinner>
          <TailSpin
            color="#16aee0"
            height="50"
            width="50"
            ariaLabel="loading"
          />
        </Spinner>
      )}
    </StyledFinder>
  );
};

export default ImageFinder;
