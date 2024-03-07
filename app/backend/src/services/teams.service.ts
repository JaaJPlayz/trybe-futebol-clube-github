import Teams from '../database/models/Teams.model';

const getAllTeamsSrv = async () => {
  const allTeams = await Teams.findAll();
  return allTeams;
};

export default { getAllTeamsSrv };
