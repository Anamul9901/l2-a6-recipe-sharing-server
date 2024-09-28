/* eslint-disable @typescript-eslint/no-var-requires */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(
  cors()
);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
