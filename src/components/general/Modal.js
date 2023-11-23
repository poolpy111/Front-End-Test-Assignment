import React, { useEffect, useState } from 'react';
import { createItem, updateItem } from '../../utils/api';
import './modal.css';

const closeIconSVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z" fill="#191919"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#191919"/>
  </svg>
);

const StarRating = ({ selectedRating, onRatingChange }) => {
  const handleRatingClick = (rating) => {
    onRatingChange(rating);
  };

  return (
    <div className="star-rating" style={{ fontSize: '24px', marginBottom: '20px' }}>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={ratingValue}
            onClick={() => handleRatingClick(ratingValue)}
            style={{
              color:
                selectedRating >= ratingValue ? 'black' : 'gray',
              cursor: 'pointer'
            }}
          >
            {selectedRating >= ratingValue ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
};

const Modal = ({ isOpen, onClose, sneaker }) => {
  const [_id, setId] = useState(sneaker ? sneaker._id : '');
  const [name, setName] = useState(sneaker ? sneaker.name : '');
  const [brand, setBrand] = useState(sneaker ? sneaker.brand : '');
  const [price, setPrice] = useState(sneaker ? sneaker.price : '');
  const [size, setSize] = useState(sneaker ? sneaker.size : '');
  const [year, setYear] = useState(sneaker ? sneaker.year : '');
  const [rating, setRating] = useState(0);
  const [formWarning, setFormWarning] = useState('');
  
  const isEditMode = !!sneaker;

  const handleCloseModal = (event) => {
    event.stopPropagation();
    onClose();
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !brand || !price || !size || !year) {
      setFormWarning('Please fill in all required fields.');
      return;
    }

    try {
      if (isEditMode) {
        await handleUpdate();
      } else {
        await handleCreate();
      }

      setFormWarning('');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating/creating item:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const itemData = { name, brand, price, size, year, rating };
      await createItem(itemData);
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  };

  const handleUpdate = async () => {
    try {
      const itemData = { _id, name, brand, price, size, year, rating };
      await updateItem(itemData);
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27 && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, sneaker]);

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-background" onClick={handleCloseModal}></div>
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h1>Add Sneakers</h1>
                <h1>to your collection</h1>
              </div>
              <button className="close-modal" onClick={handleCloseModal}>
                {closeIconSVG}
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="brand">Brand:</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="size">Size US:</label>
                  <input
                    type="text"
                    id="size"
                    name="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="year">Year:</label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                  <StarRating selectedRating={rating} onRatingChange={handleRatingChange} />
                </div>
                {formWarning && <p className="form-warning">{formWarning}</p>}
                {isEditMode && (
                <button type="submit" className="update-button">
                  Save
                </button>
              )}
              {!isEditMode && (
                <button type="submit" className="submit-button">
                  Add new sneakers
                </button>
              )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
