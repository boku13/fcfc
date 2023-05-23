import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/:path', (req, res) => {
  const { path: filePath } = req.params;
  const file = path.join(process.cwd(), 'public', filePath);
  res.sendFile(file);
});

export default router;