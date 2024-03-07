import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

const getAllMatchesController = async (_req: Request, res: Response) => {
  const matches = await matchesService.getAllMatches();
  return res.status(200).json(matches);
};

export default { getAllMatchesController };
