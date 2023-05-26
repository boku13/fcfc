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

import axios from 'axios';

const compressPDF = async (file, compressionRate) => {
  try {
    const formData = new FormData();
    formData.append('input', file);
    formData.append('output_format', 'pdf');
    formData.append('output_quality', compressionRate.toString());
    formData.append('converter_options[page_range]', '1-'); // Compress all pages

    const response = await axios({
      method: 'post',
      url: 'https://api.cloudconvert.com/v2/convert',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGIwNDNlZjdiNDE0ZTNiNjMzMGU5MmMzOWQwZjdmMDQzN2RmZDIwNGRmZmVjMzI2MjIyZTc3MDlmOTU3ZDhmOWVhN2I0ZDQ3OGFkNTlhOTUiLCJpYXQiOjE2ODQ5MDQyNTQuOTgyNjA2LCJuYmYiOjE2ODQ5MDQyNTQuOTgyNjA3LCJleHAiOjQ4NDA1Nzc4NTQuOTc4NDU2LCJzdWIiOiI2MzY4MzIyOCIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.Af43mhhkzO3N5LP-xmUm2yxrJ3FDwg1YQgOoKjwYEGJsxs3JA6tsR-wDNHMSQUrudcMj3TMaElUokPmoZuj2217ow24GYpbnPLpe_pqzTNN29u5Y-MF9IIiUCoaZ7h9CrsRk98xlT_1GQwUQOIyPP5nFJIgF8qoHt3YajyWUUW5wAjGU7IQ0Qn3TXyRYzAW-H1ln1rJPd5Kld-O0N26BoRecZG_qzxUJ-kmBk1fVf-3bfOCBeTdAK67kUDVJzlp_rm0JQEHJugk62CkaLGInx8K2cPw31Ye2FOAHHx1_atxElDA18R-fXDM2Kd6GILET30RAZjtfWVpKXkwOKNbYsT-P6xPekJj7b8FlZPvoz3Zb293RB0Pi1Z0mLVOmCZseOEL3-rIy5vJaZesh5qMIszRZtr6BPTpFhFeXXbUM9HjVfrJKWIfJ-Bf6X_NWwD_Gnq7gTh44NlekaJeoQ-L-dl53SZEYEqHqb3eG_1b-IjAU4SsIo56y9VpJl2mPnsvBLqddKNKHGc9L0ZQ47w-NxuUfWsSRUM2EVFL22GOPWvcgp_ZjkE8yuU_MipWAu3bR5enJ2zKQ3rrGtLOf13QSjgN2si6gfaDoA0fuyopWLmWRR3q_-ewuN31C7ffP6OI7fnvyq9yEi85DUChaSTTq8tERJqKQVcTiT3pAkTdZkW4', // Replace with your CloudConvert API key
      },
      data: formData,
    });

    const { data } = response.data;
    const fileName = `compressed_${file.name}`;
    const fileUrl = data.output.url;

    return { fileName, fileUrl };
  } catch (error) {
    console.error('Error compressing PDF:', error);
    throw error;
  }
};

export default compressPDF;











