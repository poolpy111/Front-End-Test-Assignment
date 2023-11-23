import React, { useState } from 'react';
import './header.css';
import Modal from '../general/Modal';

const Header = ({ onTyping}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTyping = (event) => {
    const searchTerm = event.target.value;
    setIsTyping(searchTerm !== '');
    onTyping(searchTerm);
  };

  const handleAddSneaker = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <div className="left-content">
        <h1>Your collection</h1>
      </div>
      <div className="right-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="       Search"
            className="search-input"
            onChange={handleTyping}
          />
          {!isTyping && (
          <div className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z" fill="#CCCCCC"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M15.9429 15.9429C16.3334 15.5524 16.9666 15.5524 17.3571 15.9429L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L15.9429 17.3571C15.5524 16.9666 15.5524 16.3334 15.9429 15.9429Z" fill="#CCCCCC"/>
            </svg>
          </div>
        )}
        </div>
        <button className="add-sneaker-button" onClick={handleAddSneaker}>+ Add New Sneaker</button>
        {isModalOpen && <Modal isOpen={isModalOpen} onClose={handleCloseModal} />}
      </div>
    </header>
  );
};

export default Header;
