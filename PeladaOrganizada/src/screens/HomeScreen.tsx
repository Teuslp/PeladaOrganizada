import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { PlayerCard } from '../components/PlayerCard';
import { RootStackParamList, Player, Group } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { Header } from '../components/Header';

interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  const handleAddPlayer = () => {
    navigation.navigate('AddPlayer', {
      onAddPlayer: (newPlayer: Player) => {
        setPlayers([...players, newPlayer]);
      }
    });
  };

  const handleEditPlayer = (player: Player) => {
    navigation.navigate('EditPlayer', {
      player,
      onSavePlayer: (updatedPlayer: Player) => {
        setPlayers(players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
      }
    });
  };

  const handleDeletePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const handleGenerateTeams = () => {
    if (players.length < 2) {
      Alert.alert('Aviso', 'São necessários pelo menos 2 jogadores para gerar times');
      return;
    }
    navigation.navigate('GenerateTeams', { players, groups });
  };

  const handleManageGroups = () => {
    navigation.navigate('GroupManagement', {
      groups,
      players,
      onSaveGroups: (updatedGroups: Group[]) => {
        setGroups(updatedGroups);
        
        // Atualiza os grupos dos jogadores
        setPlayers(
          players.map(player => ({
            ...player,
            groups: updatedGroups
              .filter(group => group.playerIds.includes(player.id))
              .map(group => group.id)
          }))
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.content}>
        <FlatList
          data={players}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PlayerCard
              player={item}
              groups={groups.filter(g => item.groups?.includes(g.id))}
              onEdit={() => handleEditPlayer(item)}
              onDelete={() => handleDeletePlayer(item.id)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="group" size={48} color={theme.colors.secondary} />
              <Text style={styles.emptyText}>Nenhum jogador cadastrado</Text>
              <Text style={styles.emptySubtext}>Adicione jogadores para começar</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.footerButton, styles.addButton]}
          onPress={handleAddPlayer}
        >
          <Icon name="person-add" size={24} color="white" />
          <Text style={styles.footerButtonText}>Jogador</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.footerButton, styles.groupsButton]}
          onPress={handleManageGroups}
        >
          <Icon name="groups" size={24} color="white" />
          <Text style={styles.footerButtonText}>Grupos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.footerButton, styles.generateButton, players.length < 2 && styles.disabledButton]} 
          onPress={handleGenerateTeams}
          disabled={players.length < 2}
        >
          <Icon name="emoji-events" size={24} color="white" />
          <Text style={styles.footerButtonText}>Times</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.medium,
  },
  listContent: {
    paddingBottom: theme.spacing.large,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.large,
    marginTop: theme.spacing.large,
  },
  emptyText: {
    fontSize: 18,
    color: theme.colors.text,
    marginTop: theme.spacing.medium,
    fontFamily: theme.fonts.bold,
  },
  emptySubtext: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7,
  },
  footer: {
    flexDirection: 'row',
    padding: theme.spacing.small,
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: theme.radius.large,
    borderTopRightRadius: theme.radius.large,
    ...theme.shadow.medium,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.small,
    borderRadius: theme.radius.medium,
    flexDirection: 'row',
    gap: theme.spacing.small,
  },
  footerButtonText: {
    color: theme.colors.lightText,
    fontFamily: theme.fonts.bold,
  },
  addButton: {
    backgroundColor: theme.colors.success,
  },
  groupsButton: {
    backgroundColor: theme.colors.secondary,
    marginHorizontal: theme.spacing.small,
  },
  generateButton: {
    backgroundColor: theme.colors.accent,
  },
  disabledButton: {
    backgroundColor: theme.colors.gray,
  },
});