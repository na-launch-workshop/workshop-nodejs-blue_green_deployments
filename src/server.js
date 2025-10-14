import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const greetingsPath = path.join(__dirname, '..', 'data', 'greetings.json');
const greetings = JSON.parse(fs.readFileSync(greetingsPath, 'utf-8'));

const PORT = process.env.PORT || 3000;
const COUNTRY_CODE = process.env.COUNTRY_CODE?.toUpperCase() || 'EN';

const app = express();

app.get('/', (req, res) => {
  const greeting = greetings[COUNTRY_CODE];

  if (!greeting) {
    return res.status(404).json({
      error: `Unknown country code '${COUNTRY_CODE}'`
    });
  }

  res.json({
    code: COUNTRY_CODE,
    message: greeting
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
