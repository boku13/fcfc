import { useState } from 'react';
import Link from 'next/link';
import Conversion from './conversion';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Convertfromimg() {
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  return (
    
    <main class="w-screen h-screen bg-gray-900">
     <header class="text-gray-400 bg-gray-900 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link href="/" class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
    <svg class="h-24 w-24" viewBox="0 0 512 512">
  <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-family="Verdana" font-size="100" fill="orange">fcfc</text>
     </svg>
      <span class="ml-3 text-2xl text-orange-400">Converter</span>
    </Link>
    <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
      <Link href="/aboutus" class="mr-5 hover:text-white">About Us</Link>
      <Link href="/youraccount" class="mr-5 hover:text-white">Your Account</Link>
      <Link href="/coldsafe" class="mr-5 hover:text-white">Cold-Locker</Link>
    </nav>
    <button onClick={()=> signOut()} class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Sign Out
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</header>
    <h1 className="flex-col text-center text-2xl font-bold mb-8 text-orange-400">Pick the file format you want to convert to a pdf.</h1>
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="file-input"
        onChange={handleImageChange}
      />
      <label
        htmlFor="file-input"
        className="px-6 py-2 bg-orange-400 text-white text-4xl font-semibold rounded cursor-pointer transition-colors duration-300 hover:bg-black">
        Select File
      </label>
    </div>
    {imageFile && <Conversion imageFile={imageFile} />}
  </main>
  );
}