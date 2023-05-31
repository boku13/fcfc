import zlib from 'zlib';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    try {
      const { file } = req.files;

      // Create a read stream to read the input PDF file
      const readStream = fs.createReadStream(file.path);

      // Create a zlib Gzip transform stream to compress the PDF
      const gzip = zlib.createGzip();

      // Set the response headers for downloading the compressed file
      const compressedFileName = `${path.basename(file.path, '.pdf')}_compressed.pdf`;
      res.setHeader('Content-Disposition', `attachment; filename="${compressedFileName}"`);
      res.setHeader('Content-Type', 'application/pdf');

      // Pipe the read stream through the Gzip stream and then to the response
      readStream.pipe(gzip).pipe(res);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      res.status(500).json({ error: 'Failed to compress PDF' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}





