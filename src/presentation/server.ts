import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

interface Options {
  port?: number,
  routes: express.Router
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: express.Router;

  constructor(options: Options) {
    const {
      port = 8080,
      routes
    } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middleware
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    // Set up routes
    this.app.get('/ping', (req, res) => {
      res.send('Welcome to the API! PONG!');
    });
    this.app.use(this.routes);

    // Start the server
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}
