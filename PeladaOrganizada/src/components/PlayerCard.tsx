import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Player, Group } from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';

interface PlayerCardProps {
  player: Player;
  groups?: Group[];
  onEdit: () => void;
  onDelete: () => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, groups = [], onEdit, onDelete }) => {
  const getSkillColor = () => {
    switch(player.skill) {
      case 'Bom': return theme.colors.success;
      case 'Médio': return theme.colors.warning;
      case 'Ruim': return theme.colors.accent;
      default: return theme.colors.text;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{player.name}</Text>
        <View style={styles.skillContainer}>
          <View style={[styles.skillDot, { backgroundColor: getSkillColor() }]} />
          <Text style={styles.skillText}>{player.skill}</Text>
        </View>
        
        {groups.length > 0 && (
          <View style={styles.groupsContainer}>
            {groups.map(group => (
              <View 
                key={group.id} 
                style={[styles.groupBadge, { backgroundColor: group.color }]}
              >
                <Text style={styles.groupBadgeText}>{group.name}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
          <Icon name="edit" size={20} color={theme.colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
          <Icon name="delete" size={20} color={theme.colors.accent} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.medium,
    padding: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    ...theme.shadow.small,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
  },
  skillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  skillDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  skillText: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.8,
  },
  groupsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },
  groupBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  groupBadgeText: {
    fontSize: 12,
    color: 'white',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 6,
  },
});