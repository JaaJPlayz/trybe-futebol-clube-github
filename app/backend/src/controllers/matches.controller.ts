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

const finishMatchController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await matchesService.finishMatch(Number(id));
  return res.status(200).json({ message: 'Finished' });
};

const updateMatchController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  await matchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
  return res.status(200).json({ message: 'Updated Match Successfully' });
};

export default {
  getAllMatchesController,
  getInProgressController,
  finishMatchController,
  updateMatchController,
};
