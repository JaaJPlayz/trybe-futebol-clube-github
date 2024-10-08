import * as express from 'express';
import 'express-async-errors';

import teamsController from './controllers/teams.controller';
import loginController from './controllers/login.controller';
import matchesController from './controllers/matches.controller';
import leaderboardController from './controllers/leaderboard.controller';

import tokenMiddleware from './middlewares/tokenMiddleware';

import errorMiddleware from './middlewares/errorMiddleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.get('/teams', teamsController.getAllTeams);
    this.app.get('/teams/:id', teamsController.getTeamById);

    this.app.post('/login', loginController.login);
    this.app.get('/login/role', tokenMiddleware, loginController.getRole);

    this.app.get('/matches', matchesController.getAllMatchesController);
    this.app.patch('/matches/:id/finish', tokenMiddleware, matchesController.finishMatchController);
    this.app.patch('/matches/:id', tokenMiddleware, matchesController.updateMatchController);
    this.app.post('/matches', tokenMiddleware, matchesController.createMatchController);

    this.app
      .get(
        '/leaderboard/home',
        leaderboardController.getHomeLeaderboardController,
      );

    // Não remova esse middleware de erro, mas fique a vontade para customizá-lo
    // Mantenha ele sempre como o último middleware a ser chamado
    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
