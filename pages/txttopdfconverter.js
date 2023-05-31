import React, { useRef } from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import Link from 'next/link';

export default function TextToPDFConverter() {
  const fileInputRef = useRef(null);

  const convertToPDF = () => {
    const file = fileInputRef.current.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const textContent = e.target.result;

        const pdf = new jsPDF();
        pdf.text(textContent, 10, 10); // Adjust the position as needed

        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'converted.pdf');
      };
      reader.readAsText(file);
    } else {
      alert('Please select a file.');
    }
  };

  return (
    <main class="w-screen h-screen bg-gray-900">
     <header class="text-gray-400 bg-gray-900 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link href="/txttopdfconverter" class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
    <svg class="h-24 w-24" viewBox="0 0 512 512">
  <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-family="Verdana" font-size="100" fill="orange">fcfc</text>
     </svg>
      <span class="ml-3 text-2xl text-orange-400">TextToPDFConverter</span>
    </Link>
    <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
      <Link href="/converter" class="mr-5 hover:text-white">ImageToPDFConverter</Link>
      <Link href="/doctopdfconverter" class="mr-5 hover:text-white">DocumentToPDFConverter</Link>
      {/* <Link href="/coldsafe" class="mr-5 hover:text-white"></Link> */}
    </nav>
    <button onClick={()=> signOut()} class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Sign Out
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</header>
    <div class='flex flex-col items-center' >
      <h1 className='flex-col text-center text-2xl font-bold mb-8 text-orange-400'>Pick the txt file you want to convert</h1>
      <form>
        <input type="file" ref={fileInputRef} accept=".txt" required />
        <br />
        <br />
        <button type="button" onClick={convertToPDF} className="px-6 py-4 bg-orange-600 text-white text-4xl font-semibold font-sans rounded cursor-pointer transition-colors duration-300 hover:bg-black">
          Convert to PDF
        </button>
      </form>
    </div>
    </main>
  );
}



