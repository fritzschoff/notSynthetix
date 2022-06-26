import compression from 'compression';
import cors from 'cors';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { constants as httpConstants } from 'http2';
import { tokenHandler, healthHandler } from './handlers';

export const app = express();

app.disable('x-powered-by');
app.disable('etag');

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.use('/health', healthHandler());
app.use('/token', tokenHandler());

/* Handle 404 HTTP errors. */
app.use('/', (_req, res) => {
  res
    .status(httpConstants.HTTP_STATUS_NOT_FOUND)
    .json({ error: 'Route not found' });
});

/* Handle general errors. */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const payload = { error: err.message };
  res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(payload);
});
