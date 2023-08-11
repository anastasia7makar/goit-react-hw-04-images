import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isShowModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!isShowModal);
  };

  return (
    <li className={css.galleryItem} onClick={toggleModal}>
      <img src={webformatURL} alt={tags} className={css.galleryImg} />
      {isShowModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          toggleModal={toggleModal}
        />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
