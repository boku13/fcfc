import { useState } from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import Link from 'next/link';

export default function MergePDFs() {
  const [pdfFiles, setPDFFiles] = useState([]);
  const [mergedPDF, setMergedPDF] = useState(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    setPDFFiles(fileArray);
  };

  const handleMergePDFs = async () => {
    if (pdfFiles.length < 2) {
      alert('Please select at least two PDF files.');
      return;
    }

    try {
      const mergedPdf = await mergePDFFiles(pdfFiles);
      setMergedPDF(mergedPdf);
    } catch (error) {
      console.error(error);
      alert('An error occurred while merging PDFs.');
    }
  };

  const mergePDFFiles = async (files) => {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const reader = new FileReader();
      const fileData = await new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(new Uint8Array(reader.result));
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });

      const pdf = await PDFDocument.load(fileData);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    return mergedPdfBytes;
  };

  const downloadMergedPDF = () => {
    if (mergedPDF) {
      const blob = new Blob([mergedPDF], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      link.click();
    }
  };

  return (
    <main class="w-screen h-screen bg-gray-900">
     <header class="text-gray-400 bg-gray-900 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link href="/" class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
    <svg class="h-24 w-24" viewBox="0 0 512 512">
  <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-family="Verdana" font-size="100" fill="orange">fcfc</text>
     </svg>
      <span class="ml-3 text-2xl text-orange-400">Merger</span>
    </Link>
    <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
      <Link href="/aboutus" class="mr-5 hover:text-white">About Us</Link>
      <Link href="/youraccount" class="mr-5 hover:text-white">Your Account</Link>
      {/* <Link href="/coldsafe" class="mr-5 hover:text-white">Cold-Locker</Link> */}
    </nav>
    <button onClick={()=> signOut()} class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Sign Out
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</header>
    <div class='flex flex-col items-center'>
      <h1 className='flex-col text-center text-2xl font-bold mb-8 text-orange-400'>Select the pdfs you want to merge into one.</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <br />
      <button onClick={handleMergePDFs} className="px-6 py-4 bg-orange-600 text-white text-4xl font-semibold font-sans rounded cursor-pointer transition-colors duration-300 hover:bg-black">Merge PDFs</button>
      {mergedPDF && (
        <div>
          <h2 >Merged PDF</h2>
          <button class='px-4 py-2 bg-orange-600 text-white text-4xl font-semibold font-sans rounded cursor-pointer transition-colors duration-300 hover:bg-black' onClick={downloadMergedPDF}>Download</button>
        </div>
      )}
    </div>
    </main>
  );
}

