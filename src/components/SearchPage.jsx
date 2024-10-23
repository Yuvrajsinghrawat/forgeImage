import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; 
import './SearchPage.css';

function SearchPage({ setSelectedImage }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);

  const searchImages = async () => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=VDd1m1ZzWo9VWJ_v0_p6NvmFy8S612UXKM1biCMTt6I`,
      { params: { query: searchTerm } }
    );
    setImages(response.data.results);
  };

  return (
    <div className="search-page-container">
      <div className="contact-info">
        <h2>Name: Yuvraj Singh Rawat</h2>
        <h2>Email: yuvrajsinghrawat987@gmail.com</h2>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <h1>Search Page</h1>
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter your search term"
          />
          <button className="search-button" onClick={searchImages}>
            <FaSearch size={20} />
          </button>
        </div>
      </div>

      {/* Displaying the Images */}
      {images.length > 0 && (
        <div className="image-grid">
          {images.map((image) => (
            <div key={image.id} className="image-container">
              <img src={image.urls.small} alt={image.description} />
              <button className="add-caption-button" onClick={() => setSelectedImage(image.urls.regular)}>
                Add Caption
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
