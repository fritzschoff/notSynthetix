import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';

const PORT = process.env.HTTP_PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`Server started and listening to requests 0.0.0.0:${PORT}`);
});
