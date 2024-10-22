import React, { useState } from "react";
import SearchPage from "./components/SearchPage";
import EditPage from "./components/EditPage";
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="App">
      {!selectedImage ? (
        <SearchPage setSelectedImage={setSelectedImage} />
      ) : (
        <EditPage image={selectedImage} />
      )}
    </div>
  );
}

export default App;
