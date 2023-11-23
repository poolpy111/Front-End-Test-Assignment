import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import './mainpage.css';
import searchBetter from '../../assets/search_better.svg';
import noSneaker from '../../assets/no_sneaker.png';
import { getAllItems, searchSneaker } from '../../utils/api';
import SneakerBox from '../general/SneakerBox';

const MainPage = () => {
  const [displayNoCollection, setDisplayNoCollection] = useState(true);
  const [sneakerDetails, setSneakerDetails] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sortBy, setSortBy] = useState('year');

  useEffect(() => {
    getAllSneakers();
  }, [searchResults]);

  const getAllSneakers = async (sortBy = 'year') => {
    try {
      const details = await getAllItems(sortBy);
      
      if (details.length > 0) {
        setSneakerDetails(details);
        setDisplayNoCollection(false);
      } else {
        setDisplayNoCollection(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setDisplayNoCollection(true);
    }
  };

  const handleSortByYear = () => {
    getAllSneakers('year');
    setSortBy('year');
  };

  const handleSortBySize = () => {
    getAllSneakers('size');
    setSortBy('size');
  };

  const handleSortByPrice = () => {
    getAllSneakers('price');
    setSortBy('price');
  };

  const handleSearch = async (searchTerm) => {
    try {
      setIsTyping(!!searchTerm);

      if (searchTerm) {
        const results = await searchSneaker(searchTerm);
        setSearchResults(results);
        setDisplayNoCollection(results.length === 0);
      } else {
        setSearchResults([]);
        setDisplayNoCollection(sneakerDetails.length === 0);
      }
    } catch (error) {
      console.error('Error searching sneakers:', error);
    }
  };

  return (
    <div>
      <Header onTyping={handleSearch} />
      <div className="main-body">
        <div className="sort-container">
          <span>Sort by:</span>
          <div className="sort-buttons">
            <button
              className={`oldest-year-button ${sortBy === 'year' ? 'active' : ''}`}
              onClick={handleSortByYear}
            >
              <svg className='sorting-icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <svg className='sorting-icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12.6667 2.6665H3.33333C2.59695 2.6665 2 3.26346 2 3.99984V13.3332C2 14.0696 2.59695 14.6665 3.33333 14.6665H12.6667C13.403 14.6665 14 14.0696 14 13.3332V3.99984C14 3.26346 13.403 2.6665 12.6667 2.6665Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.6665 1.3335V4.00016" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.3335 1.3335V4.00016" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 6.6665H14" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
              </svg>
              Oldest Year
            </button>
            <button
              className={`smallest-size-button ${sortBy === 'size' ? 'active' : ''}`}
              onClick={handleSortBySize}
            >
              <svg className='sorting-icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <svg className='sorting-icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1365 3.46967C10.4294 3.17678 10.9043 3.17678 11.1972 3.46967L15.1972 7.46967C15.4901 7.76256 15.4901 8.23744 15.1972 8.53033L11.1972 12.5303C10.9043 12.8232 10.4294 12.8232 10.1365 12.5303C9.84361 12.2374 9.84361 11.7626 10.1365 11.4697L13.6062 8L10.1365 4.53033C9.84361 4.23744 9.84361 3.76256 10.1365 3.46967Z" fill="#191919"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.86383 3.46967C6.15672 3.76256 6.15672 4.23744 5.86383 4.53033L2.39416 8L5.86383 11.4697C6.15672 11.7626 6.15672 12.2374 5.86383 12.5303C5.57093 12.8232 5.09606 12.8232 4.80317 12.5303L0.803166 8.53033C0.510273 8.23744 0.510273 7.76256 0.803166 7.46967L4.80317 3.46967C5.09606 3.17678 5.57093 3.17678 5.86383 3.46967Z" fill="#191919"/>
              </svg>
              </svg>
              Smallest Size
            </button>
            <button
              className={`price-button ${sortBy === 'price' ? 'active' : ''}`}
              onClick={handleSortByPrice}
            >
              <svg className='sorting-icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <svg className='sorting-icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clip-path="url(#clip0_2687_754)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 0.666504C8.75 0.25229 8.41421 -0.0834961 8 -0.0834961C7.58579 -0.0834961 7.25 0.25229 7.25 0.666504V2.5835H6.33333C5.51558 2.5835 4.73132 2.90835 4.15309 3.48658C3.57485 4.06482 3.25 4.84908 3.25 5.66683C3.25 6.48458 3.57485 7.26884 4.15309 7.84708C4.73132 8.42531 5.51558 8.75016 6.33333 8.75016H7.25V11.9168H4C3.58579 11.9168 3.25 12.2526 3.25 12.6668C3.25 13.081 3.58579 13.4168 4 13.4168H7.25V15.3332C7.25 15.7474 7.58579 16.0832 8 16.0832C8.41421 16.0832 8.75 15.7474 8.75 15.3332V13.4168H9.66667C10.4844 13.4168 11.2687 13.092 11.8469 12.5137C12.4252 11.9355 12.75 11.1512 12.75 10.3335C12.75 9.51575 12.4252 8.73149 11.8469 8.15325C11.2687 7.57501 10.4844 7.25016 9.66667 7.25016H8.75V4.0835H11.3333C11.7475 4.0835 12.0833 3.74771 12.0833 3.3335C12.0833 2.91928 11.7475 2.5835 11.3333 2.5835H8.75V0.666504ZM7.25 4.0835H6.33333C5.91341 4.0835 5.51068 4.25031 5.21375 4.54724C4.91682 4.84418 4.75 5.2469 4.75 5.66683C4.75 6.08676 4.91682 6.48948 5.21375 6.78642C5.51068 7.08335 5.91341 7.25016 6.33333 7.25016H7.25V4.0835ZM8.75 8.75016V11.9168H9.66667C10.0866 11.9168 10.4893 11.75 10.7863 11.4531C11.0832 11.1562 11.25 10.7534 11.25 10.3335C11.25 9.91357 11.0832 9.51084 10.7863 9.21391C10.4893 8.91698 10.0866 8.75016 9.66667 8.75016H8.75Z" fill="#191919"/>
                </g>
                <defs>
                <clipPath id="clip0_2687_754">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
              </svg>
              </svg>
              Lowest Price
            </button>
          </div>
        </div>
        {isTyping && (
          <div className="sneaker-grid">
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((sneaker, index) => (
                <SneakerBox key={index} sneaker={sneaker} />
              ))
            ) : (
              <div className="search-results-not-found">
                <img src={searchBetter} alt="Search Better" />
                <p>Search better.</p>
                <p>There is nothing like this in your collection.</p>
            </div>
            )}
          </div>
        )}
        {!isTyping && !displayNoCollection && (
          <div className="sneaker-grid">
            {sneakerDetails.map((sneaker, index) => (
              <SneakerBox key={index} sneaker={sneaker} />
            ))}
          </div>
        )}
        {!isTyping && displayNoCollection && (
          <div className="no-collection">
            <img src={noSneaker} alt="No collections" />
            <div>
              <p>Seems like you still didn't add</p>
              <p>any new sneaker to your collection</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
