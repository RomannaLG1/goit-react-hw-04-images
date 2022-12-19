import { useEffect, useState } from 'react';
import Box from './Box';
import * as API from './Helpers/api-service';
import { toast, ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [searchVaue, setSearchValue] = useState('');
  const [imageHits, setImageHits] = useState([]);
  const [page, setPage] = useState(null);
  const [totalImg, setTotalImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!searchVaue) {
        return;
      }
      try {
        setIsLoading(true);
        const { hits, totalHits } = await API.fetchImages(searchVaue, page);
        setImageHits(pS => [...pS, ...hits]);
        setTotalImg(totalHits);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [searchVaue, page]);

  const handleFormSubmit = searchValue => {
    setSearchValue(searchValue);
    setPage(1);
    setImageHits([]);
  };

  const handleLoadMore = () => setPage(ps => ps + 1);

  return (
    <Box display="grid" pb="24px" gridTemplateColumns="1fr" gridGap="16px">
      <Searchbar onFormSubmit={handleFormSubmit} />
      {error && toast.error('Something wrong...Try again')}
      {isLoading && <Loader />}
      {totalImg === 0 && !isLoading && toast.error('Sorry, no images found')}
      {imageHits.length > 0 && (
        <>
          <ImageGallery imageList={imageHits} />
          {imageHits.length < totalImg ? (
            <Button onClick={handleLoadMore} />
          ) : (
            toast.info('Sorry, no more images found')
          )}
        </>
      )}

      <ToastContainer autoClose={3000} />
    </Box>
  );
};
