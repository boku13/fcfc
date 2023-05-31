// import React, { useState } from 'react';
// import compressPDF from './compression.js';

// const Compressor = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [compressionRate, setCompressionRate] = useState(0);
//   const [compressedFile, setCompressedFile] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleCompressionRateChange = (event) => {
//     const rate = parseInt(event.target.value, 10);
//     setCompressionRate(rate);
//   };

//   const handleCompression = async () => {
//     try {
//       if (!selectedFile) {
//         console.error('No file selected.');
//         return;
//       }

//       const compressedData = await compressPDF(selectedFile, compressionRate);
//       setCompressedFile(compressedData);

//       // Reset the form
//       setSelectedFile(null);
//       setCompressionRate(0);
//     } catch (error) {
//       console.error('Error compressing PDF:', error);
//     }
//   };

//   const handleDownload = () => {
//     const { fileName, fileUrl } = compressedFile;
//     const link = document.createElement('a');
//     link.href = fileUrl;
//     link.download = fileName;
//     link.click();
//   };

//   return (
//     <div>
//       <h2>PDF Compressor</h2>
//       <input type="file" accept=".pdf" onChange={handleFileChange} />

//       <div>
//         <label htmlFor="compressionRate">Compression Rate:</label>
//         <select id="compressionRate" value={compressionRate} onChange={handleCompressionRateChange}>
//           <option value="0">No Compression</option>
//           <option value="25">25%</option>
//           <option value="50">50%</option>
//           <option value="75">75%</option>
//           <option value="90">90%</option>
//         </select>
//       </div>

//       <button onClick={handleCompression}>Compress PDF</button>

//       {compressedFile && (
//         <div>
//           <h3>Compressed File:</h3>
//           <p>Filename: {compressedFile.fileName}</p>
//           <button onClick={handleDownload}>Download Compressed PDF</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Compressor;




