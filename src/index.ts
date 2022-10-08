import express, { Application, Request, Response } from 'express';

const PORT = 3000;

//create instance server
const app: Application = express();

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello world 🌍',
  });
});

// start server express
app.listen(PORT, () => {
  console.log(`My server running at port : ${PORT}`);
});

export default app;
