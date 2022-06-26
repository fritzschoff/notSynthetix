import { app } from './app';

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`Server started and listening to requests 0.0.0.0:${PORT}`);
});
