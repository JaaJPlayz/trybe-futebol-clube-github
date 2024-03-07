import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

const getAllTeams = async (_req: Request, res: Response) => {
  const allTeams = await teamsService.getAllTeams();
  return res.status(200).json(allTeams);
};

const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await teamsService.getTeamById(Number(id));
  return res.status(200).json(team);
};

export default { getAllTeams, getTeamById };
