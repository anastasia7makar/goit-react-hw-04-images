import { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchGallery } from '../services/getImages';
import css from '../components/App.module.css';
import Seachbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [totalHits, setTotalHIts] = useState(0);
  const [loading, setLoading] = useState(false);

  const maxPage = Math.ceil(totalHits / 12);
  const showButton = galleryItems.length > 0 && galleryPage < maxPage;

  const fetchGalleryItems = async (query, galleryPage = 1) => {
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

      setGalleryItems([...galleryItems, ...hits]);
      setTotalHIts(totalHits);
      setCurrentQuantity(currentQuantity + hits.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText !== '') {
      fetchGalleryItems(searchText, galleryPage);
    }
  }, [searchText, galleryPage]);

  const handleSearch = value => {
    window.scrollTo({ top: 0 });

    setGalleryPage(1);
    setGalleryItems([]);
    setSearchText(value);
  };

  const onLoadMore = () => {
    setGalleryPage(galleryPage + 1);
  };

  return (
    <div className={css.app}>
      <Seachbar handleSearch={handleSearch} />
      {galleryItems.length > 0 && <ImageGallery galleryItems={galleryItems} />}
      {loading && <Loader />}
      {showButton && <Button handleClick={onLoadMore} />}
    </div>
  );
};
