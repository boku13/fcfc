import React, { useRef } from 'react';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import { PDFDocument } from 'pdf-lib';

export default function DocxToPDFConverter() {
  const fileInputRef = useRef(null);

  const convertToPDF = async () => {
    const file = fileInputRef.current.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async function (e) {
        const arrayBuffer = e.target.result;
        const doc = new Docxtemplater();
        doc.loadZip(arrayBuffer);

        try {
          await doc.render();
        } catch (error) {
          alert('Error rendering the DOCX file.');
          console.error(error);
          return;
        }

        const buffer = doc.getZip().generate({ type: 'nodebuffer' });

        try {
          const pdfDoc = await PDFDocument.create();
          const pdfBytes = await pdfDoc.load(buffer);

          const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
          saveAs(pdfBlob, 'converted.pdf');
        } catch (error) {
          alert('Error creating the PDF.');
          console.error(error);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Please select a file.');
    }
  };

  return (
    <div>
      <h1>DOCX file to PDF Converter</h1>

      <form>
        <input type="file" ref={fileInputRef} accept=".docx" required />
        <br />
        <br />
        <button type="button" onClick={convertToPDF}>
          Convert to PDF
        </button>
      </form>
    </div>
  );
}

