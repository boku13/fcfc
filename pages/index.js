import { useState } from 'react';
import Conversion from './conversion';

export default function Home() {
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#3edae6] to-[#dc33a7]">
    <h1 className="text-4xl font-bold mb-8 text-white">Image to PDF Converter</h1>
    <div className="flex items-center">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="file-input"
        onChange={handleImageChange}
      />
      <label
        htmlFor="file-input"
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded cursor-pointer transition-colors duration-300 hover:bg-blue-600"
      >
        Select Image
      </label>
    </div>
    {imageFile && <Conversion imageFile={imageFile} />}
  </div>
  );
}


