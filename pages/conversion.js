import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

export default function Conversion({ imageFile }) {
  const [conversionStatus, setConversionStatus] = useState('converting');
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const convertToPdf = async () => {
      try {
        const imageDataURL = await readFileAsDataURL(imageFile);
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imageDataURL);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imageDataURL, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        const pdfBlob = await pdf.output('blob');
        const pdfFile = new File([pdfBlob], 'converted.pdf', {
          type: 'application/pdf',
        });

        const pdfFileURL = URL.createObjectURL(pdfFile);
        setPdfUrl(pdfFileURL);
        setConversionStatus('success');
      } catch (error) {
        console.error('Conversion failed:', error);
        setConversionStatus('error');
      }
    };

    convertToPdf();
  }, [imageFile]);

  const handleDownloadPdf = () => {
    if (pdfUrl) {
      saveAs(pdfUrl, 'converted.pdf');
    }
  };

  return (
    <div class='flex flex-col items-center'>
      {conversionStatus === 'converting' && <p>Converting...</p>}
      {conversionStatus === 'success' && (
        <div>
        <br />
          <p class='font-bold text-xl mb-8 text-orange-400'>Conversion was successful!!</p>
          <div class="px-2 py-4">
        <div class="grid gap-8 items-start justify-start">
     <div class="relative group">
      <div class="rounded-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <button onClick={handleDownloadPdf} class="px-4 py-2 bg-orange-600 text-white text-4xl font-semibold font-sans rounded cursor-pointer hover:bg-black">
        <span class="">Download PDF</span>
         </button>
         </div>
        </div>
        </div>
        </div>
      )}
      {conversionStatus === 'error' && <p>Conversion failed. Please try again.</p>}
    </div>
  );
}

const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};



