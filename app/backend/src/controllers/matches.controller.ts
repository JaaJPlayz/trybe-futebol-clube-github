import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

const getInProgressController = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const inProgressBoolean = inProgress === 'true';
  const matches = await matchesService.getInProgress(inProgressBoolean);
  return res.status(200).json(matches);
};
const getAllMatchesController = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress) return getInProgressController(req, res);
  const matches = await matchesService.getAllMatches();
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

interface IResponse {
  status: number;
  message?: string;
  match?: {
    id: number;
    homeTeamId: number;
    awayTeamId: number;
    homeTeamGoals: number;
    awayTeamGoals: number;
    inProgress: boolean;
  };
}

const createMatchController = async (req: Request, res: Response) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
  try {
    const { status, message, match }: IResponse = await matchesService.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    if (message) return res.status(status).json({ message });
    return res.status(status).json(match);
  } catch (error) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
};

export default {
  getAllMatchesController,
  getInProgressController,
  finishMatchController,
  updateMatchController,
  createMatchController,
};
