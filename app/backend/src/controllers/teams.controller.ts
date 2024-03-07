import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

const getAllTeams = async (_req: Request, res: Response) => {
  const allTeams = await teamsService.getAllTeamsSrv();
  return res.status(200).json(allTeams);
};

export default { getAllTeams };
