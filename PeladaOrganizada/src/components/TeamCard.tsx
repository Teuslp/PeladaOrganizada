import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Team, Group } from '../types';
import { theme } from '../theme';

interface TeamCardProps {
  team: Team;
  groups?: Group[];
}

export const TeamCard: React.FC<TeamCardProps> = ({ team, groups = [] }) => {
  const calculateTeamSkill = () => {
    const skillValues = team.players.map(p => {
      switch(p.skill) {
        case 'Bom': return 3;
        case 'Médio': return 2;
        case 'Ruim': return 1;
        default: return 1;
      }
    });
    const average = skillValues.reduce((sum, val) => sum + val, 0) / skillValues.length;
    return average.toFixed(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Time {team.id}</Text>
        <View style={styles.skillBadge}>
          <Text style={styles.skillText}>{calculateTeamSkill()}</Text>
        </View>
      </View>
      
      {team.players.map((player, index) => {
        const playerGroups = groups.filter(g => player.groups?.includes(g.id));
        
        return (
          <View key={`${team.id}-${index}`} style={styles.playerRow}>
            <Text style={styles.playerName}>{player.name}</Text>
            <View style={styles.playerInfo}>
              <View style={[
                styles.skillIndicator,
                { backgroundColor: 
                  player.skill === 'Bom' ? theme.colors.success :
                  player.skill === 'Médio' ? theme.colors.warning :
                  theme.colors.accent
                }
              ]} />
              {playerGroups.length > 0 && (
                <View style={styles.groupsContainer}>
                  {playerGroups.map(group => (
                    <View 
                      key={`${team.id}-${index}-${group.id}`} 
                      style={[styles.groupBadge, { backgroundColor: group.color }]}
                    >
                      <Text style={styles.groupBadgeText}>{group.name[0]}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.medium,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    ...theme.shadow.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
    paddingBottom: theme.spacing.small,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
  },
  skillBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: 4,
  },
  skillText: {
    color: 'white',
    fontFamily: theme.fonts.bold,
    fontSize: 14,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.small,
  },
  playerName: {
    fontSize: 16,
    color: theme.colors.text,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
  },
  skillIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  groupsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  groupBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});