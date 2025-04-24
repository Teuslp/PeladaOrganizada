import { StackNavigationProp } from '@react-navigation/stack';

export type SkillLevel = 'Ruim' | 'Médio' | 'Bom';

export interface Player {
  id: string;
  name: string;
  skill: SkillLevel;
  groups?: string[]; // IDs dos grupos
  stats?: {
    gamesPlayed: number;
    goals: number;
    assists: number;
    wins: number;
    losses: number;
  };
  preferredPosition?: 'Goleiro' | 'Defesa' | 'Meio' | 'Ataque';
}

export interface Team {
  id: number;
  players: Player[];
}

export interface Group {
  id: string;
  name: string;
  playerIds: string[];
  color: string;
}

export type TeamGenerationStrategy = 
  | 'RANDOM'
  | 'BALANCED'
  | 'MIX_GROUPS'
  | 'SEPARATE_GROUPS';

export type RootStackParamList = {
  Home: undefined;
  AddPlayer: { onAddPlayer: (player: Player) => void };
  EditPlayer: { player: Player; onSavePlayer: (player: Player) => void };
  GenerateTeams: { players: Player[]; groups: Group[] };
  GroupManagement: { 
    groups: Group[]; 
    players: Player[];
    onSaveGroups: (groups: Group[]) => void 
  };
  EditGroup: { 
    group: Group; 
    players: Player[];
    onSaveGroup: (group: Group) => void 
  };
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type AddPlayerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddPlayer'>;
export type EditPlayerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditPlayer'>;
export type GenerateTeamsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GenerateTeams'>;
export type GroupManagementScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GroupManagement'>;
export type EditGroupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditGroup'>;