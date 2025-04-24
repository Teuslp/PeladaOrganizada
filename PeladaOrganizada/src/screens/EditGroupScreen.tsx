import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { RootStackParamList, Group, Player } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface EditGroupScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'EditGroup'>;
  route: RouteProp<RootStackParamList, 'EditGroup'>;
}

export const EditGroupScreen: React.FC<EditGroupScreenProps> = ({ navigation, route }) => {
  const { group: initialGroup, players } = route.params;
  const [group, setGroup] = useState<Group>(initialGroup);
  const [searchTerm, setSearchTerm] = useState('');

  const togglePlayerInGroup = (playerId: string) => {
    setGroup({
      ...group,
      playerIds: group.playerIds.includes(playerId)
        ? group.playerIds.filter(id => id !== playerId)
        : [...group.playerIds, playerId]
    });
  };

  const handleSave = () => {
    route.params.onSaveGroup(group);
    navigation.goBack();
  };

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const playersInGroup = filteredPlayers.filter(p => group.playerIds.includes(p.id));
  const playersNotInGroup = filteredPlayers.filter(p => !group.playerIds.includes(p.id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Grupo: {group.name}</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar jogadores..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <Text style={styles.sectionTitle}>Jogadores no Grupo</Text>
      {playersInGroup.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum jogador neste grupo</Text>
      ) : (
        <FlatList
          data={playersInGroup}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.playerItem, { backgroundColor: group.color }]}>
              <Text style={styles.playerName}>{item.name}</Text>
              <TouchableOpacity onPress={() => togglePlayerInGroup(item.id)}>
                <Icon name="remove" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Text style={styles.sectionTitle}>Adicionar Jogadores</Text>
      {playersNotInGroup.length === 0 ? (
        <Text style={styles.emptyText}>Todos os jogadores já estão no grupo</Text>
      ) : (
        <FlatList
          data={playersNotInGroup}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.playerItem}>
              <Text style={styles.playerName}>{item.name}</Text>
              <TouchableOpacity onPress={() => togglePlayerInGroup(item.id)}>
                <Icon name="add" size={24} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
  },
  playerName: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});