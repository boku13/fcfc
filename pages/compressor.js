import React, { useState } from 'react';
import compressPDF from './compression.js';

export default function PDFCompressor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressionPercentage, setCompressionPercentage] = useState(0);
  const [compressedFile, setCompressedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCompressionChange = (event) => {
    const percentage = parseInt(event.target.value, 10);
    setCompressionPercentage(percentage);
  };

  const handleCompression = async () => {
    try {
      if (!selectedFile) {
        console.error('No file selected.');
        return;
      }

      const { name, type } = selectedFile;
      const { fileName, fileUrl } = await compressPDF(selectedFile, compressionPercentage);
      setCompressedFile({ name: fileName, url: fileUrl, type });

      // Reset the form
      setSelectedFile(null);
      setCompressionPercentage(0);
    } catch (error) {
      console.error('Error compressing PDF:', error);
    }
  };

  return (
    <div>
      <h2>PDF Compressor</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />

      <div>
        <label htmlFor="compressionPercentage">Compression Percentage:</label>
        <select id="compressionPercentage" value={compressionPercentage} onChange={handleCompressionChange}>
          <option value="0">No Compression</option>
          <option value="25">25%</option>
          <option value="50">50%</option>
          <option value="75">75%</option>
          <option value="90">90%</option>
        </select>
      </div>

      <button onClick={handleCompression}>Compress PDF</button>

      {compressedFile && (
        <div>
          <h3>Compressed File:</h3>
          <p>Filename: {compressedFile.name}</p>
          <p>Type: {compressedFile.type}</p>
          <a href={compressedFile.url} download={compressedFile.name}>
            Download Compressed PDF
          </a>
        </div>
      )}
    </div>
  );
}
