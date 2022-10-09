/**
 * Import des modules nécessaires
 */
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config from './config';

const PORT = config.port || 3000;

//create instance server
const app: Application = express();
// middleware to parse incoming requests
app.use(express.json());

// HTTP request logger middleware
app.use(morgan('common'));
// HTTP security middleware
app.use(helmet());

// Apply the rate limiting middleware to all requests
app.use(
  RateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message:
      'Too many accounts created from this IP, please try again after an hour',
  })
);

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  throw new Error('Une erreure existe');

  res.json({
    message: 'Hello world 🌍',
  });
});

// Request Post
app.post('/', (req: Request, res: Response) => {
  // console.log(req.body);
  res.json({
    message: 'Hello world 🌍 from post',
    data: req.body,
  });
});

app.use(errorMiddleware);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message:
      'Ohh vous êtes perdu, lisez la documentation de l"API pour retrouver le chemin du retour 😂',
  });
});

// start server express
app.listen(PORT, () => {
  console.log(`My server running at port : ${PORT}`);
});

export default app;
