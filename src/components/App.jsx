import { useCallback, useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchGallery } from '../services/getImages';
import css from '../components/App.module.css';
import Seachbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const initialPagination = {
  galleryPage: 1,
  currentQuantity: 0,
  totalHits: 0,
};

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  const fetchGalleryItems = async (
    query,
    isLoadMore = false,
    currentQuantity = 0,
    galleryPage = 1
  ) => {
    try {
      setLoading(true);

      const {
        data: { totalHits, hits },
      } = await fetchGallery(query, galleryPage);

      if (!totalHits) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (galleryPage === 1)
        Notify.success(`Hooray! We found ${totalHits} images.`);

      setGalleryItems(isLoadMore ? [...galleryItems, ...hits] : hits);

      setPagination({
        currentQuantity: currentQuantity + hits.length,
        galleryPage: galleryPage + 1,
        totalHits,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    value => {
      window.scrollTo({ top: 0 });
      setSearchText(value);
      fetchGalleryItems(value, false, 0, 1);
    },
    [searchText, pagination]
  );

  const onLoadMore = useCallback(
    () =>
      fetchGalleryItems(
        searchText,
        true,
        pagination.currentQuantity,
        pagination.galleryPage
      ),
    [searchText, pagination]
  );

  return (
    <div className={css.app}>
      <Seachbar handleSearch={handleSearch} />
      {galleryItems.length > 0 && <ImageGallery galleryItems={galleryItems} />}
      {loading && <Loader />}
      {pagination.currentQuantity !== 0 &&
        pagination.currentQuantity < pagination.totalHits && (
          <Button handleClick={onLoadMore} />
        )}
    </div>
  );
};
