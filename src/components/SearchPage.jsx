import React, { useState } from "react";
import axios from "axios";
import '../App'

function SearchPage({ setSelectedImage }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);

//   const searchImages = async () => {
//     const response = await axios.get(`https://api.unsplash.com/search/photos`, {
//       params: { query: searchTerm },
//       headers: {
//         Authorization: `VDd1m1ZzWo9VWJ_v0_p6NvmFy8S612UXKM1biCMTt6I`,
//       },
//     });
//     setImages(response.data.results);
//   };
  const searchImages = async () => {
    const response = await axios.get(`https://api.unsplash.com/search/photos?client_id=VDd1m1ZzWo9VWJ_v0_p6NvmFy8S612UXKM1biCMTt6I`, {
      params: { query: searchTerm },
      headers: {
        Authorization: `VDd1m1ZzWo9VWJ_v0_p6NvmFy8S612UXKM1biCMTt6I`,
      },
    });
    setImages(response.data.results);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter your search term"
      />
      <button onClick={searchImages}>Search</button>

      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.urls.small} alt={image.description} />
            <button onClick={() => setSelectedImage(image.urls.regular)}>Add Caption</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
