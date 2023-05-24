// import { PDFDocument, PDFName, PDFNumber, PDFArray, PDFString, PDFRef } from 'pdf-lib';

// export default async function compressPDF(file, compressionPercentage) {
//   try {
//     const inputBuffer = await file.arrayBuffer();
//     const pdfDoc = await PDFDocument.load(inputBuffer);

//     const pages = pdfDoc.getPages();
//     const compressionLevel = Math.round(compressionPercentage / 100 * 9);

//     for (let i = 0; i < pages.length; i++) {
//       const page = pages[i];
//       const contentStreamRefs = page.getContents();
      
//       if (contentStreamRefs instanceof PDFArray) {
//         // If contentStreamRefs is an array of stream references
//         const compressedStreams = [];
        
//         for (let j = 0; j < contentStreamRefs.size(); j++) {
//           const streamRef = contentStreamRefs.get(j);
//           const stream = pdfDoc.context.lookup(streamRef);

//           if (stream instanceof PDFRef) {
//             const streamDict = stream.dict;
//             const filterName = PDFName.of('Filter');
//             const decodeParmsName = PDFName.of('DecodeParms');
//             const filters = streamDict.get(filterName);

//             if (filters instanceof PDFArray) {
//               const decodeParams = streamDict.get(decodeParmsName) || pdfDoc.context.obj({});
//               const filterCount = Math.ceil(filters.size() / 2);

//               filters.clear();
//               decodeParams.clear();

//               for (let k = 0; k < filterCount; k++) {
//                 filters.push(PDFName.of('FlateDecode'));
//                 decodeParams.push(PDFString.fromString(`${compressionLevel}`));
//               }

//               streamDict.set(filterName, filters);
//               streamDict.set(decodeParmsName, decodeParams);
//             }
//           }

//           compressedStreams.push(streamRef);
//         }

//         page.setContents(PDFArray.fromArray(compressedStreams, pdfDoc));
//       }
//     }

//     const compressedPdfBytes = await pdfDoc.save();

//     const fileName = `${file.name.split('.pdf')[0]}_compressed.pdf`;
//     const fileUrl = URL.createObjectURL(new Blob([compressedPdfBytes]));

//     return { fileName, fileUrl };
//   } catch (error) {
//     console.error('Error compressing PDF:', error);
//     throw error;
//   }
// }
import React from 'react';

const ImageComponent = () => {
  return (
    <div>
      <h1>Image Component</h1>
      <img src="https://files.catbox.moe/l1te6h.png" alt="Description of the image" />
    </div>
  );
};

export default ImageComponent;





