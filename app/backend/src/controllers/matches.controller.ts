import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

const getAllMatchesController = async (_req: Request, res: Response) => {
  const matches = await matchesService.getAllMatches();
  return res.status(200).json(matches);
};

const getInProgressController = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const inProgressBoolean = inProgress === 'true';
  const matches = await matchesService.getInProgress(inProgressBoolean);
  return res.status(200).json(matches);
};

export default { getAllMatchesController, getInProgressController };
