import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';

const getHomeLeaderboardController = async (req: Request, res: Response) => {
  const leaderboard = await leaderboardService.getHomeLeaderboard();
  console.log('CHEGUEI AQUI NO CONTROLLER, OLHA O LEADERBOARD AQUI Ó: ', leaderboard);

  return res.status(200).json(leaderboard);
};

export default { getHomeLeaderboardController };
