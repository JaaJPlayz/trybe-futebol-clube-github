import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';

const getHomeLeaderboardController = async (req: Request, res: Response) => {
  const leaderboard = await leaderboardService.getHomeLeaderboard();
  return res.status(200).json(leaderboard);
};

export default { getHomeLeaderboardController };
