// import express from 'express';
// import multer from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import { spawn } from 'child_process';

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
//   }
// });

// const upload = multer({ storage });

// router.post('/convert', upload.single('file'), (req, res) => {
//   try {
//     const filename = uuidv4() + '.pdf';
//     const convert = spawn('convert', [req.file.path, filename]);
//     convert.on('exit', () => {
//       res.setHeader('Content-Type', 'application/pdf');
//       res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
//       res.sendFile(filename, { root: '.' }, () => {
//         const rm = spawn('rm', [req.file.path, filename]);
//         rm.on('exit', () => {
//           console.log('Deleted files:', req.file.path, filename);
//         });
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while converting the file.');
//   }
// });

// export default router;


