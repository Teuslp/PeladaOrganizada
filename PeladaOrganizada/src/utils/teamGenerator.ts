import { Player, Team, TeamGenerationStrategy, Group } from '../types';

const skillOrder = { 'Bom': 3, 'Médio': 2, 'Ruim': 1 };

export const generateTeams = (
  players: Player[],
  numberOfTeams: number,
  strategy: TeamGenerationStrategy = 'BALANCED',
  groups: Group[] = []
): Team[] => {
  if (numberOfTeams < 2) {
    throw new Error('O número mínimo de times é 2');
  }

  if (players.length < numberOfTeams) {
    throw new Error(`Não há jogadores suficientes. Necessário: ${numberOfTeams}, Disponíveis: ${players.length}`);
  }

  switch (strategy) {
    case 'RANDOM':
      return distributePlayers([...players].sort(() => Math.random() - 0.5), numberOfTeams);
    
    case 'BALANCED':
      const sortedPlayers = [...players].sort((a, b) => skillOrder[b.skill] - skillOrder[a.skill]);
      return distributePlayers(sortedPlayers, numberOfTeams);
    
    case 'MIX_GROUPS':
      return distributePlayers([...players].sort(() => Math.random() - 0.5), numberOfTeams);
    
    case 'SEPARATE_GROUPS':
      return generateTeamsWithSeparateGroups(players, numberOfTeams, groups);
    
    default:
      return distributePlayers([...players], numberOfTeams);
  }
};

const generateTeamsWithSeparateGroups = (players: Player[], numberOfTeams: number, groups: Group[]): Team[] => {
  const teams: Team[] = Array.from({ length: numberOfTeams }, (_, i) => ({
    id: i + 1,
    players: [],
  }));

  // Distribui os grupos entre os times
  groups.forEach((group, index) => {
    const teamIndex = index % numberOfTeams;
    const groupPlayers = players.filter(p => group.playerIds.includes(p.id));
    teams[teamIndex].players.push(...groupPlayers);
  });

  // Adiciona jogadores não agrupados aleatoriamente
  const playersWithoutGroup = players.filter(p => !groups.some(g => g.playerIds.includes(p.id)));
  playersWithoutGroup.forEach((player, index) => {
    const teamIndex = index % numberOfTeams;
    teams[teamIndex].players.push(player);
  });

  return teams;
};

const distributePlayers = (players: Player[], numberOfTeams: number): Team[] => {
  const teams: Team[] = Array.from({ length: numberOfTeams }, (_, i) => ({
    id: i + 1,
    players: [],
  }));

  players.forEach((player, index) => {
    const teamIndex = index % numberOfTeams;
    teams[teamIndex].players.push(player);
  });

  return teams;
};